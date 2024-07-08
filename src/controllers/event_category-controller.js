import { Router } from 'express';
import CategoryService from '../service/event_category-service.js';

const router = Router();
const svc = new CategoryService();

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
	handleRequest(() => svc.getCategories()),
);

router.get(
	'/:id',
	handleRequest((req) => svc.getCategories(req.params.id)),
);

router.post(
	'/',
	handleRequest((req) => svc.createCategory(req.body)),
);

router.put(
	'/',
	handleRequest((req) => svc.updateCategory(req.body)),
);

router.delete(
	'/:id',
	handleRequest((req) => svc.deleteCategory(req.params.id)),
);

export default router;
