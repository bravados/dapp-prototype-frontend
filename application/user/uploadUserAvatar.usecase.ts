import { UserAdapter } from '@services/users/user.adapter';
import { UserService } from '@services/users/user.port';

class UploadUserAvatarUseCase {
  private userService: UserService;

  constructor() {
    this.userService = new UserAdapter();
  }

  uploadUserAvatar() {
    return this.userService.uploadUserAvatar();
  }
}

function useUploadUserAvatar() {
  return new UploadUserAvatarUseCase().uploadUserAvatar();
}

export { useUploadUserAvatar };
