import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
    image: { type: String, required: true }
})

const slideModel = mongoose.models.slide || mongoose.model("slide", slideSchema);

export default slideModel