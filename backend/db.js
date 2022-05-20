const mongoose = require("mongoose");

function connectDB() {
  // mongoose.connect('mongodb+srv://athif:Ryzenathif@cluster0.t5pyu.mongodb.net/athifcars' , {useUnifiedTopology: true , useNewUrlParser: true})
  mongoose.connect("mongodb+srv://ashiqali:ashiq12345@cluster0.uii8z.mongodb.net/BikeRental?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

//  mongoose.connect('mongodb://127.0.0.1:27017/BikeRental', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   });

  'mongodb://127.0.0.1:27017'
  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("Mongo DB Connection Successfull");
  });

  connection.on("error", () => {
    console.log("Mongo DB Connection Error");
  });
}

connectDB();
module.exports = mongoose;
