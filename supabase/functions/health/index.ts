import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  checks: {
    database: 'ok' | 'error';
    auth: 'ok' | 'error';
    storage: 'ok' | 'error';
  };
  responseTimeMs: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  
  const checks = {
    database: 'error' as 'ok' | 'error',
    auth: 'error' as 'ok' | 'error',
    storage: 'error' as 'ok' | 'error',
  };

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check database connectivity
    try {
      const { error: dbError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      checks.database = dbError ? 'error' : 'ok';
    } catch {
      checks.database = 'error';
    }

    // Check auth service
    try {
      const { error: authError } = await supabase.auth.getSession();
      checks.auth = authError ? 'error' : 'ok';
    } catch {
      checks.auth = 'error';
    }

    // Check storage service
    try {
      const { error: storageError } = await supabase.storage.listBuckets();
      checks.storage = storageError ? 'error' : 'ok';
    } catch {
      checks.storage = 'error';
    }

    const responseTimeMs = Date.now() - startTime;
    
    const allOk = Object.values(checks).every(c => c === 'ok');
    const anyError = Object.values(checks).some(c => c === 'error');

    const health: HealthStatus = {
      status: allOk ? 'healthy' : (anyError ? 'unhealthy' : 'degraded'),
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      checks,
      responseTimeMs,
    };

    const statusCode = health.status === 'healthy' ? 200 : 503;

    console.log('Health check:', health.status, `${responseTimeMs}ms`);

    return new Response(JSON.stringify(health), {
      status: statusCode,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Health check failed:', error);
    
    const health: HealthStatus = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      checks,
      responseTimeMs: Date.now() - startTime,
    };

    return new Response(JSON.stringify(health), {
      status: 503,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
