import ICreateAppointmentDto from "../dtos/ICreateAppointmentDto";
import Appointment from "../entities/AppointmentEntity";
import User from "../entities/UserEntity";
import { AppointmentStatus } from "../interfaces/IAppointment";
import { appointmentRepository, userRepository } from "../repositories/indexRepository";

export const getAllAppointmentService = async (): Promise<Appointment[]> => {
    const allAppointments: Appointment[] =
        await appointmentRepository.find();
    return allAppointments;
};

export const getAppointmentByIdService = async (
    turnId: number
): Promise<Appointment> => {
    const appointment: Appointment | null = await appointmentRepository
        .findOneBy(
            {
                id: turnId,
            }
        );
    if (!appointment) throw Error("Turno inexistente");
    return appointment;
};


export const scheduleAppointmentService = async (
    scheduleAppointmentDto: ICreateAppointmentDto
): Promise<Appointment> => {
    const { date, time, description, userId } = scheduleAppointmentDto;
    const user: User | null = await userRepository.findOneBy({
        id: userId,
    });
    if (!user) throw Error(`No existe usuario con id: ${userId}`);
    const newAppointment: Appointment = appointmentRepository.create({
        date, time, description
    });
    newAppointment.user = user;
    await appointmentRepository.save(newAppointment);
    return newAppointment;
};


export const cancelAppointmentService = async (
    turnId: number
): Promise<void> => {
    const appointment: Appointment | null = await appointmentRepository
        .findOneBy(
            {
                id: turnId,
            }
        );
    if (!appointment) throw Error(`No existe turno con id: ${turnId}`);
    appointment.status = AppointmentStatus.CANCELLED;
    await appointmentRepository.save(appointment);
    return;
}




