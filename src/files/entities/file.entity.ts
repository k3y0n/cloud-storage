import { User } from 'src/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column()
  size: string;

  @Column()
  mimetype: string;

  @ManyToOne(() => User, (user) => user.files)
  user: User;

  @DeleteDateColumn()
  deletedAt?: Date;
}
