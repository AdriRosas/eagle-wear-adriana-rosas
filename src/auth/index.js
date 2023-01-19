import axios from "axios";
import Cookies from "js-cookie";

const ENDPOINT_PATH = "https://reqres.in/api/";

export default {
/* Setting a cookie with the name userLogged and the value of userLogged. */
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
/* Getting the userLogged cookie. */
  getUserLogged() {
    return Cookies.get("userLogged");
  },
/* A function that takes in three parameters, name, email, and password. It then creates a user object
with those three parameters. It then returns the axios.post method with the endpoint path and the
user object. */
  register(name, email, password) {
    const user = { name, email, password };
    return axios.post(ENDPOINT_PATH + "regiser", user);
  },
/* Creating a function called login that takes in two parameters, email and password. It then creates a
user object with those two parameters. It then returns the axios.post method with the endpoint path
and the user object. */
  login(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH + "login", user);
  },
/* Deleting the userLogged cookie. */
  deleteUserLogged() {
    Cookies.remove("userLogged");
  },
};
