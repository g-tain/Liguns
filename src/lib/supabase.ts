import { createClient } from '@supabase/supabase-js';

/**
 * src/lib/supabase.ts
 * 
 * Standard Supabase client for general database and storage operations.
 * Uses environment variables for configuration.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
