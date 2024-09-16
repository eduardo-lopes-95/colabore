import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = "https://qvokrlwakxexncqpento.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2b2tybHdha3hleG5jcXBlbnRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5MDE4NjYsImV4cCI6MjA0MTQ3Nzg2Nn0.5hwBM4fDG3aoVPY9pRHiTRsMiJi6Vd_V164D0fZGDIY";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
