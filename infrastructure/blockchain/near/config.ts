import * as nearAPI from 'near-api-js';
import { Near, WalletConnection } from 'near-api-js';
import {
  KeyStore,
  BrowserLocalStorageKeyStore,
} from 'near-api-js/lib/key_stores';
import {
  formatNearAmount,
  parseNearAmount,
} from 'near-api-js/lib/utils/format';
import { v4 as uuidv4 } from 'uuid';
import * as Big from 'big-ts';

const NFT_CONTRACT_NAME = process.env.NEXT_PUBLIC_NFT_CONTRACT_NAME || '';
const MARKET_CONTRACT_NAME = process.env.NEXT_PUBLIC_MARKET_CONTRACT_NAME || '';

const MAX_GAS_UNITS = Big.mult(Big.parse(10 ** 14))(Big.parse(3)); // 300000000000000;

const MINT_DEPOSIT = '50000000000000000000000' // 5 * 10^22 yoctoNEAR

const PUBLISH_DEPOSIT = '5000000000000000000000' // 5 * 10^21 yoctoNEAR

const MIN_ATTACHABLE_DEPOSIT = '1' // 1 yoctoNEAR

const BOATLOAD_OF_GAS = Big.toString(
  Big.mult(Big.parse(10 ** 13))(Big.parse(15)),
); // "150000000000000"

const getConfig = (networkId = 'testnet') => {
  return {
    networkId,
    nodeUrl: `https://rpc.${networkId}.near.org`,
    walletUrl: `https://wallet.${networkId}.near.org`,
    helperUrl: `https://helper.${networkId}.near.org`,
    explorerUrl: `https://explorer.${networkId}.near.org`,
    nftContractName: NFT_CONTRACT_NAME,
    marketContractName: MARKET_CONTRACT_NAME,
  };
};

export {
  nearAPI,
  Near,
  WalletConnection,
  KeyStore,
  BrowserLocalStorageKeyStore,
  formatNearAmount,
  parseNearAmount,
  uuidv4,
  getConfig,
  MAX_GAS_UNITS,
  MINT_DEPOSIT,
  PUBLISH_DEPOSIT,
  MIN_ATTACHABLE_DEPOSIT,
  BOATLOAD_OF_GAS,
};
