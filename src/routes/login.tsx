import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Crown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { session, loading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  if (!loading && session) return <Navigate to="/dashboard" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const fn = mode === "login" ? signIn : signUp;
    const { error } = await fn(email.trim(), password);
    setBusy(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(mode === "login" ? "Welcome back" : "Account created");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-stretch bg-background">
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 gradient-gold opacity-10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, oklch(0.78 0.13 85 / 0.25), transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.78 0.13 85 / 0.15), transparent 50%)",
          }}
        />
        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <div className="flex items-center gap-3">
            <Crown className="h-7 w-7 text-gold" />
            <div className="leading-tight">
              <div className="font-display text-xl tracking-wide">Superior Limousine LLC</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Executive Transportation</div>
            </div>
          </div>
          <div className="space-y-4 max-w-md">
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Admin CRM</div>
            <h1 className="text-5xl font-display leading-tight">
              Where every <span className="gradient-gold-text">journey</span> begins with elegance.
            </h1>
            <p className="text-muted-foreground">
              Manage clients, chauffeurs, reservations and billing with the polish your fleet deserves.
            </p>
          </div>
          <div className="text-xs text-muted-foreground tracking-widest uppercase">
            Admin Console · v1.0
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <form onSubmit={submit} className="w-full max-w-md luxury-card rounded-xl p-8 space-y-6">
          <div className="lg:hidden flex flex-col items-center gap-1 justify-center text-center">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-gold" />
              <span className="font-display text-lg">Superior Limousine LLC</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Executive Transportation</div>
          </div>
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-display">{mode === "login" ? "Admin Sign In" : "Create Admin"}</h2>
            <p className="text-sm text-muted-foreground">
              {mode === "login" ? "Enter your credentials to continue" : "Set up your admin account"}
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@yourcompany.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
          </div>

          <Button type="submit" disabled={busy} className="w-full gradient-gold text-primary-foreground hover:opacity-90 border-0">
            {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {mode === "login" ? "First time here?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="text-gold hover:underline"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Create admin account" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
