import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Mail, Phone, MapPin, Building2, Car, Pencil, Plus, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CustomerForm } from "@/components/CustomerForm";
import { BookingForm } from "@/components/BookingForm";
import { RideBadge, PayBadge } from "@/components/StatusBadges";
import type { Database } from "@/integrations/supabase/types";

type Customer = Database["public"]["Tables"]["customers"]["Row"];
type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type Note = Database["public"]["Tables"]["customer_notes"]["Row"];

export const Route = createFileRoute("/_authenticated/customers/$id")({
  component: CustomerDetail,
});

function CustomerDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [newNote, setNewNote] = useState("");

  const load = async () => {
    const [c, b, n] = await Promise.all([
      supabase.from("customers").select("*").eq("id", id).maybeSingle(),
      supabase.from("bookings").select("*").eq("customer_id", id).order("booking_date", { ascending: false }),
      supabase.from("customer_notes").select("*").eq("customer_id", id).order("created_at", { ascending: false }),
    ]);
    if (c.error || !c.data) { toast.error("Customer not found"); navigate({ to: "/customers" }); return; }
    setCustomer(c.data);
    setBookings(b.data ?? []);
    setNotes(n.data ?? []);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  const totalTrips = bookings.length;
  const totalSpent = bookings.filter((b) => b.payment_status === "paid").reduce((s, b) => s + Number(b.amount ?? 0), 0);

  const addNote = async () => {
    if (!newNote.trim()) return;
    const { error } = await supabase.from("customer_notes").insert({ customer_id: id, body: newNote.trim() });
    if (error) return toast.error(error.message);
    setNewNote("");
    toast.success("Note added");
    load();
  };

  if (!customer) {
    return <div className="p-10 text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      <Link to="/customers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> Back to customers
      </Link>

      <div className="luxury-card rounded-xl p-6 md:p-8 flex gap-6 flex-wrap items-start justify-between">
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Customer Profile</div>
          <h1 className="text-4xl font-display">{customer.full_name}</h1>
          <div className="flex gap-2 flex-wrap">
            {(customer.tags ?? []).map((t) => (
              <Badge key={t} variant="outline" className="bg-gold-soft text-gold border-gold/40">{t}</Badge>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground pt-2">
            {customer.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> {customer.email}</div>}
            {customer.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> {customer.phone}</div>}
            {customer.company_name && <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-gold" /> {customer.company_name}</div>}
            {customer.preferred_vehicle && <div className="flex items-center gap-2"><Car className="h-4 w-4 text-gold" /> {customer.preferred_vehicle}</div>}
            {customer.home_address && <div className="flex items-center gap-2 sm:col-span-2"><MapPin className="h-4 w-4 text-gold" /> {customer.home_address}</div>}
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <Button onClick={() => setEditOpen(true)} variant="outline">
            <Pencil className="h-4 w-4 mr-2" /> Edit
          </Button>
          <div className="grid grid-cols-2 gap-3 text-right">
            <Stat label="Total Trips" value={totalTrips} />
            <Stat label="Total Spent" value={`$${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
          <TabsTrigger value="notes">Notes ({notes.length})</TabsTrigger>
          <TabsTrigger value="info">Special Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="luxury-card rounded-xl p-4">
          <div className="flex justify-between items-center mb-3 px-2">
            <h2 className="font-display text-lg">Ride history</h2>
            <Button size="sm" onClick={() => { setEditingBooking(null); setBookOpen(true); }} className="gradient-gold text-primary-foreground border-0">
              <Plus className="h-4 w-4 mr-2" /> New booking
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="text-left px-3 py-2">Date</th>
                  <th className="text-left px-3 py-2">Trip</th>
                  <th className="text-left px-3 py-2">Chauffeur</th>
                  <th className="text-left px-3 py-2">Status</th>
                  <th className="text-left px-3 py-2">Payment</th>
                  <th className="text-right px-3 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-10 text-muted-foreground">No bookings yet.</td></tr>
                )}
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-border/50 cursor-pointer hover:bg-muted/30" onClick={() => { setEditingBooking(b); setBookOpen(true); }}>
                    <td className="px-3 py-2 whitespace-nowrap">{b.booking_date} <span className="text-muted-foreground">{b.booking_time.slice(0,5)}</span></td>
                    <td className="px-3 py-2 text-muted-foreground">{b.pickup_location} <span className="text-gold">→</span> {b.dropoff_location}</td>
                    <td className="px-3 py-2">{b.chauffeur_assigned ?? "—"}</td>
                    <td className="px-3 py-2"><RideBadge status={b.ride_status} /></td>
                    <td className="px-3 py-2"><PayBadge status={b.payment_status} /></td>
                    <td className="px-3 py-2 text-right">${Number(b.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="luxury-card rounded-xl p-6 space-y-4">
          <div className="flex gap-2">
            <Textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add a note about this customer…" rows={2} />
            <Button onClick={addNote} className="gradient-gold text-primary-foreground border-0">Add</Button>
          </div>
          <div className="space-y-3">
            {notes.length === 0 && <p className="text-muted-foreground text-sm text-center py-6">No notes yet.</p>}
            {notes.map((n) => (
              <div key={n.id} className="flex gap-3 border-l-2 border-gold/40 pl-4 py-1">
                <MessageSquare className="h-4 w-4 text-gold mt-1 shrink-0" />
                <div className="flex-1">
                  <div className="text-sm whitespace-pre-wrap">{n.body}</div>
                  <div className="text-xs text-muted-foreground mt-1">{new Date(n.created_at).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="info" className="luxury-card rounded-xl p-6">
          <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Notes / Preferences</h3>
          <p className="whitespace-pre-wrap text-sm">{customer.notes || <span className="text-muted-foreground">No special requests recorded.</span>}</p>
        </TabsContent>
      </Tabs>

      <CustomerForm open={editOpen} onOpenChange={setEditOpen} initial={customer} onSaved={load} />
      <BookingForm open={bookOpen} onOpenChange={setBookOpen} initial={editingBooking} defaultCustomerId={id} onSaved={load} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="luxury-card rounded-md px-4 py-2 min-w-[120px]">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-xl text-gold">{value}</div>
    </div>
  );
}
