import reviewModel from '../models/reviewModel.js';

// Thêm review cho sản phẩm
const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.userId; // Lấy userId từ middleware

        // Kiểm tra nếu người dùng đã đánh giá sản phẩm này
        const existingReview = await reviewModel.findOne({ productId, userId });

        if (existingReview) {
            return res.status(400).json({
                message: "You have already reviewed this product."
            });
        }

        // Tạo mới review
        const newReview = new reviewModel({
            productId,
            userId,
            rating,
            comment
        });

        await newReview.save();
        return res.status(201).json({
            success: true,
            message: "Review added successfully.",
            review: newReview
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};

// Lấy tất cả reviews của một sản phẩm
const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        // Lấy tất cả reviews của sản phẩm
        const reviews = await reviewModel
            .find({ productId })
            .populate('userId', 'name')
            .skip((page - 1) * limit)
            .limit(limit);

        const totalReviews = await reviewModel.countDocuments({ productId });

        return res.status(200).json({
            success: true,
            reviews,
            totalReviews,
            totalPages: Math.ceil(totalReviews / limit),
            currentPage: page
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};

export { addReview, getReviewsByProduct };