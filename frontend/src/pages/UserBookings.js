import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row } from "antd";
import Rating from "@mui/material/Rating";
import Spinner from "../components/Spinner";
import moment from "moment";
import Box from "@mui/material/Box";
import { message } from "antd";
import axios from "axios";
function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  const rateingHandle = (stars, _id) => {
    axios.post("/api/bookings/setRating", { stars, _id }).then((res) => {
      dispatch(getAllBookings());
      message.success("Rated successfully");
    });
  };
  const cancelHandle = (_id) => {
    axios.post("/api/bookings/cancelBooking", { _id }).then((res) => {
      dispatch(getAllBookings());
      message.success("Canceled successfully");
    });
  };
  const [value, setValue] = React.useState(2);
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <h3 className="text-center mt-2">My Reservations</h3>

      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          {bookings
            .filter((o) => o.user == user._id)
            .map((booking) => {
              return (
                <Row gutter={16} className="bs1 mt-3 text-left">
                  <Col lg={6} sm={24}>
                    <p>
                      Bike Name : <b>{booking.car.name}</b>
                    </p>
                    <p>
                      Model : <b>{booking.car.model}</b>
                    </p>
                    <p>
                      Color : <b>{booking.car.color}</b>
                    </p>
                    <p>
                      Location : <b>{booking.car.location}</b>
                    </p>
                    <p>
                      From: <b>{booking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To: <b>{booking.bookedTimeSlots.to}</b>
                    </p>
                  </Col>

                  <Col lg={12} sm={24}>
                    {/* <p>Transaction Id : <b>{booking.transactionId}</b></p> */}

                    <p>
                      Total hours : <b>{booking.totalHours}</b>
                    </p>
                    <p>
                      Rent per hour : <b>{booking.car.rentPerHour}</b>
                    </p>
                    <p>
                      Total amount : <b>{booking.totalAmount}</b>
                    </p>
                    <p>
                      Date of booking:{" "}
                      <b>{moment(booking.createdAt).format("MMM DD yyyy")}</b>
                    </p>
                    <button
                      onClick={() => cancelHandle(booking.car._id)}
                      className="btn1 mt-2 mb-5"
                    >
                      {" "}
                      Cancel Reservation
                    </button>
                  </Col>

                  <Col lg={6} sm={24} className="text-right">
                    <img
                      style={{ borderRadius: 5 }}
                      src={booking.car.image}
                      height="140"
                      className="p-2"
                    />
                    <Box display="flex" justifyContent="space-around">
                      <Rating
                        name="simple-controlled"
                        value={booking.rating}
                        onChange={(e) => {
                          rateingHandle(e.target.value, booking._id);
                        }}
                      />
                      {/* <button onClick={()=> } className="btn1 ">
                      
                      Rate
                    </button> */}
                    </Box>
                  </Col>
                </Row>
              );
            })}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;
