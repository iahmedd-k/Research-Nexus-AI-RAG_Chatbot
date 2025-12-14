// src/lib/supabase-client.ts
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client instance for client-side use
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'dummy',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'
);