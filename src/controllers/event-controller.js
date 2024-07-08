import { Router } from 'express';
import EventService from '../service/event-service.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = Router();
const svc = new EventService();

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
	handleRequest((req) => svc.getEvents(req.query)),
);

router.get(
	'/:id',
	handleRequest((req) => svc.getEventDetails(req.params.id)),
);

router.get(
	'/:id/enrollment',
	handleRequest((req) => svc.getEnrollments(req.params.id, req.query)),
);

router.post(
	'/',
	authMiddleware,
	handleRequest((req) => svc.addEvent(req)),
);

router.put(
	'/',
	authMiddleware,
	handleRequest((req) => svc.updateEvent(req)),
);

router.delete(
	'/:id',
	authMiddleware,
	handleRequest((req) => svc.deleteEvent(req.params.id, req.user)),
);

router.post(
	'/:id/enrollment',
	authMiddleware,
	handleRequest((req) => svc.enrollInEvent(req.params.id, req.user)),
);

router.delete(
	'/:id/enrollment',
	authMiddleware,
	handleRequest((req) => svc.removeEnrollment(req.params.id, req.user)),
);

router.patch(
	'/:id/enrollment/:rating',
	authMiddleware,
	handleRequest((req) =>
		svc.updateEnrollment(
			req.params.id,
			req.params.rating,
			req.user,
			req.body.observations,
		),
	),
);

export default router;
