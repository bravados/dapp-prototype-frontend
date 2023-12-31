import { FileResponse } from '@interfaces/backend/FileResponse';
import { useMutation } from '@infrastructure/http';
import {
  CreateFilePayload,
  CreateFileResponse,
  DeleteFileResponse,
  FileService,
  IPFSFile,
} from './file.port';

const baseUrl = process.env.NEXT_PUBLIC_KIRUNALABS_API_URL;

class FileAdapter implements FileService {
  createFile(): CreateFileResponse {
    const uri = `${baseUrl}/files`;

    const [request, { loading, error, data }] = useMutation<FileResponse>(uri, {
      method: 'POST',
      contentType: 'multipart/form-data',
    });

    const requestWrapper = ({ file }: CreateFilePayload) => {
      const formData = new FormData();
      formData.append('file', file);

      request({ data: formData });
    };

    return [
      requestWrapper,
      {
        loading,
        error,
        data,
      },
    ];
  }

  deleteFile(): DeleteFileResponse {
    const uri = `${baseUrl}/files`;

    const [request, { loading, error, status }] = useMutation<void, IPFSFile>(uri, {
      method: 'DELETE',
    });

    const requestWrapper = (payload: IPFSFile) => {
      request({ data: payload });
    }

    return [
      requestWrapper,
      {
        loading,
        error,
        success: status === 'success',
      },
    ]
  }
}

export { FileAdapter };
