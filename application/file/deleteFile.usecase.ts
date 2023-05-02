import { FileAdapter } from '@services/files/file.adapter';
import { FileService } from '@services/files/file.port';

class DeleteFileUseCase {
  private fileService: FileService;

  constructor() {
    this.fileService = new FileAdapter();
  }

  deleteFile() {
    return this.fileService.deleteFile();
  }
}

function useDeleteFile() {
  return new DeleteFileUseCase().deleteFile();
}

export { useDeleteFile };
