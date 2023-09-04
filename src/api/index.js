const URL = "https://jsonplaceholder.typicode.com/users";
export const getUsers = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (data) {
      return {
        data: data,
        message: "users fetched",
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error("error");
    return {
      message: error.message,
      success: false,
    };
  }
};

export const createUser = async (body) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const result = await response.json();
    if (result) {
      return {
        data: result,
        message: "contact created",
      };
    }

    throw new Error(result.message);
  } catch (error) {
    console.error("error");
    return {
      message: error.message,
      success: false,
    };
  }
};

export const updateUser = async (id, body) => {
  try {
    const response = await fetch(URL + "/" + id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const result = await response.json();
    if (result) {
      return {
        data: result,
        message: "contact updated",
      };
    }

    throw new Error(result.message);
  } catch (error) {
    console.error("error");
    return {
      message: error.message,
      success: false,
    };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(URL + "/" + id, {
      method: "DELETE",
    });
    //console.log("response", response);
    const result = await response.json();
    if (result) {
      return {
        data: result,
        message: "contact delete",
      };
    }
    throw new Error(result.message);
  } catch (error) {
    console.error("error");
    return {
      message: error.message,
      success: false,
    };
  }
};
