import { UserAdapter } from '@services/users/user.adapter';
import { UserService } from '@services/users/user.port';

class UpdateUserProfileUseCase {
  private userService: UserService;

  constructor() {
    this.userService = new UserAdapter();
  }

  updateUserProfile(id: number) {
    return this.userService.updateUserProfile(id);
  }
}

function useUpdateUserProfile(id: number) {
  return new UpdateUserProfileUseCase().updateUserProfile(id);
}

export { useUpdateUserProfile };
