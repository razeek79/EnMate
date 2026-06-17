import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Secure public instance for data fetching on both client and server components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);