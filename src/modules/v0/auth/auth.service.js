import jwt from 'jsonwebtoken';
import { User, RefreshToken } from './auth.models.js';
import bcrypt from 'bcryptjs';

export class AuthService {

    /**
     * Registers a new user
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
        const pubUser = { id: user._id, name: user.name };
        return { status: 201, user: pubUser };
    }

    /**
     * Log in a user and generate access and refresh tokens
     * @param {Object} data - An object containing user details (name, password).
     * @returns {Promise<{error: string, status: number} | {status: number, accessToken: string, refreshToken: string}>}
     */
    async login(data) {
        const user = await User.findOne({name: data.name});

        if (!user) return { error: 'Invalid name or password', status: 404 };

        const isValid = await bcrypt.compare(data.password, user.password);
        
        if (!isValid) return { error: 'Invalid name or password', status: 404 };

        const accessToken = await jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '15m' });

        const refreshToken = await jwt.sign({ id: user._id, name: user.name }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        await RefreshToken.create({
            userId: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return { status: 200, accessToken, refreshToken };
    }

    /**
     * Methods to get information about the currently authenticated user
     * @param {String} id - The ID of the user to retrieve information for.
     * @returns {Promise<{error: string, status: number} | {status: number, user: Object}>}
     */
    async whoami(id) {
        const user = await User.findById(id);
        if (!user) return { error: 'User not found', status: 404 };
        
        const pubUser = { id: user._id, name: user.name };
        return { status: 200, user: pubUser };
    }
}
