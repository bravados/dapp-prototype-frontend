import { FileResponse } from '@interfaces/CreateFileResponse';
import { useMutation } from '@infrastructure/http';
import { CreateFileResponse, FileService } from './file.port';

const baseUrl = process.env.NEXT_PUBLIC_KIRUNALABS_API_URL;

class FileAdapter implements FileService {
  createFile(file: any): CreateFileResponse {
    const uri = `${baseUrl}/files`;

    const formData = new FormData();
    formData.append('file', file);

    const [request, { loading, error, data }] = useMutation<FileResponse>(uri, {
      method: 'POST',
    });

    const requestWrapper = () => {
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
