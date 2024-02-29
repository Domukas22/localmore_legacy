//

import { base_URL } from "./config";

export async function LIST_staticProfiles() {
  const url = `${base_URL}/staticProfiles`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ERROR with LIST_staticProfiles while fetching data:", error);
    return [];
  }
}

export async function LIST_allTags() {
  const url = `${base_URL}/tags`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function LIST_tagUsages() {
  const url = `${base_URL}/tagUsages`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// create a function to fetcha  single category, then  a single tagGroup

export async function GET_city(cityID) {
  const url = `${base_URL}/cities/${cityID}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
