import { AuthService } from './auth.service.js';
import { Router } from 'express';
import { verifyJwt } from '../middlewares/verifyJwt.js'

const service = new AuthService();

export class AuthController {
    async register(req, res) {
        if (!req.body) return res.status(400).json({ error: 'Request body is required' });

        if (typeof req.body.name !== 'string' || typeof req.body.password !== 'string') return res.status(400).json({ error: 'Invalid name or password' });

        if (req.body.password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters long' });

        if (req.body.password.length > 16) return res.status(400).json({ error: 'Password must be at most 16 characters long' });

        if (req.body.name.length < 3) return res.status(400).json({ error: 'Name must be at least 3 characters long' });
        
        if (req.body.name.length > 30) return res.status(400).json({ error: 'Name must be at most 30 characters long' });

        const result = await service.register(req.body);
        if (result.error) return res.status(result.status).json({ error: result.error });
        
        return res.status(result.status).json({ user: result.user });
    }

    async login(req, res) {
        if (!req.body) return res.status(400).json({ error: 'Request body is required' });

        if (typeof req.body.name !== 'string' || typeof req.body.password !== 'string') return res.status(400).json({ error: 'Invalid name or password' });

        const result = await service.login(req.body);

        if (result.error) return res.status(result.status).json({ error: result.error });

        return res.status(result.status).json({ accessToken: result.accessToken, refreshToken: result.refreshToken });
    }

    async whoami(req, res) {
        if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

        const result = await service.whoami(req.user.id);

        if (result.error) return res.status(result.status).json({ error: result.error });

        return res.status(result.status).json({ user: result.user });
    }
}

const authRouter = Router();
const controller = new AuthController();

authRouter.post('/register', controller.register);
authRouter.post('/login', controller.login);
authRouter.get('/whoami', verifyJwt ,controller.whoami);

export default authRouter;
