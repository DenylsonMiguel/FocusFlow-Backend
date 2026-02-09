import authRouter from "./auth/auth.controller.js";

export default function registerRoutes(app) {
    app.use('/api/v0/auth', authRouter);
}