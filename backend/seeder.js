const users = require("./data/users.js");
const User = require("./models/userModel.js");
const connectDB = require("./db.js");

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error("error db");
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
