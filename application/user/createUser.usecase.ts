import { useEffect } from 'react';
import { useLocalStorageUser } from '@infrastructure/localStorage';
import { UserAdapter } from '@services/user.adapter';
import { CreateUserPayload, UserService } from '@services/user.port';

class CreateUserUseCase {
  private userService: UserService;

  constructor() {
    this.userService = new UserAdapter();
  }

  createUser(payload: CreateUserPayload) {
    return this.userService.createUser(payload);
  }
}

function useCreateUser({ blockchain, address }: CreateUserPayload) {
  const [user, setUser] = useLocalStorageUser();

  const [request, { loading, error, data }] =
    new CreateUserUseCase().createUser({ blockchain, address });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return {
    user,
    loading,
    error,
  };
}

export { useCreateUser };
