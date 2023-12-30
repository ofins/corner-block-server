import fetch from "node-fetch";

export const fetchData = async (url) => {
  console.log("url in fetchData:", url);
  try {
    const response = await fetch(url, {
        method:'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type':'application/json'
        }
    });
    console.log('response', response)
    const data = await response.json();
    console.log('data', data)
    return { status: response.status, data };
  } catch (error) {
    throw new Error(`Error in fetchData: ${error.message}`);
  }
};
