import { HTTPError, MutationResponse } from '@infrastructure/http';

type IPFSFile = {
  cid: string;
};

type CreateFileResponse = MutationResponse<IPFSFile, HTTPError>;

interface FileService {
  createFile(file: any): CreateFileResponse;
}

export type { FileService, CreateFileResponse };
