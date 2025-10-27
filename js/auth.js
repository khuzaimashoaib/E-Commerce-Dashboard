import { supabase } from "./database.js";


export const signInUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error.message);
    return { data: null, error };
  }
  console.log("Sign in success:", data);
  return { data, error: null };
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
    return error;
  }
};

export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Session error:", error.message);
    return { session: null };
  }
  console.log("Session data:", data);
  return data;
};
