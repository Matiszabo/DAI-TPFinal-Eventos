import { Router } from 'express';
import UserService from '../service/user-service.js';

const router = Router();
const svc = new UserService();

const handleRequest = (serviceMethod) => async (req, res) => {
	try {
		const [response, status] = await serviceMethod(req);
		return res.status(status).json(response);
	} catch (error) {
		console.error(`Controller error - ${req.method} ${req.path} : `, error);
		return res.status(500).send({
			success: false,
			message: `Controller error - ${req.method} ${req.path}`,
		});
	}
};

router.get(
	'/',
	handleRequest(() => svc.getUsers()),
);

router.post(
	'/login',
	handleRequest((req) => svc.login(req.body)),
);

router.post(
	'/register',
	handleRequest((req) => svc.register(req.body)),
);

export default router;
