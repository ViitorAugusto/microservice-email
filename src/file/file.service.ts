import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class FileService {
  upload(file: Express.Multer.File, path: string) {
    return writeFile(path, file.buffer);
  }
}
