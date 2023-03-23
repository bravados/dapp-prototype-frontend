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

const NFT_CONTRACT_NAME = process.env.NEXT_PUBLIC_NFT_CONTRACT_NAME || '';
const MARKET_CONTRACT_NAME = process.env.NEXT_PUBLIC_MARKET_CONTRACT_NAME || '';

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
};
