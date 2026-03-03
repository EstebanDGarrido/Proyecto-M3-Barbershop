import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppointmentStatus } from "../interfaces/IAppointment";
import User from "./UserEntity";

@Entity({ name: "appointments" })
class Appointment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @Column()
    time!: string;

    @Column()
    description!: string;

    @Column({
        default: AppointmentStatus.ACTIVE,
    })
    status!: AppointmentStatus;

    //* Appointment N:1 User
    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn({ name: "user_id" })
    user!: User;
}

export default Appointment;