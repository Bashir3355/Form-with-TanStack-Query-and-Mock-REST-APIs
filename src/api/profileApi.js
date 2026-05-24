// This is the JSON Server endpoint for the profile object.
const PROFILE_API_URL = "http://localhost:3001/profile";

// This function gets profile data from JSON Server.
export async function fetchProfile() {
  // Send GET request to the mock REST API.
  const response = await fetch(PROFILE_API_URL);

  // If the server fails, throw an error.
  if (!response.ok) {
    throw new Error("Failed to fetch profile data.");
  }

  // Convert the server response into JavaScript object data.
  return response.json();
}

// This function updates profile data using PUT.
export async function updateProfile(profileData) {
  // This simulates a server-side email conflict error.
  if (profileData.email === "conflict@example.com") {
    // Reject the promise with a custom error payload.
    return Promise.reject({
      field: "email",
      message: "This email is already taken. Please use another email.",
    });
  }

  // Send PUT request to update the full profile object.
  const response = await fetch(PROFILE_API_URL, {
    method: "PUT",

    // Tell JSON Server we are sending JSON data.
    headers: {
      "Content-Type": "application/json",
    },

    // Convert JavaScript object into JSON text.
    body: JSON.stringify(profileData),
  });

  // If PUT request fails, throw an error.
  if (!response.ok) {
    throw new Error("Failed to update profile.");
  }

  // Return the updated server response.
  return response.json();
}