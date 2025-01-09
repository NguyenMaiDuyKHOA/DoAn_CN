import { v2 as cloudinary } from "cloudinary"
import slideModel from "../models/slideModel.js"

// funtion for add image of slide baner
const addSlide = async (req, res) => {
    try {
        // Kiểm tra file tải lên
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Upload ảnh lên Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' });

        // Tạo dữ liệu slide
        const slideData = {
            image: result.secure_url, // URL ảnh từ Cloudinary
        };

        console.log(slideData);

        // Lưu dữ liệu vào MongoDB
        const slide = new slideModel(slideData);
        await slide.save();

        res.json({ success: true, message: "Banner added successfully", data: slide });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// funtion for list image of slide banner
const listSlide = async (req, res) => {
    try {
        const slide = await slideModel.find({});
        res.json({ success: true, slide })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// funtion for remove image of slide banner
const removeSlide = async (req, res) => {
    try {
        await slideModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Banner Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addSlide, listSlide, removeSlide }