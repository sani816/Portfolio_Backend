const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase env variables are missing! Check Vercel Settings.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
