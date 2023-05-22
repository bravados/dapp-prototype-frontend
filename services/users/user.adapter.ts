import { User } from '@domain/user';
import { HTTPError, useMutation, useQuery, request as httpRequest, QueryOptions } from '@infrastructure/http';
import { Scalars } from '@infrastructure/scalars';
import { UploadAvatarResponse, UserIdsResponse, UserResponse } from '@interfaces/backend/UserResponse';
import {
  CreateUserPayload,
  CreateUserResponse,
  GetUserIdsResponse,
  GetUserPayload,
  GetUserResponse,
  RemoveUserAvatarResponse,
  UpdateUserAvatarRequestPayload,
  UpdateUserAvatarResponse,
  UpdateUserProfileRequestPayload,
  UpdateUserProfileResponse,
  UserService,
} from './user.port';

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
  
  getUser(options?: QueryOptions): GetUserResponse {
    const uri = `${baseUrl}/users`;
    
    const [request, { loading, error, data }] = useQuery<
    UserResponse,
    HTTPError
    >(uri, options);

    const requestWrapper = ({blockchain, address}: GetUserPayload) => {
      const path = `/${blockchain.toLowerCase()}/${address}`
      request({ path });
    }
    
    return [
      requestWrapper,
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

  removeUserAvatar(id: number): RemoveUserAvatarResponse {
    const uri = `${baseUrl}/users/${id}/remove-avatar`;

    const [request, { loading, error, status }] = useMutation(uri, {
      method: 'POST',
    });

    return [
      request,
      {
        loading,
        error,
        success: status === 'success',
      },
    ]
  }

  uploadUserAvatar(id: number): UpdateUserAvatarResponse {
    const uri = `${baseUrl}/users/${id}/upload-avatar`;

    const [request, { loading, error, status }] = useMutation<UploadAvatarResponse, UpdateUserAvatarRequestPayload>(uri, {
      method: 'POST',
      contentType: 'multipart/form-data',
    });

    const requestWrapper = ({file}: UpdateUserAvatarRequestPayload) => {
      const formData = new FormData();
      formData.append('file', file);

      request({ data: formData });
    }

    return [
      requestWrapper,
      {
        loading,
        error,
        success: status === 'success',
      }
    ];
  }

  updateUserProfile(id: number): UpdateUserProfileResponse {
    const uri = `${baseUrl}/users/${id}/update-profile`;

    const [request, { loading, error, data }] = useMutation<UserResponse, UpdateUserProfileRequestPayload>(uri, {
      method: 'POST',
    });

    const requestWrapper = ({name, email}: UpdateUserProfileRequestPayload) => {
      request({ data: {name, email} });
    };

    return [
      requestWrapper,
      {
        loading,
        error,
        data: data ? User.fromData(data) : data,
      }
    ];
  }
}

export { UserAdapter };
