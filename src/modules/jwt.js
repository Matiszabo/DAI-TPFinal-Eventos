import jwt from 'jsonwebtoken';

const secretKey = '123';
const options = {
    expiresIn: '1h',
    issuer: 'MA'
};

export default class JWTAuthService{
    async generateJWT(payload){
        const token = jwt.sign(payload, secretKey, options);
        return token;
    }

    async decryptJWT(token){
        try{
            const payload = await jwt.verify(token, secretKey);
            return payload;
        }
        catch (e){
            console.log(e);
        }
    }
}