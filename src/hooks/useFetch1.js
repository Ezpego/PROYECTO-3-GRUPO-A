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
    console.log("response", response);
    if (!response.ok) {
      throw new Error("error comunication");
    }
    console.log(response);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    // console.error("Error:", err);  este es el error que me daba unexpected token...
  }
};
