import { Nft } from '@domain/nft/nft';
import { Blockchain } from '@domain/wallet';
import { HTTPError } from '@infrastructure/http';

type CreateNftPayload = Nft & {creator: {id: number}};

type CreateNftResponse = [
  (payload: CreateNftPayload) => void,
  {
    loading: boolean;
    error?: HTTPError;
    data?: Nft;
  },
];

type GetNftPayload = {
  blockchain: Blockchain;
  id: string;
};

type GetNftResponse = [
  (payload: GetNftPayload) => void,
  {
    loading: boolean;
    error?: HTTPError;
    data?: Nft;
  },
];

interface NftService {
  createNft: () => CreateNftResponse;
  getNft: () => GetNftResponse;
}

export type {
  NftService,
  CreateNftPayload,
  CreateNftResponse,
  GetNftPayload,
  GetNftResponse,
};
