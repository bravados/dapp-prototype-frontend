import { alice } from '@domain/user';
import { Blockchain } from '@domain/wallet';

export const defaultNft = {
  id: 'uuid-1234-5678-9101',
  title: 'Default NFT',
  description: 'This is a placeholder NFT.',
  media: 'https://via.placeholder.com/300x300',
  blockchain: 'NEAR' as Blockchain,
  creator: alice,
};
