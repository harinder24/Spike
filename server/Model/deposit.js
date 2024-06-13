
import mongoose from "mongoose";
const depositSchema = new mongoose.Schema({
  isValid:{
    type: Boolean
  },
  user: {
    type: String
  }
});

const depositModel = mongoose.model("deposit", depositSchema);

export default depositModel;
