import { User } from "../auth/auth.models.js";

export class UsersService {
    /**
     * Method to update user details
     * @param {String} id - User ID
     * @param {{name: String}} data - Data to update 
     * @returns {{error: String, status: Number} | {status: Number, user: { name: String, id: String}}} - Updated user object or error object
     */
    async updateUser(id, data) {
        const user = await User.findById(id);
        if (!user) return { status: 401, error: "Invalid user" };
        
        user.name = data.name ?? user.name;
        await user.save();

        return { status: 200, user: { name: user.name, id: user._id.toString() } };
    }
}