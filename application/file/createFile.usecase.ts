import { FileAdapter } from '@services/files/file.adapter';
import { FileService } from '@services/files/file.port';

class CreateFileUseCase {
  private fileService: FileService;

  constructor() {
    this.fileService = new FileAdapter();
  }

  createFile() {
    return this.fileService.createFile();
  }
}

function useCreateFile() {
  return new CreateFileUseCase().createFile();
}

export { useCreateFile };
