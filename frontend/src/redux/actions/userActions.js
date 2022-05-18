import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login success");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      if (response.data.isAdmin == false) {
        window.location.href = "/";
      }
      if (response.data.isAdmin == true) {
        window.location.href = "/admin";
      }

      console.log("test user", response.data.isAdmin);
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/register", reqObj);
    // message.success("Registration successfull");
    setTimeout(() => {
      console.log("response", response.data);
      if (response.data === "no") {
        message.error("User already exist");
      }
      if (response.data === "yes") {
        message.success("Registration successfull");
        if (reqObj.isAdmin) {
          window.location.href = "/users";
        } else {
          window.location.href = "/login";
        }
      }
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const Edituser = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/edituser", reqObj);
    message.success("Edit User successfull");
    setTimeout(() => {
      
      
        window.location.href = "/users";
      
     
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};