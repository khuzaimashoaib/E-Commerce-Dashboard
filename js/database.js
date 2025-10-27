import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4/+esm";

const supabaseUrl = "https://oucydoxmpgsgoqytcvtb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91Y3lkb3htcGdzZ29xeXRjdnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NDU1OTQsImV4cCI6MjA3NDMyMTU5NH0.e5iAii2E-uIxKWE-He1O5aGfaZu_k1hzw_SuI8iFGaA";

export const supabase = createClient(supabaseUrl, supabaseKey);


export async function fetchContacts() {
  let { data, error } = await supabase.from("contacts").select("*");
  if (error) {
    console.error("Fetch error:", error);
    return;
  }
  return data;
}

export async function addContact(first_name, last_name, number, email) {
  let { data, error } = await supabase
    .from("contacts")
    .insert([{ first_name, last_name, number, email }]);

  if (error) {
    console.error("Insert error:", error);
    return;
  }

  return data;
}

export async function updateContact(id, first_name, last_name, number, email) {
  const updateData = {};

  if (first_name) updateData.first_name = first_name;
  if (last_name) updateData.last_name = last_name;
  if (number) updateData.number = number;
  if (email) updateData.email = email;

  let { data, error } = await supabase
    .from("contacts")
    .update(updateData)
    .eq("id", id);

  if (error) console.error("Update error:", error);
  return data;
}

export async function deleteContact(id) {
  let { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) console.error("Delete error:", error);
}
