interface UserResponse {
  id?: number;
  name?: string;
  email?: Maybe<string>;
  avatar?: Maybe<string>;
  type?: string;
  wallets?: UserWalletResponse[];
  royalties?: UserRoyaltyResponse[];
}

interface UserWalletResponse {
  id?: number;
  blockchain?: string;
  address?: string;
  userId?: number;
}

interface UserRoyaltyResponse {
  userId: number;
  walletId: number;
  percent: number;
  wallet: UserWalletResponse;
}

interface UserIdsResponse {
  ids: number[];
}

interface UploadAvatarResponse {
  url: string;
}

export type { UserResponse, UserWalletResponse, UserRoyaltyResponse, UserIdsResponse, UploadAvatarResponse };
