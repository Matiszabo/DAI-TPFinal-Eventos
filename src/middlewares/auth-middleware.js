import jwt from 'jsonwebtoken';

async function undoToken(token) {
	const secretKey = process.env.SECRETKEYJWT;
	try {
		return await jwt.verify(token, secretKey);
	} catch (error) {
		console.error(error);
		return 'Error en la conversion';
	}
}

function removeBearerFromToken(token) {
	const bearerPrefix = 'Bearer ';
	if (token.startsWith(bearerPrefix)) {
		return token.slice(bearerPrefix.length);
	} else {
		return token;
	}
}

function authMiddleware(req, res, next) {
	let authHeader = req.headers.authorization;
	if (!authHeader) {
		res
			.status(401)
			.send([{ succes: false, message: '401 Unauthorized, es necesario un token' }]);
	} else {
		authHeader = removeBearerFromToken(authHeader);
		undoToken(authHeader)
			.then((decodedToken) => {
				req.user = decodedToken;
				next();
			})
			.catch((error) => {
				console.error(error);
				res.status(401).send([{ success: false, message: 'Token inválido' }]);
			});
	}
}

export default authMiddleware;
