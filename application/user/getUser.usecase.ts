import { UserService } from '@services/users/user.port';
import { UserAdapter } from '@services/users/user.adapter';
import { Blockchain } from '@domain/wallet';
import { Scalars } from '@infrastructure/scalars';

type Address = Scalars['Address'];

class GetUserUseCase {
  private userService: UserService;

  constructor() {
    this.userService = new UserAdapter();
  }

  getUser(blockchain: Blockchain, address: Address) {
    return this.userService.getUser(blockchain, address);
  }
}

function useGetUser(blockchain: Blockchain, address: Address) {
  const [request, { loading, error, data }] = new GetUserUseCase().getUser(
    blockchain,
    address,
  );

  return {
    user: data,
    request,
    loading,
    error,
  };
}

export { useGetUser };
