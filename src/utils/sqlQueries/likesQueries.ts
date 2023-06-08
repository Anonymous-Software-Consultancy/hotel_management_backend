// type roomsQueryType = {
//     [key: string]: string;
// };

export const likesQueries = {
    like: `INSERT INTO likes(
        isLiked,
        liked_user_id,
        package_id
        ) VALUES (?, ?, ?)`,

    getAllLikesByUserId: `SELECT * FROM likes WHERE liked_user_id = ?`,

    getAllLikesByPackageId: `SELECT liked_user_id FROM likes WHERE package_id = ?`,

    getLikedUserById: `SELECT * FROM likes WHERE isLiked = ? AND liked_user_id = ? AND package_id = ?`,

    unLike: `DELETE FROM likes WHERE liked_user_id = ? AND package_id = ?`
};