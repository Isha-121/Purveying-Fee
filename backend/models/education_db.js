const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const EduSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tagField: [
    {
      type: String,
    },
  ],
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  time: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: true,
  },
  ngoId: {
    type: ObjectId,
    required: true,
  },
  ngoName: {
    type: String,
    required: true,
  },
});

const Edu = mongoose.model("Edu", EduSchema);

// const e = new Edu({
//   description: "Intro to ReactJS",
//   tagField: "Web Development",
//   startDate: "2022-09-26",
//   endDate: "2022-10-25",
//   day: "Tuesday",
//   time: "14:00 - 16:00",
//   address: "xyz/1, Abc Road",
//   city: "Ahmedabad",
//   state: "Gujarat",
//   contactNo: 9999999991,
// });

// e.save((error, edu) => {
//   if (error) console.log(error);
//   console.log(edu);
// });

module.exports = Edu;
