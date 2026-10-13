// Common function to call and fetch api's and return responses

// api url --this should be in the .env but for now we are putting it here as a variable

const apiUrl = `https://dummyjson.com`;

export const getApiCaller = async (endpoint) => {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
}