import { WalletConnection } from 'near-api-js';
import {
  formatNearAmount,
  parseNearAmount,
} from 'near-api-js/lib/utils/format';
import * as Big from 'big-ts';
import { Royalty } from '@domain/royalty';
import { MAX_GAS_UNITS } from './config';

const calculateFees = async (walletConnection: WalletConnection) => {
  const maxAttachableGasUnits = MAX_GAS_UNITS;

  const lastBlockGasPriceResponse =
    await walletConnection._near.connection.provider.gasPrice(null as any);

  const lastBlockGasPrice = Big.parse(lastBlockGasPriceResponse.gas_price);

  const gasFees = Big.mult(maxAttachableGasUnits)(lastBlockGasPrice);

  return Big.toFixed({ rm: Big.RoundingMode.Up, dp: 0 })(gasFees);
};

const formatAmountFixDigits = (amount: string) => formatNearAmount(amount, 4);

const formatAmount = (amount: string) => formatAmountFixDigits(amount);

const parseAmount = (formattedAmount: string) =>
  parseNearAmount(formattedAmount) as string;

const parseRoyalties = (royalties: Royalty[]) => {
  return royalties.reduce((acc, royalty) => {
    let percentage = royalty.percent / 100.0; // convert it to something between [0-1] (i.e. 0.2)
    percentage *= 10000; // In Near, 100% is 10000

    return {
      ...acc,
      [royalty.wallet.address]: percentage,
    };
  }, {});
};

export { calculateFees, formatAmount, parseAmount, parseRoyalties };
