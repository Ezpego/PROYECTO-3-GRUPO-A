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

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error message from server:", errorMessage);

      if (response.status === 409) {
        throw new Error("El correo electrónico ya está en uso");
      } else {
        throw new Error("Error de comunicación");
      }
    }

    const data = await response.text();
    console.log("Data from server:", data);
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};
