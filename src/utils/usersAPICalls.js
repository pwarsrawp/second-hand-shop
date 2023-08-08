export const fetchUser = async (userId, setter) => {
  try {
    const response = await fetch(`http://localhost:5005/api/users/${userId}`);
    if (response.status === 200) {
      const parsedUser = await response.json();
      setter(parsedUser);
    }
  } catch (error) {
    console.error(error);
  }
};
export const fetchProduct = async (productId, setter) => {
  try {
    const response = await fetch(
      `http://localhost:5005/api/users/${productId}`
    );
    if (response.status === 200) {
      const parsedProduct = await response.json();
      setter(parsedProduct);
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendUser = async (user, userId = "", method = "POST") => {
  return fetch(`http://localhost:5005/api/users/${userId}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
