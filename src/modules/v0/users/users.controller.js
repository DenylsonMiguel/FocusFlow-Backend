import { UsersService } from "./users.service.js";
import { Router } from "express";
import { verifyAccessToken } from "../middlewares/auth/verifyToken.js"

const service = new UsersService();

class UserController {
    async updateUser(req, res) {
        if (!req.body) return res.status(400).json({ error: 'Request body is required' });

        if (typeof req.body.name !== "string") return res.status(400).json({ error: "Missing or Invalid name" });

        if (!req.user) return res.status(401).json({ error: 'Invalid token' });

        const result = await service.updateUser(req.user.id, { name: req.body.name });

        if (result.error) return res.status(result.status).json({ error: result.error });
        res.status(result.status ?? 200).json({ user: result.user });
    }
}

const controller = new UserController()
const usersRouter = Router();

usersRouter.put('', verifyAccessToken, controller.updateUser);

export default usersRouter;
