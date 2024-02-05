export const registerUserService = async ({ name, email, password }) => {
    const URLPost = "http://localhost:3000/users/register";

    try {
        const response = await fetch(URLPost, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        //! console.log("response", response); Creo que deberiamos de borrarlo.
        if (!response.ok) {
            const result = await response.json();
            console.log(result);
            throw new Error("error comunication", result.message);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error("Error:", err);
    }
};
//* Tenemos que darle una vuelta a esto
