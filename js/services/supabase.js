import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://iredpknlbzofsglavvde.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_sm9syEly-BHApJxs5CZbWg_vvmuvhLx';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
