import bcrypt, { hash } from 'bcrypt';
import logger from '../logs/logger.js';
import 'dotenv/config';

// Encriptar texto
export const encryptText = async (text) => {
    try {
        const saltRounds = +process.env.BCRYPT_SALT_ROUNDS;
        return await bcrypt.hash(text, saltRounds);      
    } catch (error){
        logger.error(error.message);
        throw new Error('Error al encriptar');
    }
};

// Comparar texto
export const compareText = async (text, hash) => {
    try {
        return await bcrypt.compare(text, hash);      
    } catch (error){
        logger.error(error.message);
        throw new Error('Error al comparar');
    }
}