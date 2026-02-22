import authRouter from "./auth/auth.controller.js";
import usersRouter from "./users/users.controller.js";

export default function registerRoutesV0(app) {
    app.use('/api/v0/auth', authRouter);
    app.use('/api/v0/users', usersRouter);
}