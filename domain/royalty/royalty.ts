import { transformAndValidateSync } from 'class-transformer-validator';
import { IsDefined, IsInt } from 'class-validator';
import { Wallet } from '@domain/wallet';
import { Expose, Type } from '@infrastructure/domain';
import { Scalars } from '@infrastructure/scalars';
import { UserRoyaltyResponse } from '@interfaces/backend/UserResponse';

class Royalty implements UserRoyaltyResponse {
  static fromData(data: UserRoyaltyResponse): Royalty {
    return transformAndValidateSync(Royalty, data);
  }

  userId: Scalars['ID'];

  walletId: Scalars['ID'];

  @Expose()
  @IsDefined()
  @Type(() => Wallet)
  wallet: Wallet;

  @Expose()
  @IsInt()
  percent: Scalars['Int'];
}

export { Royalty };
