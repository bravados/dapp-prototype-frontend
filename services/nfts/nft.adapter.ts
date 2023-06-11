import { NftBackend } from '@domain/nft/nft';
import {
  CreateNftPayload,
  CreateNftResponse,
  GetNftIdsResponse,
  GetNftPayload,
  GetNftResponse,
  GetNftsResponse,
  NftService,
} from './nft.port';
import {
  NftBackendResponse,
  NftIdsResponse,
  NftsBackendResponse,
} from '@interfaces/backend/NftResponse';
import {
  request as httpRequest,
  useMutation,
  useQuery,
} from '@infrastructure/http';
import { Blockchain } from '@domain/wallet';

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

  getNfts(): GetNftsResponse {
    const uri = `${baseUrl}/nfts`;

    const [request, { loading, error, data }] =
      useQuery<NftsBackendResponse>(uri);

    return [
      request,
      {
        loading,
        error,
        data: data
          ? data.nfts.map((backendNft) => NftBackend.fromData(backendNft))
          : data,
      },
    ];
  }

  // Not using useQuery here because it's called on the server side (no hooks)
  async getNftByBlockchainById(
    blockchain: Blockchain,
    id: string,
  ): Promise<NftBackend> {
    const uri = `${baseUrl}/nfts/${blockchain.toLowerCase()}/${id}`;

    try {
      const response = (await httpRequest(uri, {
        method: 'GET',
      })) as NftBackendResponse;
      const nft = NftBackend.fromData(response);

      return nft;
    } catch (error) {
      console.log(error);
      throw new Error('nft.adapter.getNftByBlockchainById: request failed');
    }
  }

  // Not using useQuery here because it's called on the server side (no hooks)
  async getNftIds(blockchain: Blockchain): Promise<GetNftIdsResponse> {
    const uri = `${baseUrl}/nfts/${blockchain.toLowerCase()}`;

    try {
      const response = (await httpRequest(uri, {
        method: 'GET',
      })) as NftIdsResponse;

      return response.ids;
    } catch (error) {
      console.log(error);
      throw new Error('nft.adapter.getNftIds: request failed');
    }
  }
}

export { NftAdapter };
