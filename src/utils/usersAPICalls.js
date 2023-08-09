const api_url = import.meta.env.VITE_API_URL;

export const fetchUser = async (userId, setter) => {
  try {
    const response = await fetch(`${api_url}/users/${userId}`);
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
      `${api_url}/products/${productId}`
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

  return fetch(`${api_url}/users/${userId}`, {

    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
