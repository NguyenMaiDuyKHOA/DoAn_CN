import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const reviewModel = mongoose.models.review || mongoose.model('Review', reviewSchema);

export default reviewModel;
