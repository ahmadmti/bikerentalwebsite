
import { Col, Row, Form, Input } from "antd";
import React,{ useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import BasicTable from "../components/BasicTable";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../components/Spinner";
import { addCar } from "../redux/actions/carsActions";
import { userRegister,Edituser } from "../redux/actions/userActions";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
  

const columns = 
  [
    {
        Header: "Id",
        accessor: "_id", // accessor is the "key" in the data
      },
    {
      Header: "Name",
      accessor: "username", // accessor is the "key" in the data
    },
    {
      Header: "Roll",
      accessor: "isAdmin",Cell:({value})=>(value==true? "Manager":"User")}
  ]

  const columns2 = [
    {
      Header: "Bike Name",
      accessor: "bikename", // accessor is the "key" in the data
    },
    {
      Header: "From",
      accessor: "bookedTimeSlots.from", // accessor is the "key" in the data
    },
    {
      Header: "To",
      accessor: "bookedTimeSlots.to", // accessor is the "key" in the data
    },
    {
      Header: "Total Hours",
      accessor: "totalHours",}
    // {
    //   Header: "Roll",
    //   accessor: "isAdmin",Cell:({value})=>(value==true? "Manager":"User")}
  ];

const UsersPage = () => {
    const[data,setData]= useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [editId, setEditId] = useState(null);
    const [editDialog, setEditDialog] = useState(false);
    const [viewId, setViewId] = useState(null);
    const [viewDialog, setViewDialog] = useState(false);
    const [role, setRole] = React.useState();
    const [data2, setData2] = useState([]);
    const [filterData, setFilterData] = React.useState("");
    const dispatch = useDispatch();
    const getData=()=>{
        axios.get("/api/users/getallusers").then((res)=>{
            console.log(res?.data,"responseeee")
            setData(res?.data)
        })
    }
    const deleteData = (id) => {
        console.log(id,"userid")
        axios.post("/api/users/deleteuser",{id} ).then((res) => {getData();
            message.success("User deleted successfully");});
      };
      

    useEffect(() => {
        getData()

    },[])
    
    useEffect(() => {
        if(data){
     setFilterData(data.find((o) => o._id == editId))
        }
       
    },[editId])

    const getuser = (_id) => {
      console.log(_id, "id ye han teri");
      axios.post("/api/bookings/GetBikesOfaUser", { _id }).then((res) => {
        console.log(res);
        
        setData2(res?.data);
      });
    };
  
  const { loading } = useSelector((state) => state.alertsReducer);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
   
 
    p: 4,
  };
  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
   background: "white",
 
    p: 4,
  };
  function onFinish(values) {
    
    if(role=="user"){
  values.isAdmin=false
    }
    else{
      values.isAdmin=true
    }
    values._id=editId
    
  dispatch(Edituser(values))
  console.log(values)
}
// function abc(){
//   var name="helo"
// }
{console.log(filterData,"filterdata")}
  return (
    <DefaultLayout>
         <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <Link to="/adduser">ADD User</Link>
            </button>
          </div>
        </Col>
      </Row>
        <Row justify="center" gutter={16}>
        <Col lg={20} sm={24} xs={24}>
      <BasicTable
        edit={(id) => {
            console.log(id,"id is jhere")
          
          setEditId(id);
          setEditDialog(true);
          
        }}
        view={(id) => {
          console.log(id, "id is jhere");
          setViewId(id);
          getuser(id)
          setViewDialog(true);
        }}
        remove={deleteData}
        columns={columns}
        data={data}
      />
      </Col>
      </Row>
      <div>
     
      <Modal
        open={editDialog}
        onClose={()=> setEditDialog(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
        <Row justify="center mt-5" >
        <Col lg={12} sm={24} xs={24} className="p-2" style={{background:"white"}}>
          <Form initialValues={{username:filterData?.username,password:filterData?.password,role:filterData?.isAdmin?"Manager":"User"}} className="bs1 p-2" layout="vertical" onFinish={onFinish}>
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
                value={role }
                label="role"
                name="isAdmin"
                onChange={(e) => setRole(e.target.value )}
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
      </Box>
      </Modal>
    </div>
    <div>
        <Modal
          open={viewDialog}
          onClose={() => setViewDialog(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <BasicTable
              
              columns={columns2}
              data={data2}
            />
          </Box>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;
