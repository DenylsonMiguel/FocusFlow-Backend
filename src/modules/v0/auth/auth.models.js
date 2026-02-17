import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const User = mongoose.model('User', userSchema);


const refreshTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    state: {
        type: String,
        enum: ['active', 'revoked'],
        default: 'active',
    },
});

export const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
