import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  address: string;

  @Column({ unique: false })
  city: string;
}
