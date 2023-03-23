import { User } from '@domain/user';
import { Blockchain } from '@domain/wallet/wallet';
import { HTTPError, useMutation, useQuery } from '@infrastructure/http';
import { Scalars } from '@infrastructure/scalars';
import { UserResponse } from '@interfaces/GetUserResponse';
import {
  CreateUserPayload,
  CreateUserResponse,
  GetUserResponse,
  UserService,
} from './user.port';

type Address = Scalars['Address'];

class UserAdapter implements UserService {
  createUser(payload: CreateUserPayload): CreateUserResponse {
    const uri = `/users`;

    const [request, { loading, error, data }] = useMutation<UserResponse>(uri, {
      method: 'POST',
    });

    const requestWrapper = () => {
      request({ data: payload });
    };

    return [
      requestWrapper,
      {
        loading,
        error,
        data: data ? User.fromData(data) : data,
      },
    ];
  }

  getUser(blockchain: Blockchain, address: Address): GetUserResponse {
    const uri = `/users/${blockchain}/${address}`;

    const [request, { loading, error, data }] = useQuery<
      UserResponse,
      HTTPError
    >(uri);

    return [
      request,
      { loading, error, data: data ? User.fromData(data) : data },
    ];
  }
}

export { UserAdapter };
