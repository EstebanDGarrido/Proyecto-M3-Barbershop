import IcreateCredentialDto from "../dtos/ICreateCredentialDto";
import Credential from "../entities/CredentialEntity";
import { credentialRepository } from "../repositories/indexRepository";

export const createCredentialService = async (
    createCredentialDto: IcreateCredentialDto
): Promise<Credential> => {
    const { username, password } = createCredentialDto;
    const foundCredential: Credential | null = await credentialRepository.findOneBy({ username });
    if (foundCredential) throw Error("Ya está registrado un usuario con el username dado")
    const newCredential: Credential = credentialRepository.create({
        username,
        password,
    })
    await credentialRepository.save(newCredential);
    return newCredential;
};

export const validateCredentialService = async (validateCredentialDto: IcreateCredentialDto): Promise<number> => {
    const { username, password } = validateCredentialDto;
    const foundCredential: Credential | null = await credentialRepository.findOneBy({ username });
    if (!foundCredential) throw Error("Credenciales incorrectas.");
    if (password !== foundCredential.password) throw Error("Credenciales incorrectas");
    return foundCredential.id;
};