const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_KEY,
  supabaseSecret: import.meta.env.VITE_SUPABASE_SECRET,
  supavbaseAnonKey : import.meta.env.VITE_SUPABASE_ANON_KEY,

  emailJsKey: import.meta.env.VITE_EMAILJS_KEY,
  emailJsEmail: import.meta.env.VITE_EMAILJS_EMAIL,
  emailJsServiceID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
};

export default env;
