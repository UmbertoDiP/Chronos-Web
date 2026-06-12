import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings2, Monitor, User, Database, Eye, X, Bug, Trash2, Search, ExternalLink, Filter, AlertTriangle, Download, Crown } from 'lucide-react';
import { format, isAfter, isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import { it } from 'date-fns/locale';
import { toast } from 'sonner';
import { getErrorLogs, clearErrorLogs, getLogStats, ErrorLogEntry } from '@/lib/errorLogger';

// Bug report interface
interface BugReport {
  email: string;
  category: string;
  description: string;
  timestamp: string;
  userAgent: string;
  url: string;
  screenSize: string;
}

// User roles for impersonation
export type DevUserRole = 'admin' | 'user' | 'hr' | 'guest';

interface DevPanelState {
  isOpen: boolean;
  currentRole: DevUserRole;
  useMockData: boolean;
  showDebugInfo: boolean;
  simulatePremium: boolean;
}

// Global state for dev panel
let globalDevState: DevPanelState = {
  isOpen: false,
  currentRole: 'admin',
  useMockData: true,
  showDebugInfo: false,
  simulatePremium: false,
};

const devStateListeners: Set<(state: DevPanelState) => void> = new Set();

export const useDevPanel = () => {
  const [state, setState] = useState<DevPanelState>(globalDevState);

  useEffect(() => {
    const listener = (newState: DevPanelState) => setState({ ...newState });
    devStateListeners.add(listener);
    return () => { devStateListeners.delete(listener); };
  }, []);

  const updateState = (updates: Partial<DevPanelState>) => {
    globalDevState = { ...globalDevState, ...updates };
    
    // Sync premium simulation to localStorage for useAuth to read
    if ('simulatePremium' in updates) {
      if (updates.simulatePremium) {
        localStorage.setItem('dev_simulate_premium', 'true');
      } else {
        localStorage.removeItem('dev_simulate_premium');
      }
    }
    
    devStateListeners.forEach(listener => listener(globalDevState));
  };

  return { state, updateState };
};

// Check if current user is admin
export const isDevMode = () => {
  return import.meta.env.DEV || localStorage.getItem('dev_mode') === 'true';
};

// Bug Reports Manager Component
const BugReportsManager = () => {
  const [reports, setReports] = useState<BugReport[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedReport, setSelectedReport] = useState<BugReport | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Load reports from localStorage
  useEffect(() => {
    const loadReports = () => {
      const stored = localStorage.getItem('bug_reports');
      if (stored) {
        try {
          setReports(JSON.parse(stored));
        } catch {
          setReports([]);
        }
      }
    };
    loadReports();
    
    // Listen for storage changes
    window.addEventListener('storage', loadReports);
    return () => window.removeEventListener('storage', loadReports);
  }, []);

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          report.description.toLowerCase().includes(query) ||
          report.email.toLowerCase().includes(query) ||
          report.url.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && report.category !== categoryFilter) {
        return false;
      }

      // Date filters
      if (dateFrom) {
        const reportDate = parseISO(report.timestamp);
        if (isBefore(reportDate, startOfDay(parseISO(dateFrom)))) return false;
      }
      if (dateTo) {
        const reportDate = parseISO(report.timestamp);
        if (isAfter(reportDate, endOfDay(parseISO(dateTo)))) return false;
      }

      return true;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [reports, searchQuery, categoryFilter, dateFrom, dateTo]);

  const handleDeleteReport = (index: number) => {
    const reportToDelete = filteredReports[index];
    const originalIndex = reports.findIndex(r => r.timestamp === reportToDelete.timestamp);
    
    const newReports = [...reports];
    newReports.splice(originalIndex, 1);
    setReports(newReports);
    localStorage.setItem('bug_reports', JSON.stringify(newReports));
    toast.success('Report eliminato');
  };

  const handleDeleteAll = () => {
    if (confirm('Eliminare tutti i report filtrati?')) {
      const filteredTimestamps = new Set(filteredReports.map(r => r.timestamp));
      const remainingReports = reports.filter(r => !filteredTimestamps.has(r.timestamp));
      setReports(remainingReports);
      localStorage.setItem('bug_reports', JSON.stringify(remainingReports));
      toast.success(`${filteredReports.length} report eliminati`);
    }
  };

  const handleViewDetail = (report: BugReport) => {
    setSelectedReport(report);
    setDetailOpen(true);
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { label: string; className: string }> = {
      bug: { label: '🐛 Bug', className: 'bg-red-500/20 text-red-600' },
      feature: { label: '✨ Idea', className: 'bg-blue-500/20 text-blue-600' },
      ui: { label: '🎨 UI/UX', className: 'bg-purple-500/20 text-purple-600' },
    };
    const badge = badges[category] || { label: category, className: 'bg-gray-500/20' };
    return <Badge variant="outline" className={badge.className}>{badge.label}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cerca nei report..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 text-sm"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-8 text-xs">
              <Filter className="w-3 h-3 mr-1" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte</SelectItem>
              <SelectItem value="bug">🐛 Bug</SelectItem>
              <SelectItem value="feature">✨ Idea</SelectItem>
              <SelectItem value="ui">🎨 UI/UX</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="h-8 text-xs"
            title="Data inizio"
          />

          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="h-8 text-xs"
            title="Data fine"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{filteredReports.length} di {reports.length} report</span>
        {filteredReports.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs text-red-500 hover:text-red-600"
            onClick={handleDeleteAll}
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Elimina filtrati
          </Button>
        )}
      </div>

      {/* Table */}
      <ScrollArea className="h-[300px] border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead className="w-[100px]">Data</TableHead>
              <TableHead className="w-[80px]">Tipo</TableHead>
              <TableHead>Descrizione</TableHead>
              <TableHead className="w-[60px]">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  {reports.length === 0 ? 'Nessun report ricevuto' : 'Nessun report corrisponde ai filtri'}
                </TableCell>
              </TableRow>
            ) : (
              filteredReports.map((report, idx) => (
                <TableRow key={report.timestamp} className="text-xs">
                  <TableCell className="font-mono">
                    {format(parseISO(report.timestamp), 'dd/MM HH:mm', { locale: it })}
                  </TableCell>
                  <TableCell>{getCategoryBadge(report.category)}</TableCell>
                  <TableCell 
                    className="max-w-[150px] truncate cursor-pointer hover:text-primary"
                    onClick={() => handleViewDetail(report)}
                    title={report.description}
                  >
                    {report.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => handleViewDetail(report)}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteReport(idx)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bug className="w-5 h-5" />
              Dettaglio Report
            </DialogTitle>
            {selectedReport && (
              <DialogDescription>
                {format(parseISO(selectedReport.timestamp), 'dd MMMM yyyy HH:mm:ss', { locale: it })}
              </DialogDescription>
            )}
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Categoria:</span>
                  <div className="mt-1">{getCategoryBadge(selectedReport.category)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <div className="mt-1 font-mono text-xs">{selectedReport.email || 'Non fornita'}</div>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground text-sm">Descrizione:</span>
                <p className="mt-1 text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">
                  {selectedReport.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">URL:</span>
                  <div className="mt-1 font-mono truncate" title={selectedReport.url}>
                    {selectedReport.url}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Schermo:</span>
                  <div className="mt-1 font-mono">{selectedReport.screenSize}</div>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground text-xs">User Agent:</span>
                <div className="mt-1 text-xs font-mono bg-muted p-2 rounded-md break-all">
                  {selectedReport.userAgent}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Error Logs Manager Component
const ErrorLogsManager = () => {
  const [logs, setLogs] = useState<ErrorLogEntry[]>([]);
  const [stats, setStats] = useState({ count: 0, oldestLog: null as string | null, lastCleanup: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedLog, setSelectedLog] = useState<ErrorLogEntry | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Load logs
  const loadLogs = () => {
    setLogs(getErrorLogs());
    setStats(getLogStats());
  };

  useEffect(() => {
    loadLogs();
    // Refresh every 5 seconds
    const interval = setInterval(loadLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          log.message.toLowerCase().includes(query) ||
          log.componentName?.toLowerCase().includes(query) ||
          log.stack?.toLowerCase().includes(query) ||
          log.url?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (typeFilter !== 'all' && log.type !== typeFilter) {
        return false;
      }

      // Date filters
      if (dateFrom) {
        const logDate = parseISO(log.timestamp);
        if (isBefore(logDate, startOfDay(parseISO(dateFrom)))) return false;
      }
      if (dateTo) {
        const logDate = parseISO(log.timestamp);
        if (isAfter(logDate, endOfDay(parseISO(dateTo)))) return false;
      }

      return true;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [logs, searchQuery, typeFilter, dateFrom, dateTo]);

  const handleClearAll = () => {
    if (confirm('Eliminare tutti i log degli errori?')) {
      clearErrorLogs();
      loadLogs();
      toast.success('Log eliminati');
    }
  };

  const handleExport = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      stats,
      logs: filteredLogs,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-logs-${format(new Date(), 'yyyy-MM-dd-HHmm')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${filteredLogs.length} log esportati`);
  };

  const getTypeBadge = (type: ErrorLogEntry['type']) => {
    const badges: Record<ErrorLogEntry['type'], { label: string; className: string }> = {
      error: { label: '⚠️ Error', className: 'bg-red-500/20 text-red-600' },
      unhandledRejection: { label: '💥 Promise', className: 'bg-orange-500/20 text-orange-600' },
      componentError: { label: '🧩 Component', className: 'bg-purple-500/20 text-purple-600' },
      networkError: { label: '🌐 Network', className: 'bg-blue-500/20 text-blue-600' },
      customError: { label: '📝 Custom', className: 'bg-gray-500/20 text-gray-600' },
    };
    const badge = badges[type];
    return <Badge variant="outline" className={badge.className}>{badge.label}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Stats Card */}
      <Card className="p-3 bg-muted/50">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              Totale: <strong className="text-foreground">{stats.count}</strong>
            </span>
            {stats.oldestLog && (
              <span className="text-muted-foreground">
                Dal: {format(parseISO(stats.oldestLog), 'dd/MM HH:mm')}
              </span>
            )}
          </div>
          <span className="text-muted-foreground">
            Cleanup: {format(parseISO(stats.lastCleanup), 'dd/MM')}
          </span>
        </div>
      </Card>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cerca nei log..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 text-sm"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-8 text-xs">
              <Filter className="w-3 h-3 mr-1" />
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti</SelectItem>
              <SelectItem value="error">⚠️ Error</SelectItem>
              <SelectItem value="unhandledRejection">💥 Promise</SelectItem>
              <SelectItem value="componentError">🧩 Component</SelectItem>
              <SelectItem value="networkError">🌐 Network</SelectItem>
              <SelectItem value="customError">📝 Custom</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="h-8 text-xs"
            title="Data inizio"
          />

          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="h-8 text-xs"
            title="Data fine"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{filteredLogs.length} di {logs.length} log</span>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-6 text-xs"
            onClick={handleExport}
            disabled={filteredLogs.length === 0}
          >
            <Download className="w-3 h-3 mr-1" />
            Export JSON
          </Button>
          {logs.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 text-xs text-red-500 hover:text-red-600"
              onClick={handleClearAll}
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Svuota
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <ScrollArea className="h-[280px] border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead className="w-[90px]">Data</TableHead>
              <TableHead className="w-[90px]">Tipo</TableHead>
              <TableHead>Messaggio</TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  {logs.length === 0 ? '✅ Nessun errore registrato' : 'Nessun log corrisponde ai filtri'}
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id} className="text-xs">
                  <TableCell className="font-mono">
                    {format(parseISO(log.timestamp), 'dd/MM HH:mm', { locale: it })}
                  </TableCell>
                  <TableCell>{getTypeBadge(log.type)}</TableCell>
                  <TableCell 
                    className="max-w-[150px] truncate cursor-pointer hover:text-primary"
                    onClick={() => { setSelectedLog(log); setDetailOpen(true); }}
                    title={log.message}
                  >
                    {log.message}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => { setSelectedLog(log); setDetailOpen(true); }}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Dettaglio Errore
            </DialogTitle>
            {selectedLog && (
              <DialogDescription>
                {format(parseISO(selectedLog.timestamp), 'dd MMMM yyyy HH:mm:ss', { locale: it })}
              </DialogDescription>
            )}
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Tipo:</span>
                  <div className="mt-1">{getTypeBadge(selectedLog.type)}</div>
                </div>
                {selectedLog.componentName && (
                  <div>
                    <span className="text-muted-foreground">Componente:</span>
                    <div className="mt-1 font-mono text-xs">{selectedLog.componentName}</div>
                  </div>
                )}
              </div>

              <div>
                <span className="text-muted-foreground text-sm">Messaggio:</span>
                <p className="mt-1 text-sm bg-destructive/10 text-destructive p-3 rounded-md">
                  {selectedLog.message}
                </p>
              </div>

              {selectedLog.stack && (
                <div>
                  <span className="text-muted-foreground text-xs">Stack Trace:</span>
                  <pre className="mt-1 text-xs font-mono bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap max-h-40">
                    {selectedLog.stack}
                  </pre>
                </div>
              )}

              <div className="grid grid-cols-1 gap-2 text-xs">
                {selectedLog.url && (
                  <div>
                    <span className="text-muted-foreground">URL:</span>
                    <div className="mt-1 font-mono truncate" title={selectedLog.url}>
                      {selectedLog.url}
                    </div>
                  </div>
                )}
                {selectedLog.additionalInfo && Object.keys(selectedLog.additionalInfo).length > 0 && (
                  <div>
                    <span className="text-muted-foreground">Info aggiuntive:</span>
                    <pre className="mt-1 text-xs font-mono bg-muted p-2 rounded-md">
                      {JSON.stringify(selectedLog.additionalInfo, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const DevPanel = () => {
  const { state, updateState } = useDevPanel();
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Don't render if not in dev mode
  if (!isDevMode()) return null;

  const getBreakpoint = () => {
    if (viewport.width < 640) return 'xs';
    if (viewport.width < 768) return 'sm';
    if (viewport.width < 1024) return 'md';
    if (viewport.width < 1280) return 'lg';
    return 'xl';
  };

  const roleColors: Record<DevUserRole, string> = {
    admin: 'bg-red-500',
    user: 'bg-blue-500',
    hr: 'bg-purple-500',
    guest: 'bg-gray-500',
  };

  const roleLabels: Record<DevUserRole, string> = {
    admin: 'Amministratore',
    user: 'Utente Standard',
    hr: 'HR Manager',
    guest: 'Ospite',
  };

  return (
    <>
      {/* Floating Dev Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-24 left-6 z-50 h-12 w-12 rounded-full shadow-lg bg-background border-2 border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/10"
            title="Dev Tools"
          >
            <Settings2 className="w-5 h-5 text-amber-500" />
          </Button>
        </SheetTrigger>
        
        <SheetContent side="left" className="w-[400px] sm:w-[450px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-amber-500" />
              Dev Tools
              <Badge variant="outline" className="ml-auto text-xs">DEV</Badge>
            </SheetTitle>
          </SheetHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="settings" className="text-xs">
                <Settings2 className="w-3 h-3 mr-1" />
                Impostazioni
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-xs">
                <Bug className="w-3 h-3 mr-1" />
                Bug Reports
              </TabsTrigger>
              <TabsTrigger value="errors" className="text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Error Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-4 mt-4">
              {/* Viewport Info */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Viewport</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Dimensioni:</div>
                  <div className="font-mono">{viewport.width} × {viewport.height}</div>
                  <div className="text-muted-foreground">Breakpoint:</div>
                  <Badge variant="secondary">{getBreakpoint()}</Badge>
                </div>
              </Card>

              {/* User Impersonation */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Impersonation</span>
                </div>
                <Select
                  value={state.currentRole}
                  onValueChange={(value: DevUserRole) => updateState({ currentRole: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleLabels).map(([role, label]) => (
                      <SelectItem key={role} value={role}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${roleColors[role as DevUserRole]}`} />
                          {label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">
                  Vista attuale: <strong>{roleLabels[state.currentRole]}</strong>
                </p>
              </Card>

              {/* Data Source Toggle */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Data Source</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {state.useMockData ? 'Mock (localStorage)' : 'Backend (API)'}
                  </span>
                  <Switch
                    checked={!state.useMockData}
                    onCheckedChange={(checked) => updateState({ useMockData: !checked })}
                  />
                </div>
              </Card>

              {/* Debug Info Toggle */}
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Debug Overlay</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mostra info debug</span>
                  <Switch
                    checked={state.showDebugInfo}
                    onCheckedChange={(checked) => updateState({ showDebugInfo: checked })}
                  />
                </div>
              </Card>

              {/* Premium Simulation Toggle */}
              <Card className="p-4 border-yellow-500/30 bg-yellow-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium text-sm">Simula Premium</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {state.simulatePremium ? 'Premium attivo' : 'Utente Free'}
                  </span>
                  <Switch
                    checked={state.simulatePremium}
                    onCheckedChange={(checked) => updateState({ simulatePremium: checked })}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Bypass del controllo premium per test funzionalità
                </p>
              </Card>

              {/* Disabled Features */}
              <Card className="p-4 border-dashed border-muted-foreground/30">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-sm text-muted-foreground">Funzionalità Disabilitate</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span><strong>Ordine e Scala Sezioni</strong> - Riordinamento e scaling sezioni CV (in sviluppo)</span>
                  </li>
                </ul>
                <p className="text-[10px] text-muted-foreground/60 mt-2">
                  Queste feature sono temporaneamente nascoste, non eliminate.
                </p>
              </Card>

              {/* Quick Actions */}
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Reset localStorage
              </Button>
            </TabsContent>

            <TabsContent value="reports" className="mt-4">
              <BugReportsManager />
            </TabsContent>

            <TabsContent value="errors" className="mt-4">
              <ErrorLogsManager />
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      {/* Debug Overlay */}
      {state.showDebugInfo && (
        <div className="fixed top-16 left-4 z-50 bg-black/80 text-white text-xs p-2 rounded font-mono">
          <div>Viewport: {viewport.width}×{viewport.height}</div>
          <div>Breakpoint: {getBreakpoint()}</div>
          <div>Role: {state.currentRole}</div>
          <div>Data: {state.useMockData ? 'Mock' : 'API'}</div>
          <div className={state.simulatePremium ? 'text-yellow-400' : ''}>
            Premium: {state.simulatePremium ? 'SIM ✓' : 'No'}
          </div>
        </div>
      )}

      {/* Role Indicator Badge */}
      <div className="fixed top-16 right-4 z-50">
        <Badge className={`${roleColors[state.currentRole]} text-white`}>
          {roleLabels[state.currentRole]}
        </Badge>
      </div>
    </>
  );
};
