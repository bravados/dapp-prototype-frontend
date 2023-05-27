import { IsDefined, IsInt, IsOptional } from 'class-validator';
import { transformAndValidateSync } from 'class-transformer-validator';
import { Transform, instanceToPlain } from 'class-transformer';
import { Scalars } from '@infrastructure/scalars';
import { Expose, Type } from '@infrastructure/domain';
import { UserResponse } from '@interfaces/backend/UserResponse';
import { Wallet } from '../wallet/wallet';
import { IsValidUserType } from './userType.validator';
import { Royalty } from '@domain/royalty/royalty';
import { NftBackend } from '@domain/nft/nft';

type UserType = 'INDIVIDUAL' | 'ARTIST' | 'ADMIN';

type Email = Scalars['Email'];

type Avatar = Scalars['String'];

const avatarBaseUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_DOMAIN;

const buildAvatarUrl = (avatar: Avatar) => {
  if(!avatar) return '';
  
  if(avatar.includes(avatarBaseUrl!)) {
    return avatar;
  }
  return `${avatarBaseUrl}/avatars/${avatar}`;
}


class User implements UserResponse {
  static fromData(data: UserResponse): User {
    return transformAndValidateSync(User, data, {
      transformer: { strategy: 'excludeAll' },
    });
  }

  static toPlain(user: User) {
    let plainUser = instanceToPlain(user);
    plainUser.wallets = user.wallets.map((wallet) =>Wallet.toPlain(wallet));
    plainUser.nfts = user.nfts.map((nft) => NftBackend.toPlain(nft));

    return plainUser;
  }

  @Expose()
  @IsInt()
  id: Scalars['ID'];

  @Expose()
  @IsDefined()
  name: Scalars['String'];

  @Expose()
  @IsOptional()
  email: Email;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => buildAvatarUrl(value))
  avatar: Avatar;

  @Expose()
  @IsValidUserType()
  @IsDefined()
  type: UserType;

  @Expose()
  @IsDefined()
  @Type(() => Wallet)
  wallets: Wallet[];

  @Expose()
  @IsOptional()
  @Type(() => Royalty)
  royalties: Royalty[];

  @Expose()
  @IsOptional()
  @Type(() => NftBackend)
  nfts: NftBackend[];
}

export { User, buildAvatarUrl };
export type { UserType };
