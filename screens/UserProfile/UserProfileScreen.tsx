import { Fragment, useEffect } from 'react';
import { User } from '@domain/user';
import { useNear } from '@infrastructure/blockchain/near';
import { UserProfile } from '@ui/viewComponents/UserProfile';

type Props = {
  preloadedUser: User;
};

const UserProfileScreen = ({ preloadedUser }: Props) => {
  // request NFTS owned in NEAR
  const { useGetNftsByOwner } = useNear();
  const [requestNftsByOwner, { data: ownedNfts }] = useGetNftsByOwner();

  useEffect(() => {
    if (preloadedUser && !ownedNfts) {
      const nearWallet = preloadedUser.wallets.find(
        (wallet) => wallet.blockchain === 'NEAR',
      );

      if (nearWallet) {
        requestNftsByOwner(nearWallet.address);
      }
    }
  }, [preloadedUser, ownedNfts, requestNftsByOwner]);

  // handle NFT click
  const handleNftClick = (blockchain: string, id: string): void => {
    window.location.href = `/nfts/${blockchain.toLowerCase()}/${id}`;
  };

  return (
    <Fragment>
      <UserProfile
        avatar={preloadedUser.avatar}
        name={preloadedUser.name}
        createdNfts={preloadedUser.nfts}
        ownedNfts={ownedNfts ?? []}
        onClickNft={handleNftClick}
      />
    </Fragment>
  );
};

export { UserProfileScreen };
