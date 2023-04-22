interface NftNearResponse {
  token_id: string;
  owner_id: string;
  metadata: Metadata;
  approved_account_ids: { [key: string]: number };
  royalty: { [key: string]: number };
}

interface Metadata {
  title: string;
  description: string;
  media: string;
  media_hash: null;
  copies: number;
  issued_at: Maybe<number>;
  expires_at: null;
  starts_at: null;
  updated_at: null;
  extra: null;
  reference: null;
  reference_hash: null;
}

export type { NftNearResponse };
