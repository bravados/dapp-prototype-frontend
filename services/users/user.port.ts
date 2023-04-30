import { User } from '@domain/user';
import { Blockchain } from '@domain/wallet/wallet';
import { HTTPError, QueryResponse } from '@infrastructure/http';
import { Scalars } from '@infrastructure/scalars';

type Address = Scalars['Address'];

type GetUserResponse = QueryResponse<User, HTTPError>;

type GetUserIdsResponse = number[];

type GetUserByIdResponse = User | null;

type CreateUserPayload = {
  blockchain: Blockchain;
  address: Address;
};

type CreateUserResponse = QueryResponse<User>;

type UpdateUserProfileRequestPayload = {
  name: string;
  email?: string;
};

type UpdateUserProfileResponse = [
  (payload: UpdateUserProfileRequestPayload) => void,
  {
    loading: boolean;
    error?: HTTPError;
    data?: User;
  },
]

interface UserService {
  createUser(payload: CreateUserPayload): CreateUserResponse;
  getUser(blockchain: Blockchain, address: Address): GetUserResponse;
  getUserIds(): Promise<GetUserIdsResponse>;
  getUserById(id: number): Promise<User>;
  updateUserProfile(id: number): UpdateUserProfileResponse;
}

export type {
  UserService,
  GetUserResponse,
  GetUserIdsResponse,
  GetUserByIdResponse,
  CreateUserPayload,
  UpdateUserProfileRequestPayload,
  CreateUserResponse,
  UpdateUserProfileResponse,
};
