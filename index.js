import fetch from "node-fetch";

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    throw new Error(`Error in fetchData: ${error.message}`);
  }
};
