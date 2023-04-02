interface UserResponse {
  id?: number;
  name?: string;
  email?: Maybe<string>;
  avatar?: Maybe<string>;
  type?: string;
  wallets?: UserWalletResponse[];
}

interface UserWalletResponse {
  id?: number;
  blockchain?: string;
  address?: string;
  userId?: number;
}

export type { UserResponse, UserWalletResponse };
