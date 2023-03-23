import { User } from '@domain/user';
import { Blockchain } from '@domain/wallet/wallet';
import { QueryResponse } from '@infrastructure/http';
import { Scalars } from '@infrastructure/scalars';

type Address = Scalars['Address'];

type GetUserResponse = QueryResponse<User>;

type CreateUserPayload = {
  blockchain: Blockchain;
  address: Address;
};

type CreateUserResponse = QueryResponse<User>;

interface UserService {
  createUser(payload: CreateUserPayload): CreateUserResponse;
  getUser(blockchain: Blockchain, address: Address): GetUserResponse;
}

export type {
  UserService,
  GetUserResponse,
  CreateUserPayload,
  CreateUserResponse,
};
