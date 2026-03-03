import { Request, Response } from "express";
import {
    cancelAppointmentService,
    getAllAppointmentService,
    getAppointmentByIdService,
    scheduleAppointmentService,
} from "../services/appointmentsService";
import Appointment from "../entities/AppointmentEntity";

export const getAllAppointments = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const allAppointments: Appointment[] =
            await getAllAppointmentService();
        res.status(200).json(allAppointments);
    } catch (error: any) {
        res.status(404).json({ ërror: error.message });
    }
};

export const getAppointmentById = async (
    req: Request<{ turnId: string }, {}, {}>,
    res: Response
): Promise<void> => {
    const { turnId } = req.params;
    try {
        const appointment =
            await getAppointmentByIdService(Number(turnId));
        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};

export const schedule = async (
    req: Request, res: Response
): Promise<void> => {
    const { date, time, description, userId } = req.body;
    try {
        const newAppointment: Appointment =
            await scheduleAppointmentService({
                date, time, description, userId
            });
        res.status(201).json(newAppointment);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const cancel = async (
    req: Request<{ turnId: string }, {}, {}>,
    res: Response
): Promise<void> => {
    const { turnId } = req.params;
    try {
        await cancelAppointmentService(Number(turnId));
        res.status(200).json({
            message: `Turno con Id: ${turnId} cancelado`
        });
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
};