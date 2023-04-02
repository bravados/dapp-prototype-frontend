import { Nft } from '@domain/nft/nft';
import { HTTPError } from '@infrastructure/http';

type CreateNftPayload = Nft;

type CreateNftResponse = [
  (payload: CreateNftPayload) => void,
  {
    loading: boolean;
    error?: HTTPError;
    data?: Nft;
  },
];

interface NftService {
  createNft: () => CreateNftResponse;
}

export type { NftService, CreateNftPayload, CreateNftResponse };
