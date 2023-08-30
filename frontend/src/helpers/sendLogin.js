/**
 * @function sendLoginDataToBackend
 * @description Sends the login data to the backend and returns the data
 * @param {FormData} formData
 * @returns {Promise<void>}
 */
export const sendLoginDataToBackend = async (formData) => {
  try {
    // Send data to backend.
    const response = await fetch("http://localhost:8080/user/login", {
      // This Url is Default, that's why it's backend running in the same machine.
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Get data.
    const data = await response.json();

    // Check if response is ok.
    if (response.ok) {
      // Return data.
      return data;
    } else {
      // Return error message.
      alert(data.error || "Error en el inicio de sesión");
    }
  } catch (error) {
    // Return error message.
    alert("Error al intentar iniciar sesión");
  }
};
