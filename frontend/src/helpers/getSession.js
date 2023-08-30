/**
 * @function getSession
 * @description Send the token to the backend and returns the data
 * @param {string} token
 * @returns {Promise<void>}
 */
export const getSession = async ({ token }) => {
  try {
    // Send data to backend.
    const response = await fetch("http://localhost:8080/user/get-session", {
      // This Url is Default, that's why it's backend running in the same machine.
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Get data.
    const data = await response.json();
    // Check if response is ok.
    if (response.ok) {
      // Return data.
      return data;
    } else {
      // Return error message.
      alert(data.error || "Error to get session");
    }
  } catch {
    // Return error message.
    alert("Error to get session");
  }
};
