import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://fpivpnytwndkixmyajpv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaXZwbnl0d25ka2l4bXlhanB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0ODMwNjgsImV4cCI6MjA4MjA1OTA2OH0.UAOWONFir36DWpM1Ay2JxPTrRu5lgO7BKCQ5JJ0Q_pg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = "https://rxqtujxednseujzikfks.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4cXR1anhlZG5zZXVqemlrZmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MDI3NDEsImV4cCI6MjA4MjA3ODc0MX0.jByg23q2YUp2x6PFdcJXGE-fh8VUsI3VSZlI1pJEtVw";
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;
