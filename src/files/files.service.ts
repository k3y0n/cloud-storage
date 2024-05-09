import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File, FileType } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  findAll(userId: number, fileType: FileType) {
    const qb = this.fileRepository.createQueryBuilder('file');

    qb.where('file.userId = :userId', { userId });

    if (fileType === FileType.PHOTOS) {
      qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' });
    }

    if (fileType === FileType.TRASH) {
      qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
    }
    return qb.getMany();
  }

  create(file: Express.Multer.File, userId: number) {
    return this.fileRepository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
    });
  }

  async remove(userId: number, id: string) {
    const idsArray = id.split(',');

    const qb = this.fileRepository.createQueryBuilder('file');

    qb.where('id IN (:... id) AND userId = :userId', {
      id: idsArray,
      userId,
    });

    return qb.softDelete().execute();
  }
}
