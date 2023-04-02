import { FileResponse } from '@interfaces/CreateFileResponse';
import { useMutation } from '@infrastructure/http';
import {
  CreateFilePayload,
  CreateFileResponse,
  FileService,
} from './file.port';

const baseUrl = process.env.NEXT_PUBLIC_KIRUNALABS_API_URL;

class FileAdapter implements FileService {
  createFile(): CreateFileResponse {
    const uri = `${baseUrl}/files`;

    const [request, { loading, error, data }] = useMutation<FileResponse>(uri, {
      method: 'POST',
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
}

export { FileAdapter };
