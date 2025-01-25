import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = async (subaseAccessToken) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${subaseAccessToken}`,
      },
    },
  });
  return supabase;
};
export default supabaseClient;

// import { createClient } from "@supabase/supabase-js";

// export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// // Create a single instance outside the function
// let supabaseInstance = null;

//  const supabaseClient = (supabaseAccessToken) => {
//   if (!supabaseUrl || !supabaseKey) {
//     throw new Error("Missing Supabase environment variables");
//   }

//   // Return existing instance if it exists
//   if (supabaseInstance) {
//     // Update auth header if token provided
//     if (supabaseAccessToken) {
//       supabaseInstance.auth.setSession(supabaseAccessToken);
//     }
//     return supabaseInstance;
//   }

//   // Create new instance if none exists
//   supabaseInstance = createClient(supabaseUrl, supabaseKey, {
//     auth: {
//       persistSession: false, // Prevent duplicate auth instances
//     },
//     global: {
//       headers: supabaseAccessToken
//         ? {
//             Authorization: `Bearer ${supabaseAccessToken}`,
//           }
//         : {},
//     },
//   });

//   return supabaseInstance;
// };

// export default supabaseClient;
