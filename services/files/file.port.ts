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

type DeleteFileResponse = [
  (payload: IPFSFile) => void,
  {
    loading: boolean;
    error?: HTTPError;
    success: boolean;
  },
];

interface FileService {
  createFile(): CreateFileResponse;
  deleteFile(): DeleteFileResponse;
}

export type { IPFSFile, FileService, CreateFilePayload, CreateFileResponse, DeleteFileResponse };
