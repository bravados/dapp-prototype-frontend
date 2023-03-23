import { IsDefined, IsInt, IsOptional } from 'class-validator';
import { transformAndValidateSync } from 'class-transformer-validator';
import { Scalars } from '@infrastructure/scalars';
import { Expose, Type } from '@infrastructure/domain';
import { UserResponse } from '@interfaces/GetUserResponse';
import { Wallet } from '../wallet/wallet';
import { IsValidUserType } from './userType.validator';

type UserType = 'INDIVIDUAL' | 'ARTIST' | 'ADMIN';

type Email = Scalars['Email'];

type Avatar = Scalars['URL'];

class User {
  static fromData(data: UserResponse): User {
    return transformAndValidateSync(User, data);
  }

  @Expose()
  @IsInt()
  id: Scalars['ID'];

  @Expose()
  @IsDefined()
  name: Scalars['String'];

  @Expose()
  @IsOptional()
  email: Maybe<Email>;

  @Expose()
  @IsOptional()
  avatar: Maybe<Avatar>;

  @Expose()
  @IsValidUserType()
  @IsDefined()
  type: UserType;

  @Expose()
  @IsDefined()
  @Type(() => Wallet)
  wallets: Wallet[];
}

export { User };
export type { UserType };
