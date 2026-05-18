import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Customer = Database["public"]["Tables"]["customers"]["Row"];
type Tag = Database["public"]["Enums"]["customer_tag"];

const ALL_TAGS: Tag[] = ["VIP", "Corporate", "Frequent"];

const schema = z.object({
  full_name: z.string().trim().min(1, "Full name required").max(120),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  home_address: z.string().trim().max(300).optional().or(z.literal("")),
  company_name: z.string().trim().max(120).optional().or(z.literal("")),
  preferred_vehicle: z.string().trim().max(80).optional().or(z.literal("")),
  chauffeur_preference: z.string().trim().max(120).optional().or(z.literal("")),
  billing_details: z.string().trim().max(500).optional().or(z.literal("")),
  account_status: z.enum(["active", "inactive", "vip", "suspended"]).default("active"),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Customer | null;
  onSaved: () => void;
};

export function CustomerForm({ open, onOpenChange, initial, onSaved }: Props) {
  const [form, setForm] = useState({
    full_name: "", phone: "", email: "", home_address: "",
    company_name: "", preferred_vehicle: "", notes: "",
  });
  const [tags, setTags] = useState<Tag[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({
        full_name: initial?.full_name ?? "",
        phone: initial?.phone ?? "",
        email: initial?.email ?? "",
        home_address: initial?.home_address ?? "",
        company_name: initial?.company_name ?? "",
        preferred_vehicle: initial?.preferred_vehicle ?? "",
        notes: initial?.notes ?? "",
      });
      setTags((initial?.tags as Tag[] | null) ?? []);
    }
  }, [open, initial]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    const payload = {
      full_name: parsed.data.full_name,
      phone: parsed.data.phone || null,
      email: parsed.data.email || null,
      home_address: parsed.data.home_address || null,
      company_name: parsed.data.company_name || null,
      preferred_vehicle: parsed.data.preferred_vehicle || null,
      notes: parsed.data.notes || null,
      tags,
    };
    const res = initial
      ? await supabase.from("customers").update(payload).eq("id", initial.id)
      : await supabase.from("customers").insert(payload);
    setBusy(false);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    toast.success(initial ? "Customer updated" : "Customer added");
    onOpenChange(false);
    onSaved();
  };

  const toggleTag = (t: Tag) =>
    setTags((curr) => (curr.includes(t) ? curr.filter((x) => x !== t) : [...curr, t]));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl luxury-card">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {initial ? "Edit Customer" : "New Customer"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name *" className="sm:col-span-2">
            <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required maxLength={120} />
          </Field>
          <Field label="Phone Number">
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={40} />
          </Field>
          <Field label="Email Address">
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
          </Field>
          <Field label="Home Address" className="sm:col-span-2">
            <Input value={form.home_address} onChange={(e) => setForm({ ...form, home_address: e.target.value })} maxLength={300} />
          </Field>
          <Field label="Company">
            <Input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} maxLength={120} />
          </Field>
          <Field label="Preferred Vehicle">
            <Input value={form.preferred_vehicle} onChange={(e) => setForm({ ...form, preferred_vehicle: e.target.value })} placeholder="e.g. Mercedes S-Class" maxLength={80} />
          </Field>
          <Field label="Tags" className="sm:col-span-2">
            <div className="flex gap-2 flex-wrap">
              {ALL_TAGS.map((t) => {
                const active = tags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className="outline-none"
                  >
                    <Badge
                      variant="outline"
                      className={
                        active
                          ? "bg-gold-soft text-gold border-gold/40"
                          : "border-border text-muted-foreground"
                      }
                    >
                      {t}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Notes / Special Requests" className="sm:col-span-2">
            <Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} maxLength={2000} />
          </Field>

          <DialogFooter className="sm:col-span-2 gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={busy} className="gradient-gold text-primary-foreground border-0">
              {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {initial ? "Save changes" : "Create customer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={"space-y-2 " + (className ?? "")}>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
