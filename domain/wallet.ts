import { Scalars } from '@infrastructure/scalars';

type Blockchain = 'NEAR';

class Wallet {
  id: Scalars['ID'];
  blockchain: Blockchain;
  address: Scalars['Address'];
}

export { Wallet };
