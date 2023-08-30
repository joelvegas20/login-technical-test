export const getSession = async ({token}) => {
    try {
        // Send data to backend.
        const response = await fetch('http://localhost:8080/user/get-session', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        // Get data.
        const data = await response.json();
        // Check if response is ok.
        if (response.ok) {
            return data;
        }
        else {
            return data;
        }
    } catch {
        return {
            error: "There was an error"
        };
    }

};