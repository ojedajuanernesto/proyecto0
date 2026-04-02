import { createClient } from '@supabase/supabase-js';

// Credenciales del proyecto Instituto Sur (Supabase)
const supabaseUrl = 'https://bwuavvchacejfjckvmye.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dWF2dmNoYWNlamZqY2t2bXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODcwMzYsImV4cCI6MjA5MDU2MzAzNn0.j079ZQU-oSV-4hN0rzWxrvZyZQpEA9bCGrVQ_BGoMVk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
