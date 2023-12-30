import fetch from "node-fetch";

export const fetchData = async (url) => {
  console.log("url in fetchData:", url);
  try {
    const response = await fetch(url);
    const data = await response.json();

    return { status: response.status, data };
  } catch (error) {
    throw new Error(`Error in fetchData: ${error.message}`);
  }
};
