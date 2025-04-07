const SUPABASE = new DB_Supabase(
  "https://xcpxkcfrwurwnqyaznzv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjcHhrY2Zyd3Vyd25xeWF6bnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwMjk3ODcsImV4cCI6MjA0NjYwNTc4N30.r04VQ6ydTBmwmpxB6UVY-faJD3LVKkTkD70Xz50UF18"
);

(async () => {
  await SUPABASE.checkUserLogged();
})();