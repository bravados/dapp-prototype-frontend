import { Scalars } from '@infrastructure/scalars';
import { Wallet } from './wallet';

type UserType = 'INDIVIDUAL' | 'ARTIST' | 'ADMIN';

class User {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['Email'];
  avatar: Scalars['URL'];
  type: UserType;
  wallets: Wallet[];
}

export { User };
