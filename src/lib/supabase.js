import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate URL format to prevent crash during development
const isValidUrl = supabaseUrl && (supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://'));

if (!isValidUrl || !supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn("⚠️ SpendPilot: Supabase credentials missing or invalid. DB persistence is disabled.")
}

export const supabase = isValidUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { 
      from: () => ({ 
        insert: () => Promise.resolve({ error: null }), 
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }) 
      }) 
    };
