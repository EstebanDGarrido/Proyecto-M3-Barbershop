export enum AppointmentStatus {
    ACTIVE = 'active',
    CANCELLED = 'cancelled'
}

interface IAppointment {
    id: number;
    date: string;
    time: string;
    userId: number;
    description: string;
    status: AppointmentStatus;
}

export default IAppointment;