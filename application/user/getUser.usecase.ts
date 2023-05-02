import { GET_KIRUNALABS_USER_QUERY, UserService } from '@services/users/user.port';
import { UserAdapter } from '@services/users/user.adapter';
import { Blockchain } from '@domain/wallet';
import { Scalars } from '@infrastructure/scalars';
import { QueryOptions } from '@infrastructure/http';

type Address = Scalars['Address'];

class GetUserUseCase {
  private userService: UserService;

  constructor() {
    this.userService = new UserAdapter();
  }

  getUser(blockchain: Blockchain, address: Address, options?: QueryOptions) {
    return this.userService.getUser(blockchain, address, options);
  }
}

function useGetUser(blockchain: Blockchain, address: Address) {
  const [request, { loading, error, data }] = new GetUserUseCase().getUser(
    blockchain,
    address,
    { key: GET_KIRUNALABS_USER_QUERY }
  );

  return {
    user: data,
    request,
    loading,
    error,
  };
}

export { useGetUser };
