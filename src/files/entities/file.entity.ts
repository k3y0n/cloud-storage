import { User } from 'src/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum FileType {
  PHOTOS = 'photos',
  TRASH = 'trash',
}

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column()
  size: number;

  @Column()
  mimetype: string;

  @ManyToOne(() => User, (user) => user.files)
  user: User;

  @DeleteDateColumn()
  deletedAt?: Date;
}
