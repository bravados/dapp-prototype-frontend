import { GET_KIRUNALABS_USER_QUERY, UserService } from '@services/users/user.port';
import { UserAdapter } from '@services/users/user.adapter';
import { QueryOptions } from '@infrastructure/http';

class GetUserUseCase {
  private userService: UserService;

  constructor() {
    this.userService = new UserAdapter();
  }

  getUser(options?: QueryOptions) {
    return this.userService.getUser(options);
  }
}

function useGetKirunalabsUser() {
  return new GetUserUseCase().getUser(
    { key: GET_KIRUNALABS_USER_QUERY }
  );
}

function useGetUser() {
  return new GetUserUseCase().getUser();
}

export { useGetKirunalabsUser, useGetUser };
