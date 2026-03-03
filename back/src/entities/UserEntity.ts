import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Credential from "./CredentialEntity";
import Appointment from "./AppointmentEntity";

@Entity({ name: "users" })
class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    birthdate!: string;

    @Column()
    nDni!: number;

    //* User 1:1 Credential
    @OneToOne(() => Credential)
    @JoinColumn({ name: "credential_id" })
    credential!: Credential;

    //* User 1:N Appointment
    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments!: Appointment[];
};

export default User;