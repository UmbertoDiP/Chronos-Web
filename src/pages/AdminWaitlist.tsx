import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2, Shield, Users, Calendar, Globe, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WaitlistEntry {
  id: string;
  email: string;
  plan_type: string;
  language: string | null;
  created_at: string;
}

interface WaitlistStats {
  total: number;
  monthly: number;
  annual: number;
  languages_count: number;
}

const AdminWaitlist = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [stats, setStats] = useState<WaitlistStats | null>(null);

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Devi effettuare il login come admin.");
        setLoading(false);
        return;
      }

      const { data, error: fnError } = await supabase.functions.invoke("admin-waitlist");

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setEntries(data.data || []);
      setStats(data.stats || null);
    } catch (err: any) {
      console.error("Admin waitlist error:", err);
      setError(err.message || "Errore nel caricamento dei dati.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center gap-4">
        <Shield className="w-16 h-16 text-destructive" />
        <h1 className="text-2xl font-bold">Accesso negato</h1>
        <p className="text-muted-foreground max-w-md">{error}</p>
        <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Torna alla home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Admin — Pro Waitlist</h1>
          </div>
          <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Users className="w-5 h-5 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Totale iscritti</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
              <p className="text-2xl font-bold">{stats.monthly}</p>
              <p className="text-xs text-muted-foreground">Piano Monthly</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-2 text-green-400" />
              <p className="text-2xl font-bold">{stats.annual}</p>
              <p className="text-xs text-muted-foreground">Piano Annual</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <Globe className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
              <p className="text-2xl font-bold">{stats.languages_count}</p>
              <p className="text-xs text-muted-foreground">Lingue</p>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </div>
                </TableHead>
                <TableHead>Piano</TableHead>
                <TableHead>Lingua</TableHead>
                <TableHead>Data iscrizione</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nessuna iscrizione alla waitlist.
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry, i) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    <TableCell className="font-medium">{entry.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          entry.plan_type === "annual"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-cyan-500/20 text-cyan-400"
                        }`}
                      >
                        {entry.plan_type}
                      </span>
                    </TableCell>
                    <TableCell className="uppercase text-xs">{entry.language || "—"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(entry.created_at)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminWaitlist;
