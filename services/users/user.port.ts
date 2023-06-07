import { User } from '@domain/user';
import { Blockchain } from '@domain/wallet/wallet';
import { HTTPError, QueryOptions, QueryResponse } from '@infrastructure/http';
import { Scalars } from '@infrastructure/scalars';

const GET_KIRUNALABS_USER_QUERY = 'kirunalabs_user_query';

type Address = Scalars['Address'];

type GetUserPayload = {
  blockchain: Blockchain;
  address: Address;
};

type GetUserResponse = [
  (payload: GetUserPayload) => void,
  {
    loading: boolean;
    error?: HTTPError;
    data?: User;
  },
];

type GetUserIdsResponse = number[];

type GetUserByIdResponse = User | null;

type CreateUserPayload = {
  blockchain: Blockchain;
  address: Address;
};

type CreateUserResponse = QueryResponse<User>;

type RemoveUserAvatarRequestPayload = {
  id: number;
};

type RemoveUserAvatarResponse = [
  (payload: RemoveUserAvatarRequestPayload) => void,
  {
    loading: boolean;
    error?: HTTPError;
    success: boolean;
  },
];

type UpdateUserAvatarRequestPayload = {
  id: number;
  file: File;
};

type UpdateUserAvatarResponse = [
  (payload: UpdateUserAvatarRequestPayload) => void,
  {
    loading: boolean;
    error?: HTTPError;
    success: boolean;
  },
];

type UpdateUserProfileRequestPayload = {
  id: number;
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
];

interface UserService {
  createUser(payload: CreateUserPayload): CreateUserResponse;
  getUser(options?: QueryOptions): GetUserResponse;
  getUserIds(): Promise<GetUserIdsResponse>;
  getUserById(id: number): Promise<User>;
  removeUserAvatar(): RemoveUserAvatarResponse;
  uploadUserAvatar(): UpdateUserAvatarResponse;
  updateUserProfile(): UpdateUserProfileResponse;
}

export { GET_KIRUNALABS_USER_QUERY };

export type {
  UserService,
  GetUserPayload,
  GetUserResponse,
  GetUserIdsResponse,
  GetUserByIdResponse,
  CreateUserPayload,
  UpdateUserProfileRequestPayload,
  CreateUserResponse,
  RemoveUserAvatarRequestPayload,
  UpdateUserAvatarRequestPayload,
  RemoveUserAvatarResponse,
  UpdateUserAvatarResponse,
  UpdateUserProfileResponse,
};
