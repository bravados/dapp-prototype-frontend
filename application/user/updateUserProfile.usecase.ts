import { UserAdapter } from '@services/users/user.adapter';
import { UserService } from '@services/users/user.port';

class UpdateUserProfileUseCase {
  private userService: UserService;

  constructor() {
    this.userService = new UserAdapter();
  }

  updateUserProfile() {
    return this.userService.updateUserProfile();
  }
}

function useUpdateUserProfile() {
  return new UpdateUserProfileUseCase().updateUserProfile();
}

export { useUpdateUserProfile };
