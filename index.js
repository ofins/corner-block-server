import axios from "axios";

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not in JSON format");
    }

    const data = await response.data;
    return { status: response.status, data };
  } catch (error) {
    throw new Error(`Error in fetchData: ${error.message}`);
  }
};
