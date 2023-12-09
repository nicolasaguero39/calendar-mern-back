const mongoose = require("mongoose");

const DBConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);

    console.log("DB conected");
  } catch (error) {
    console.log("Error DB no conected");
  }
};

module.exports = { DBConection };
