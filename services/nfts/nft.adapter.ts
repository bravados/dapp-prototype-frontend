import { Nft, NftBackend } from '@domain/nft/nft';
import {
  CreateNftPayload,
  CreateNftResponse,
  GetNftPayload,
  GetNftResponse,
  NftService,
} from './nft.port';
import { NftBackendResponse } from '@interfaces/backend/NftResponse';
import { useMutation, useQuery } from '@infrastructure/http';

const baseUrl = process.env.NEXT_PUBLIC_KIRUNALABS_API_URL;

class NftAdapter implements NftService {
  createNft(): CreateNftResponse {
    const uri = `${baseUrl}/nfts`;

    const [request, { loading, error, data }] = useMutation<NftBackendResponse>(
      uri,
      {
        method: 'POST',
      },
    );

    const requestWrapper = (payload: CreateNftPayload) => {
      request({ data: payload });
    };

    return [
      requestWrapper,
      {
        loading,
        error,
        data: data ? NftBackend.fromData(data) : data,
      },
    ];
  }

  getNft(): GetNftResponse {
    const uri = `${baseUrl}/nfts`;

    const [request, { loading, error, data }] =
      useQuery<NftBackendResponse>(uri);

    const requestWrapper = ({ blockchain, id }: GetNftPayload) => {
      request({ path: `/${blockchain.toLowerCase()}/${id}` });
    };

    return [
      requestWrapper,
      { loading, error, data: data ? NftBackend.fromData(data) : data },
    ];
  }
}

export { NftAdapter };
