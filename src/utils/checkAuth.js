import jwtDecode from "jwt-decode";

export const checkAuth = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  if(userData){
    const token = userData.token;
    const decodedToken = jwtDecode(token);

    if(decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('userData');
    } else {
      return userData;
    }
  }
}