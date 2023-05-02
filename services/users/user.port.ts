import { User } from '@domain/user';
import { Blockchain } from '@domain/wallet/wallet';
import { HTTPError, QueryOptions, QueryResponse } from '@infrastructure/http';
import { Scalars } from '@infrastructure/scalars';

const GET_KIRUNALABS_USER_QUERY = 'kirunalabs_user_query';

type Address = Scalars['Address'];

type GetUserResponse = QueryResponse<User, HTTPError>;

type GetUserIdsResponse = number[];

type GetUserByIdResponse = User | null;

type CreateUserPayload = {
  blockchain: Blockchain;
  address: Address;
};

type CreateUserResponse = QueryResponse<User>;

type RemoveUserAvatarResponse = [
  () => void,
  {
    loading: boolean;
    error?: HTTPError;
    success: boolean;
  },
];

type UpdateUserAvatarRequestPayload = {
  file: File;
}

type UpdateUserAvatarResponse = [
  (payload: UpdateUserAvatarRequestPayload) => void,
  {
    loading: boolean;
    error?: HTTPError;
    success: boolean;
  },
]

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
  getUser(blockchain: Blockchain, address: Address, options?: QueryOptions): GetUserResponse;
  getUserIds(): Promise<GetUserIdsResponse>;
  getUserById(id: number): Promise<User>;
  removeUserAvatar(id: number): RemoveUserAvatarResponse;
  uploadUserAvatar(id: number): UpdateUserAvatarResponse;
  updateUserProfile(id: number): UpdateUserProfileResponse;
}

export { GET_KIRUNALABS_USER_QUERY }

export type {
  UserService,
  GetUserResponse,
  GetUserIdsResponse,
  GetUserByIdResponse,
  CreateUserPayload,
  UpdateUserProfileRequestPayload,
  CreateUserResponse,
  UpdateUserAvatarRequestPayload,
  RemoveUserAvatarResponse,
  UpdateUserAvatarResponse,
  UpdateUserProfileResponse,
};
