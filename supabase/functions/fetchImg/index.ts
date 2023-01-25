// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { getClient } from "../_shared/supabase.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { supabaseAdmin } from "../_shared/supabase.ts";





const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "apikey, X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Expose-Headers": "Content-Length, X-JSON",
};


console.log("Hello from Functions!")
serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
    
  const { img } = await req.json()
  const pathImg =`${img}`
  const {data} = supabaseAdmin.storage.from('nores').getPublicUrl(pathImg)

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  )
})

//const { img } = await req.json()
//const {data} = supabaseAdmin.storage.from('norse').getPublicUrl(pathimg)



// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
