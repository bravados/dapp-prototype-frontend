import { IsDefined, IsNotEmpty } from 'class-validator';
import { transformAndValidateSync } from 'class-transformer-validator';
import { Expose } from '@infrastructure/domain';
import { Scalars } from '@infrastructure/scalars';
import { UserWalletResponse } from '@interfaces/GetUserResponse';
import { IsValidBlockchain } from './blockchain.validator';

type Blockchain = 'NEAR';

class Wallet implements UserWalletResponse {
  static fromData(data: UserWalletResponse): Wallet {
    return transformAndValidateSync(Wallet, data);
  }

  id: Scalars['ID'];

  @Expose()
  @IsValidBlockchain()
  blockchain: Blockchain;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  address: Scalars['Address'];

  userId: number;
}

export { Wallet };
export type { Blockchain };
