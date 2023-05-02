import { UserAdapter } from '@services/users/user.adapter';
import { UserService } from '@services/users/user.port';

class UploadUserAvatarUseCase {
  private userService: UserService;

  constructor() {
    this.userService = new UserAdapter();
  }

  uploadUserAvatar(id: number) {
    return this.userService.uploadUserAvatar(id);
  }
}

function useUploadUserAvatar(id: number) {
  return new UploadUserAvatarUseCase().uploadUserAvatar(id);
}

export { useUploadUserAvatar };
