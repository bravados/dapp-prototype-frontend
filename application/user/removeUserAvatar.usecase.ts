import { UserAdapter } from '@services/users/user.adapter';
import { UserService } from '@services/users/user.port';

class RemoveUserAvatarUseCase {
  private userService: UserService;

  constructor() {
    this.userService = new UserAdapter();
  }

  removeUserAvatar(id: number) {
    return this.userService.removeUserAvatar(id);
  }
}

function useRemoveUserAvatar(id: number) {
  return new RemoveUserAvatarUseCase().removeUserAvatar(id);
}

export { useRemoveUserAvatar };
