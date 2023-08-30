/**
 * @function sendRegisterDataToBackend
 * @description Sends the register data to the backend
 * @param {FormData} formData
 * @returns {Promise<void>}
 */
export const sendRegisterDataToBackend = async (formData) => {
  try {
    // Send data to backend.
    const response = await fetch('http://localhost:8080/user/signup', {
      // This Url is Default, that's why it's backend running in the same machine.
      method: 'POST',
      body: formData,
    });
    // Get data.
    const data = await response.json();
    // Check if response is ok.
    if (response.ok) {
      // Return data and success message.
      alert("You have been registered successfully");
      return data;
    } else {
      // Return error message.
      alert(data.error || "There was an error");
    }
  } catch (error) {
    // Return error message.
    alert("There was an error with the server");
  }
};