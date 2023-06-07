import { Fragment } from 'react';
import { CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@stitches/react';
import { UserInfo } from '../UserInfo';
import { ActionButton } from '@ui/core';
import { MakeOffer } from '../MakeOffer';

const MediaContainer = styled('div', {
  width: '50vw',
  margin: 'auto',
});

type Props = {
  tokenId: string;
  title: string;
  description: string;
  media: string;
  currencyName: string;
  creator: {
    id: number;
    name: string;
    avatar: string;
  };
  owner: {
    id?: number;
    name: string;
    avatar?: string;
  };
  accountBalance: string;
  price: string;
  isBuyButtonVisible: boolean;
  isGoToPublishButtonVisible: boolean;
  isMakeOfferDialogOpen: boolean;
  offerAmount: string;
  offerAmountWithFees: string;
  onAmountChange: (amount: string) => void;
  onBuy: (amount: string) => void;
  onOpenBuyDialog: () => void;
  onCloseBuyDialog: () => void;
};

const NftProfile = ({
  tokenId,
  title,
  description,
  media,
  creator,
  owner,
  accountBalance,
  currencyName,
  price,
  isBuyButtonVisible,
  isGoToPublishButtonVisible,
  isMakeOfferDialogOpen,
  offerAmount,
  offerAmountWithFees,
  onAmountChange,
  onBuy,
  onOpenBuyDialog,
  onCloseBuyDialog,
}: Props) => {
  return (
    <Fragment>
      <Grid item xs={12}>
        <MediaContainer>
          <CardMedia
            component="img"
            src={media}
            sx={{ objectFit: 'contain' }}
          />
        </MediaContainer>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <Typography variant="h1" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h3" gutterBottom>
              {description}
            </Typography>
          </div>
          {isBuyButtonVisible && (
            <div>
              <ActionButton onClick={onOpenBuyDialog}>Make offer</ActionButton>
            </div>
          )}
          {isGoToPublishButtonVisible && (
            <div>
              <ActionButton
                href={`/publish/near?tokenId=${tokenId}`}
                isSelected={false}
                onClick={() => {}}
              >
                Go to Publish page
              </ActionButton>
            </div>
          )}
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <UserInfo
              title={'Artist'}
              id={creator.id}
              name={creator.name}
              avatar={creator.avatar}
            />
          </div>
          <div>
            <UserInfo
              title={'Owner'}
              id={owner.id}
              name={owner.name}
              avatar={owner.avatar}
            />
          </div>
        </Grid>
      </Grid>

      <MakeOffer
        isOpen={isMakeOfferDialogOpen}
        title={title}
        media={media}
        price={price}
        currencyName={currencyName}
        amount={offerAmount}
        amountWithFees={offerAmountWithFees}
        balance={accountBalance}
        onAmountChange={onAmountChange}
        onBuy={onBuy}
        onClose={onCloseBuyDialog}
      />
    </Fragment>
  );
};

export { NftProfile };
