// type roomsQueryType = {
//     [key: string]: string;
// };

export const feedBacksQueries = {
    addFeedBack: `INSERT INTO feedbacks(
        rating_value,
        review_comment,
        user_id,
        hotel_id
        ) VALUES (?,?,?,?)`,

    getAllFeedBacks: `SELECT * FROM feedbacks`,

    getSingleFeedBackById: `SELECT * FROM feedbacks WHERE id = ?`,

    updateSingleFeedBackById: `UPDATE feedbacks SET 
    rating_value = ?,
    review_comment = ?,
    user_id = ?,
    hotel_id = ? WHERE id = ?`,

    deleteSingleFeedBackById: `DELETE FROM feedbacks WHERE id = ?`,
};
