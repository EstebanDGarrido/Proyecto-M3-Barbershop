import { Request, Response } from "express";
import {
    createUserService,
    findUserByCredentialIdService,
    getAllUsersService,
    getUserByIdService
} from "../services/usersService";
import { validateCredentialService } from "../services/credentialsService";
import User from "../entities/UserEntity";


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers: User[] = await getAllUsersService();
        res.status(200).json(allUsers);
    } catch (error: any) {
        res.status(404).json({ message: error.message, error })
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user: User = await getUserByIdService(Number(id));
        res.status(200).json(user);
    } catch (error: any) {
        res.status(404).json({ message: error.message, error })
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        // if(typeof nDni !== "number") throw Error('nDni debe ser un número')
        const newUser = await createUserService({
            name,
            email,
            birthdate,
            nDni,
            username,
            password
        });
        const { credential, ...userWithoutCredential } = newUser;
        res.status(201).json(userWithoutCredential);
    } catch (error: any) {
        res.status(404).json({ message: error.message, error })
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const credentialId: number = await validateCredentialService({
            username,
            password,
        });
        const actualUser = await findUserByCredentialIdService(credentialId);
        res.status(200).json({
            login: true,
            actualUser,
        });
    } catch (error: any) {
        res.status(404).json({ message: error.message, error })
    }
};
