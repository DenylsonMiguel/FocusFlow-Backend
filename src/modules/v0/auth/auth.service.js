import User from './auth.models.js';
import bcrypt from 'bcryptjs';

export class AuthService {

    /**
     * Registers a new user in the system.
     * @param {Object} data - An object containing user details (name, password).
     * @returns {Promise<User>}
     */
    async register(data) {
        const existingUser = await User.findOne({name: data.name});
        if (existingUser) {
            return { error: 'User already exists', status: 409 };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const userData = {
            name: data.name,
            password: hashedPassword,
        };

        const user = await User.create(userData);
        const userSafe = { id: user._id, name: user.name };
        return { status: 201, user: userSafe };
    }
}
