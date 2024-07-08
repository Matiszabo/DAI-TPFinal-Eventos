import { Router } from 'express';
import ProvinceService from '../service/province-service.js';

const router = Router();
const svc = new ProvinceService();

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
	handleRequest(() => svc.getProvinces()),
);

router.get(
	'/:id',
	handleRequest((req) => svc.getProvinceById(req.params.id)),
);

router.get(
	'/:id/locations',
	handleRequest((req) => svc.getLocationsByProvince(req.params.id)),
);

router.post(
	'/',
	handleRequest((req) => svc.addProvince(req.body)),
);

router.put(
	'/',
	handleRequest((req) => svc.updateProvince(req.body)),
);

router.delete(
	'/:id',
	handleRequest((req) => svc.deleteProvince(req.params.id)),
);

export default router;
