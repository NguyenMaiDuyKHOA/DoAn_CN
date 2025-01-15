import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// funtion for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, descriptionDetail, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });

                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            descriptionDetail,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestseller,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//funtion for list product
const listProduct = async (req, res) => {
    try {
        const product = await productModel.find({});
        res.json({ success: true, product })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const changeProduct = async (req, res) => {
    try {
        const productId = req.body.id;
        const { name, description, descriptionDetail, price, category, subCategory, bestseller, sizes } = req.body;
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });

                return result.secure_url
            })
        )

        // Đối tượng để lưu các trường cập nhật
        const updateFields = {
            name,
            description,
            descriptionDetail,
            price: Number(price),
            category,
            subCategory,
            bestSeller: bestseller,
            image: imagesUrl,
            sizes: JSON.parse(sizes),
            date: Date.now()
        };



        // Cập nhật hình ảnh (nếu có)
        // if (files) {
        //     updateFields.image = []; // Khởi tạo mảng ảnh mới
        //     if (files.image1) {
        //         updateFields.image[0] = files.image1[0].path;
        //     }
        //     if (files.image2) {
        //         updateFields.image[1] = files.image2[0].path;
        //     }
        //     if (files.image3) {
        //         updateFields.image[2] = files.image3[0].path;
        //     }
        //     if (files.image4) {
        //         updateFields.image[3] = files.image4[0].path;
        //     }
        // }

        // Xóa các trường không được cập nhật (giá trị undefined)
        for (const key in updateFields) {
            if (updateFields[key] === undefined) {
                delete updateFields[key];
            }
        }

        // Sử dụng findByIdAndUpdate để cập nhật
        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            { $set: updateFields },
            { new: true, runValidators: true } // new: true để trả về document đã cập nhật
        );

        // Kiểm tra nếu sản phẩm không tồn tại
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to update product'
        });
    }
};


//funtion for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//funtion for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProduct, addProduct, removeProduct, singleProduct, changeProduct }