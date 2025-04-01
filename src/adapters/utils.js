import { jwtDecode } from "jwt-decode";

function GetUserId() {
  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    try {
      // Decode the token to extract user information
      const decodedToken = jwtDecode(token);
      // Extract user ID from decoded token
      userId = decodedToken.userId; // Modify this according to the structure of your token
      return userId;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
}
export { GetUserId };
