import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function validateUserData({
	first_name,
	last_name,
	username,
	password,
}) {
	const messages = [];

	if (first_name.length < 3) {
		messages.push('El campo first_name debe tener al menos 3 letras');
	}

	if (last_name.length < 3) {
		messages.push('El campo last_name debe tener al menos 3 letras');
	}

	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	if (!emailPattern.test(username)) {
		messages.push('El email ingresado no es válido');
	}

	if (password.length < 3) {
		messages.push('La contraseña debe tener más de 3 caracteres');
	}

	return messages;
}

export function generateToken(user) {
	const secretKey = process.env.SECRETKEYJWT;
	const options = { expiresIn: '1h', issuer: 'eventsManagement' };
	return jwt.sign(user, secretKey, options);
}
