import { UserAdapter } from '@services/users/user.adapter';
import { CreateUserPayload, UserService } from '@services/users/user.port';

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
  const [request, { loading, error, data }] =
    new CreateUserUseCase().createUser({ blockchain, address });

  return {
    user: data,
    request,
    loading,
    error,
  };
}

export { useCreateUser };
