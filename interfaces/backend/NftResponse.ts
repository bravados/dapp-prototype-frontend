interface NftBackendResponse {
  id: string;
  title: Maybe<string>;
  description: Maybe<string>;
  media: string;
  price: string;
  blockchain: string;
  creator: {
    id: number;
    name: string;
    email: Maybe<string>;
    avatar: Maybe<string>;
  };
}

interface NftsBackendResponse {
  nfts: NftBackendResponse[];
}

interface NftIdsResponse {
  ids: string[];
}

export type { NftBackendResponse, NftsBackendResponse, NftIdsResponse };
