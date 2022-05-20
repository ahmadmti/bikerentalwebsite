import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Divider, DatePicker, Checkbox } from "antd";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const { RangePicker } = DatePicker;
function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const [arrayofCars, setArrayofcars] = useState([]);
  const [model, setModel] = React.useState("");
  const [color, setColor] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [status, setStatus] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setModel(event.target.value);
  };

  useEffect(() => {
    axios.get("/api/bookings/checkExpireDate").then((res) => {
      console.log(res);
    });
  }, []);
  useEffect(() => {
    dispatch(getAllCars());
  }, []);
  useEffect(() => {
    setTotalcars(cars);
    setArrayofcars(cars);
  }, [cars]);

  function setFilter(values) {
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var temp = [];

    for (var car of cars) {
      if (car.bookedTimeSlots.length == 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(car);
          }
        }
      }
    }

    setTotalcars(temp);
  }
  function colorFilter(e) {
    console.log("color", totalCars);
    let filteredCars = arrayofCars?.filter(
      (item) => item.color == e.target.value
    );
    if (e.target.value == "all") {
      setTotalcars(arrayofCars);
    } else {
      setTotalcars(filteredCars);
    }
  }
  function modelFilter(e) {
    console.log("model", totalCars);
    let filteredCars = arrayofCars?.filter(
      (item) => item.model == e.target.value
    );
    if (e.target.value == "All") {
      setTotalcars(arrayofCars);
    } else {
      setTotalcars(filteredCars);
    }
  }
  function locationFilter(e) {
    console.log("color", totalCars);
    let filteredCars = arrayofCars?.filter(
      (item) => item.location == e.target.value
    );
    if (e.target.value == "All") {
      setTotalcars(arrayofCars);
    } else {
      setTotalcars(filteredCars);
    }
  }
  function statusFilter(e) {
    console.log("statusFilter", totalCars);
    let filteredCars = arrayofCars?.filter((item) => item.isBooked == false);
    if (e.target.value == "all") {
      setTotalcars(arrayofCars);
    } else {
      setTotalcars(filteredCars);
    }
  }
  function RatingFilter(e) {
    console.log("RatingFilter", totalCars);
    let filteredCars = arrayofCars?.filter(
      (item) => item.rating ==e.target.value
    );
    if (e.target.value == "all") {
      setTotalcars(arrayofCars);
    } else {
      console.log(filteredCars,"filter rating is")
      setTotalcars(filteredCars);
    }
  }
  var cities = ["All", "Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
 var models=["All","AbeAbbotsfor","Abe-Star","Alfer","Ardie","Allstate","Brasil & Movimento","Bultaco","Blata","Balkan","Benelli","Bimota","Clyno","Cooper","Cushman","Ceccato","Cleveland CycleWerks","Dayun","Dnepr","Delta-Gnom","Eso","Express Werke","Escorts Group","Fantic Motor",]
  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center" gutter={16}>
        <Col lg={3} sm={8} xs={12} className="d-flex justify-content-left">
          <Box sx={{ minWidth: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                
                label="Age"
                onChange={(e) => statusFilter(e)}
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={10}>AVAILABLE</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Col>
        <Col lg={3} sm={8} xs={12} className="d-flex justify-content-left">
          <Box sx={{ minWidth: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Model</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ textAlign: "left", marginBottom: "20px" }}
                
                name="model"
                label="Model"
                onChange={(e) => modelFilter(e)}
              >
                {models.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
                {/* <MenuItem value={"lahore"}>Lahore</MenuItem>
                <MenuItem value={"karachi"}>Karachi</MenuItem>
                <MenuItem value={"multan"}>Multan</MenuItem> */}
              </Select>
            </FormControl>
          </Box>
        </Col>
        <Col lg={3} sm={8} xs={12} className="d-flex justify-content-left">
          <Box sx={{ minWidth: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Color</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              
                label="Age"
                onChange={(e) => colorFilter(e)}
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"red"}>RED</MenuItem>
                <MenuItem value={"green"}>GREEN</MenuItem>
                <MenuItem value={"blue"}>BLUE</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Col>
        <Col lg={3} sm={8} xs={12} className="d-flex justify-content-left">
          <Box sx={{ minWidth: "100%" }}>
            <FormControl
              sx={{
                ".MuiPaper-elevation ": {
                  height: "200px !important",
                },
              }}
              fullWidth
            >
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ textAlign: "left", marginBottom: "20px" }}
                
                name="location"
                label="Location"
                onChange={(e) => locationFilter(e)}
              >
                {cities.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
                {/* <MenuItem value={"lahore"}>Lahore</MenuItem>
                <MenuItem value={"karachi"}>Karachi</MenuItem>
                <MenuItem value={"multan"}>Multan</MenuItem> */}
              </Select>
            </FormControl>
          </Box>
        </Col>
        <Col lg={3} sm={8} xs={12} className="d-flex justify-content-left">
          <Box sx={{ minWidth: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rating</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
               
                label="Age"
                onChange={(e) => RatingFilter(e)}
              >
                 <MenuItem value="all">All</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Col>

        {/* <Col lg={4} sm={8} xs={12} className="d-flex justify-content-left">
          <RangePicker
          style={{height:"57px"}}
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}
          />
        </Col> */}
      </Row>

      {loading == true && <Spinner />}
 {totalCars?.length>0?
      <Row justify="center" gutter={16}>
        {totalCars?.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={car.image} className="carimg" />

                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    {car.isBooked ? <CheckCircleIcon /> : null}
                    <p>{car.name}</p>
                    <p> Rent/hour ${car.rentPerHour}</p>
                    <Rating name="read-only" value={car.rating ? car.rating:0}  readOnly/>
                    {console.log(car.rating,"rastdfkkjhh")}
                  </div>

                  <div>
                    {car.isBooked ? (
                      <button disabled className="btn1 mr-2">
                        <Link to="/">Booked</Link>
                      </button>
                    ) : (
                      <button className="btn1 mr-2">
                        <Link to={`/booking/${car._id}`}>Book Now</Link>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>:<h1 style={{marginTop:"5%"}}>No Bike Found</h1>}
    </DefaultLayout>
  );
}

export default Home;
