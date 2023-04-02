import { HTTPError } from '@infrastructure/http';

type IPFSFile = {
  cid: string;
};

type CreateFilePayload = {
  file: any;
};

type CreateFileResponse = [
  (payload: CreateFilePayload) => void,
  {
    loading: boolean;
    error?: HTTPError;
    data?: IPFSFile;
  },
];

interface FileService {
  createFile(): CreateFileResponse;
}

export type { FileService, CreateFilePayload, CreateFileResponse };
