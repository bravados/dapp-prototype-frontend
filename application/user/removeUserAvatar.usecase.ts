import { UserAdapter } from '@services/users/user.adapter';
import { UserService } from '@services/users/user.port';

class RemoveUserAvatarUseCase {
  private userService: UserService;

  constructor() {
    this.userService = new UserAdapter();
  }

  removeUserAvatar() {
    return this.userService.removeUserAvatar();
  }
}

function useRemoveUserAvatar() {
  return new RemoveUserAvatarUseCase().removeUserAvatar();
}

export { useRemoveUserAvatar };
