import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const Review = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const currentUserId = 'userIdHere';
    const { backendUrl, token } = useContext(ShopContext);

    useEffect(() => {
        axios.get(backendUrl + '/api/review/review', productId, { headers: { token } })
            .then(response => setReviews(response.data.reviews || []))
            .catch(err => setError('Failed to fetch reviews'));
    }, [productId]);

    const handleAddReview = () => {
        axios.post(backendUrl + '/api/review/add', { productId, rating, comment }, { headers: { token } })
            .then(response => {
                if (response.data.success) {
                    setReviews([...reviews, response.data.review]);
                    alert('Thank you for your review!');
                }
            })
            .catch(error => {
                console.log(error);
                alert('Failed to add review.');
            });
    };

    const userHasReviewed = reviews.some(review => review.userId === currentUserId);

    return (
        <div>
            <h3>Product Reviews</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Hiển thị danh sách đánh giá */}
            {reviews.length === 0 ? <p>No reviews yet</p> : (
                reviews.map((review, index) => (
                    <div key={index}>
                        <p><strong>{review.userId?.name || 'Unknown User'}:</strong> {review.comment}</p>
                        <p>Rating: {review.rating}</p>
                    </div>
                ))
            )}

            {/* Form thêm đánh giá */}
            {!userHasReviewed && (
                <div>
                    <h4>Add a review</h4>
                    <label>Rating:</label>
                    <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <br />
                    <label>Comment:</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                    <br />
                    <button onClick={handleAddReview}>Submit Review</button>
                </div>
            )}
        </div>
    );
};

export default Review;