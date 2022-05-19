import { message } from "antd";
import axios from "axios";

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/bikes/getallbikes");
    dispatch({ type: "GET_ALL_CARS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/bikes/addbikes", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("New Bike added successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/bikes/editbikes", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Bike details updated successfully");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/bikes/deletebikes", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Bike deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
