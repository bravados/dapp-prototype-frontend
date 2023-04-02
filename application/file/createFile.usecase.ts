import { FileAdapter } from '@services/files/file.adapter';
import { FileService } from '@services/files/file.port';

class CreateFileUseCase {
  private fileService: FileService;

  constructor() {
    this.fileService = new FileAdapter();
  }

  async createFile() {
    return this.fileService.createFile();
  }
}

function useCreateFile() {
  return new CreateFileUseCase().createFile();
}

export { useCreateFile };
