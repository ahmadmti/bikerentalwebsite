import { Col, Row, Form, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addCar } from "../redux/actions/carsActions";
import { userRegister } from "../redux/actions/userActions";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


function AddUser() {
  const [role, setRole] = React.useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    
      if(role=="user"){
    values.isAdmin=false
      }
      else{
        values.isAdmin=true
      }
      
    dispatch(userRegister(values))
    console.log(values)
}


  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <h3>Add New User</h3>
            <hr />
            <Form.Item name="username" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Roles</InputLabel>
              <Select
                style={{ textAlign: "left" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="role"
                name="role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
              </Select>
            </FormControl>

            <div className="text-right mt-3">
              <button className="btn1">ADD User</button>
            </div>
          </Form>
        </Col>
      </Row>
     
    </DefaultLayout>
  );
}

export default AddUser;
