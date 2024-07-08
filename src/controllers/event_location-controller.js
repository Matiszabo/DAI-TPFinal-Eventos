import { Router } from 'express';
import EventLocationService from '../service/event_location-service.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = Router();
const svc = new EventLocationService();

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
	authMiddleware,
	handleRequest((req) => svc.getEventLocations(req)),
);

router.get(
	'/:id',
	authMiddleware,
	handleRequest((req) => svc.getEventLocation(req)),
);

router.post(
	'/',
	authMiddleware,
	handleRequest((req) => svc.createEventLocation(req)),
);

router.put(
	'/',
	authMiddleware,
	handleRequest((req) => svc.updateEventLocation(req)),
);

router.delete(
	'/:id',
	authMiddleware,
	handleRequest((req) => svc.deleteEventLocation(req.params.id, req.user.id)),
);

export default router;
