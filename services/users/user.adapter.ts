import { User } from '@domain/user';
import { Blockchain } from '@domain/wallet/wallet';
import { HTTPError, useMutation, useQuery, request as httpRequest } from '@infrastructure/http';
import { Scalars } from '@infrastructure/scalars';
import { UserIdsResponse, UserResponse } from '@interfaces/backend/UserResponse';
import {
  CreateUserPayload,
  CreateUserResponse,
  GetUserIdsResponse,
  GetUserResponse,
  UserService,
} from './user.port';

type Address = Scalars['Address'];

const baseUrl = process.env.NEXT_PUBLIC_KIRUNALABS_API_URL;

class UserAdapter implements UserService {
  createUser(payload: CreateUserPayload): CreateUserResponse {
    const uri = `${baseUrl}/users`;
    
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
    const uri = `${baseUrl}/users/${blockchain.toLowerCase()}/${address}`;
    
    const [request, { loading, error, data }] = useQuery<
    UserResponse,
    HTTPError
    >(uri);
    
    return [
      request,
      { loading, error, data: data ? User.fromData(data) : data },
    ];
  }

  // Not using useQuery here because it's called on the server side (no hooks)
  async getUserIds(): Promise<GetUserIdsResponse> {
    const uri = `${baseUrl}/users/ids`;

    try {
    const response = await httpRequest(uri, { method: 'GET' }) as UserIdsResponse

    return response.ids;
    }
    catch(error) {
      console.log(error)
      throw new Error('User.adapter.getUserIds: request failed');
     }
  }

  // Not using useQuery here because it's called on the server side (no hooks)
  async getUserById(id: number): Promise<User> {
    const uri = `${baseUrl}/users/${id}`;

    try {
      const response = await httpRequest(uri, { method: 'GET' }) as UserResponse
      const user = User.fromData(response);
      
      return user;
    }
    catch(error) {
      console.log(error)
      throw new Error('User.adapter.getUserById: request failed');
     }
  } 
}

export { UserAdapter };
