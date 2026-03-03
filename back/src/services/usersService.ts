import ICreateUserDto from "../dtos/ICreateUserDto";
import Credential from "../entities/CredentialEntity";
import User from "../entities/UserEntity";
import { userRepository } from "../repositories/indexRepository";
import { createCredentialService } from "./credentialsService";

export const getAllUsersService = async (): Promise<User[]> => {
    const allUsers: User[] = await userRepository.find({
        relations: { appointments: true },
    });
    return allUsers;
}

export const getUserByIdService = async (id: number): Promise<User> => {
    const user: User | null = await userRepository.findOne({
        where: { id },
        relations: ["appointments"],
    })
    if (!user) throw new Error("Usuario no encontrado")
    return user;
}

export const createUserService = async (
    createUserDto: ICreateUserDto
) => {
    const {
        name, email, birthdate, nDni, username, password
    } = createUserDto;
    const foundUser: User | null =
        await userRepository.findOneBy({ email });
    if (foundUser)
        throw new Error("El email ya se encuentra registrado");
    const newCredential: Credential = await createCredentialService({
        username, password
    });
    const newUser: User = userRepository.create({
        name, email, birthdate, nDni
    });
    await userRepository.save(newUser);
    newUser.credential = newCredential
    await userRepository.save(newUser);
    return (newUser);
};

export const findUserByCredentialIdService = async (
    credentialId: number
): Promise<User> => {
    const user: User | null = await userRepository.findOneBy({
        credential: { id: credentialId },
    });
    if (!user) throw new Error("Usuario no encontrado");
    return user;
};