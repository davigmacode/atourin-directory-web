import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Browser client — respects Row Level Security (RLS).
 * Use in Client Components and browser-side fetches.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-side admin client — bypasses RLS.
 * Use ONLY in API routes and Server Components.
 * Never expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 */
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);
