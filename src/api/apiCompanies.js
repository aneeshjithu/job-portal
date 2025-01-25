import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("companies")
    .select("*")
    .order("id", { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching companies", error);
    return null;
  }
  return data;
}

export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;

  const { error: uploadError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo);

  if (uploadError) {
    console.error("Error uploading company logo", error);
    return null;
  }
  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  let query = supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url,
      },
    ])
    .select();
  const { data, error } = await query;

  if (error) {
    console.error("Error adding new company", error);
    return null;
  }
  return data;
}
