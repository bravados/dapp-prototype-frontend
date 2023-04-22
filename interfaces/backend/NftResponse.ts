interface NftBackendResponse {
  id: string;
  title: Maybe<string>;
  description: Maybe<string>;
  media: string;
  price: string;
  blockchain: string;
}

export type { NftBackendResponse };
