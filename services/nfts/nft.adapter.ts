import { Nft } from '@domain/nft/nft';
import { CreateNftPayload, CreateNftResponse, NftService } from './nft.port';
import { NftResponse } from '@interfaces/NftResponse';
import { useMutation } from '@infrastructure/http';

const baseUrl = process.env.NEXT_PUBLIC_KIRUNALABS_API_URL;

class NftAdapter implements NftService {
  createNft(): CreateNftResponse {
    const uri = `${baseUrl}/nfts`;

    const [request, { loading, error, data }] = useMutation<NftResponse>(uri, {
      method: 'POST',
    });

    const requestWrapper = (payload: CreateNftPayload) => {
      request({ data: payload });
    };

    return [
      requestWrapper,
      {
        loading,
        error,
        data: data ? Nft.fromData(data) : data,
      },
    ];
  }
}

export { NftAdapter };
