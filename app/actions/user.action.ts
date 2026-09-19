"use server";

// Update user data when they modify their account setting on dashboard
export async function updateUser(formData: FormData){
    // validate user first, then update database data
     const city = formData.get("city");

     
}