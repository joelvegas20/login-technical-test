export const sendLoginDataToBackend = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data);
        return data;
      } else {
        alert(data.error || "Error en el inicio de sesión");
      }
    } catch (error) {
      alert("Error al intentar iniciar sesión");
    }
  };