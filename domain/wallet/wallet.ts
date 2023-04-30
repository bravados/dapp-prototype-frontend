import { IsDefined, IsNotEmpty } from 'class-validator';
import { transformAndValidateSync } from 'class-transformer-validator';
import { Expose, instanceToPlain } from '@infrastructure/domain';
import { Scalars } from '@infrastructure/scalars';
import { UserWalletResponse } from '@interfaces/backend/UserResponse';
import { IsValidBlockchain } from './blockchain.validator';

type Blockchain = 'NEAR';

class Wallet implements UserWalletResponse {
  static fromData(data: UserWalletResponse): Wallet {
    return transformAndValidateSync(Wallet, data, {
      transformer: { strategy: 'excludeAll' },
    });
  }

  static toPlain(wallet: Wallet) {
    return instanceToPlain(wallet);
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
