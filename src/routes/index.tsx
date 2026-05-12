import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="text-gold animate-pulse text-sm tracking-widest">LOADING</div>
      </div>
    );
  }
  return <Navigate to={session ? "/dashboard" : "/login"} replace />;
}
