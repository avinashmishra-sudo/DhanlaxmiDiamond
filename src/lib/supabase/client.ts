// Supabase client helper with resilient local-first fallback

export const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return {
    isConfigured: Boolean(url && anonKey),
    url,
    anonKey,
  };
};
