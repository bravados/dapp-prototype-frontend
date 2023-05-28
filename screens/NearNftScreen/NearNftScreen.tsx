import { useEffect, useState } from 'react';
import * as Big from 'big-ts';
import { NftBackend } from '@domain/nft/nft';
import { useNear } from '@infrastructure/blockchain/near';
import { useGetUser } from '@application/user';
import { NftProfile } from '@ui/viewComponents/NftProfile';
import { useKirunalabs } from '@screens/KirunalabsContext';

const kirunalabsUrl = process.env.NEXT_PUBLIC_KIRUNALABS_FALLBACK_URL;

const fallbackUrl = `${kirunalabsUrl}/nfts/near`;

type NftOwner = {
  id?: number;
  name: string;
  avatar?: string;
};

const defaultOwner: NftOwner = {
  name: 'Unknown',
};

type Props = {
  preloadedNft: NftBackend;
};

const NearNftScreen = ({ preloadedNft }: Props) => {
  // get the current owner of the NFT according to the contract
  const [owner, setOwner] = useState<NftOwner>(defaultOwner);
  const { useGetNft } = useNear();
  const [requestGetNft, { error: getNftError, data: nearNft }] = useGetNft();

  useEffect(() => {
    if (preloadedNft && !nearNft && !getNftError)
      requestGetNft(preloadedNft.id);
  }, [preloadedNft, requestGetNft]);

  useEffect(() => {
    if (getNftError) {
      console.error(getNftError);
    }
  }, [getNftError]);

  // get the user profile of the owner (it may not exist in Kiruna)
  const [
    requestOwnerProfile,
    { loading: loadingOwner, error: requestOwnerError, data: ownerProfile },
  ] = useGetUser();

  useEffect(() => {
    if (nearNft && !ownerProfile && !requestOwnerError) {
      requestOwnerProfile({ blockchain: 'NEAR', address: nearNft.owner });
    }
  }, [nearNft]);

  useEffect(() => {
    if (requestOwnerError) {
      console.log(
        `the owner of nft ${nearNft?.id} does not have a profile in Kiruna`,
      );
      setOwner({ name: nearNft!.owner });
    }
  }, [nearNft, requestOwnerError]);

  useEffect(() => {
    if (ownerProfile && !owner?.id) {
      setOwner({
        id: ownerProfile.id,
        name: ownerProfile.name,
        avatar: ownerProfile.avatar,
      });
    }
  }, [ownerProfile, owner]);

  // get the account balance of the user
  const { accountBalance, formatAmount } = useNear();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    if (accountBalance && formatAmount) {
      setBalance(formatAmount(accountBalance));
    }
  }, [accountBalance, formatAmount]);

  // get the price of the NFT (if published on the marketplace)
  const [price, setPrice] = useState<string>();

  const { useGetSale } = useNear();
  const [requestGetSale, { error: getSaleError, data: sale }] = useGetSale();

  useEffect(() => {
    if (preloadedNft) {
      requestGetSale(preloadedNft.id);
    }
  }, [preloadedNft, requestGetSale]);

  useEffect(() => {
    if (sale) {
      setPrice(formatAmount(sale.price));
    }
  }, [sale, formatAmount]);

  // decide what is the button CTA to show (make offer, publish, unpublish)
  const { isSignedIn, buyNft, gasFees, parseAmount } = useNear();
  const { user } = useKirunalabs();

  const [offerAmount, setOfferAmount] = useState<string>('0');
  const [offerAmountWithFees, setOfferAmountWithFees] = useState<string>('0');

  const [isMakeOfferDialogOpen, setIsMakeOfferDialogOpen] =
    useState<boolean>(false);

  const { creator } = preloadedNft;

  const [isBuyButtonVisible, setIsBuyButtonVisible] = useState<boolean>(false);
  const [isGoToPublishButtonVisible, setIsGoToPublishButtonVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (isSignedIn) {
      if (user?.id === owner.id) {
        setIsBuyButtonVisible(false);
        setIsGoToPublishButtonVisible(true);
      } else {
        setIsBuyButtonVisible(!!sale);
        setIsGoToPublishButtonVisible(false);
      }
    }
  }, [isSignedIn, sale, user, creator, owner]);

  const handleAmountChange = (amount: string) => {
    const parsedAmount = parseAmount(amount || '0');

    const amountNumber = Big.parse(parsedAmount);
    const gasFeesNumber = Big.parse(gasFees || '0');
    const totalAmountNumber = Big.add(amountNumber)(gasFeesNumber);

    const totalAmountFixed = Big.toFixed({ rm: Big.RoundingMode.Up, dp: 0 })(
      totalAmountNumber,
    );
    const totalAmountFormatted = formatAmount(totalAmountFixed);

    setOfferAmount(amount);
    setOfferAmountWithFees(totalAmountFormatted);
  };

  const handleBuy = (amount: string) => {
    buyNft({
      tokenId: preloadedNft.id,
      price: amount,
      callbackUrl: `${fallbackUrl}/${preloadedNft.id}`,
    });
  };

  return (
    <NftProfile
      tokenId={preloadedNft.id}
      title={preloadedNft.title}
      description={preloadedNft.description}
      media={preloadedNft.media}
      creator={preloadedNft.creator}
      owner={owner!}
      accountBalance={balance || 'loading...'}
      currencyName="Near"
      price={price || '0'}
      isMakeOfferDialogOpen={isMakeOfferDialogOpen}
      offerAmount={offerAmount}
      offerAmountWithFees={offerAmountWithFees}
      isBuyButtonVisible={isBuyButtonVisible}
      isGoToPublishButtonVisible={isGoToPublishButtonVisible}
      onBuy={handleBuy}
      onAmountChange={handleAmountChange}
      onOpenBuyDialog={() => {
        setIsMakeOfferDialogOpen(true);
      }}
      onCloseBuyDialog={() => {
        setIsMakeOfferDialogOpen(false);
      }}
    />
  );
};

export { NearNftScreen };
