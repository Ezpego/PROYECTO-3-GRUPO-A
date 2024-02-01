const urlBase = "http://localhost:3000";

export const sendInformationLogin = async (form) => {
  const obj = { email: form.email, password: form.password };

  console.log("obj", obj);
  const urlLogin = "/users/login";
  const URLPost = "http://localhost:3000" + urlLogin;

  try {
    const response = await fetch(URLPost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      return response;
    }

    let data = await response.json();
    // const { token } = await response.json();
    // console.log(token);

    if (data.message) {
      data = { ...data, email: obj.email };

      return data;
    }

    return data;
  } catch (err) {
    console.error("Error:", err);
  }
};

export const receiveExerciseList = async (urlExtension, options) => {
  const urlRuta = urlBase + urlExtension;

  const body = null;
  try {
    const response = await fetch(urlRuta, options);

    if (!response.ok) {
      return response;
    }
    let data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};