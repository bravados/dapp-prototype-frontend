import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Royalty } from '@domain/royalty';
import {
  BOATLOAD_OF_GAS,
  BrowserLocalStorageKeyStore,
  getConfig,
  Near,
  nearAPI,
  uuidv4,
  WalletConnection,
} from './config';
import {
  calculateFees,
  formatAmount,
  parseAmount,
  parseRoyalties,
} from './helper';

type WalletContext = {
  isSignedIn: () => boolean;
  signIn: (successUrl?: string) => void;
  signOut: () => void;
  address?: string;
};

type BlockchainContext = WalletContext & {
  gasFees?: string;
  formatAmount: (amount: string) => string;
  mint: (params: MintParams) => any;
  parseAmount: (formattedAmount: string) => string;
};

type MintParams = {
  title: string;
  description: string;
  nftStorageId: string;
  royalties: Royalty[];
  callbackUrl?: string;
};

const NearContext = createContext<BlockchainContext | null>(null);

const useNear = (): BlockchainContext => {
  const context = useContext(NearContext);

  if (!context) {
    throw new Error('Ensure you have a NearContext provider');
  }

  return context;
};

const NearProvider = ({ children }: { children: React.ReactNode }) => {
  const [keyStore, setKeyStore] = useState<BrowserLocalStorageKeyStore>();

  const [near, setNear] = useState<Near>();

  const [walletConnection, setWalletConnection] = useState<WalletConnection>();

  const [gasFees, setGasFees] = useState<string>();

  const [address, setAddress] = useState<string>();

  const [nftContract, setNftContract] = useState<any>();

  const [marketContract, setMarketContract] = useState<any>();

  useEffect(() => {
    if (!keyStore) {
      const newKeyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore(
        window.localStorage,
        'kirunalabs-near-wallet',
      );
      setKeyStore(newKeyStore);
    }
  }, [keyStore]);

  useEffect(() => {
    if (keyStore) {
      const connectToNear = async () => {
        const nearConnection = await nearAPI.connect({
          keyStore,
          ...getConfig('testnet'),
        });
        setNear(nearConnection);
      };
      connectToNear();
    }
  }, [keyStore]);

  useEffect(() => {
    if (near) {
      setWalletConnection(new nearAPI.WalletConnection(near, 'kirunalabs'));
    }
  }, [near]);

  useEffect(() => {
    if (walletConnection) {
      // address
      const address = walletConnection.getAccountId();
      setAddress(address);

      // gas fees
      const setFees = async () => {
        const fees = await calculateFees(walletConnection);
        setGasFees(fees);
      };
      setFees();

      // contracts
      const nftContract = new nearAPI.Contract(
        walletConnection.account(),
        getConfig().nftContractName,
        {
          viewMethods: ['nft_token', 'nft_tokens'],
          changeMethods: ['new_default_meta', 'nft_mint', 'nft_approve'],
        },
      );
      setNftContract(nftContract);

      const marketContract = new nearAPI.Contract(
        walletConnection.account(),
        getConfig().nftContractName,
        {
          viewMethods: [
            'get_sale',
            'get_sales_by_nft_contract_id',
            'get_supply_by_nft_contract_id',
          ],
          changeMethods: ['offer'],
        },
      );
      setMarketContract(marketContract);
    }
  }, [walletConnection]);

  const isSignedIn = useCallback(() => {
    return walletConnection?.isSignedIn() ?? false;
  }, [walletConnection]);

  const mint = useCallback(
    ({
      title,
      description,
      nftStorageId,
      royalties,
      callbackUrl,
    }: MintParams) => {
      if (!nftContract) {
        throw new Error('NFT contract is not initialized');
      }
      if (!marketContract) {
        throw new Error('Market contract is not initialized');
      }

      const tokenId = uuidv4();

      const mintParams = {
        args: {
          token_id: tokenId,
          receiver_id: address,
          metadata: {
            title,
            description,
            media: nftStorageId,
            copies: 1,
          },
          perpetual_royalties: parseRoyalties(royalties),
        },
        gas: BOATLOAD_OF_GAS,
        amount: gasFees,
        callbackUrl,
        meta: tokenId,
      };

      console.dir(mintParams, { depth: null });

      return nftContract.nft_mint(mintParams);
    },
    [nftContract, marketContract, address, gasFees],
  );

  const signIn = useCallback(
    (successUrl?: string) => {
      walletConnection?.requestSignIn({ successUrl });
    },
    [walletConnection],
  );

  const signOut = useCallback(() => {
    walletConnection?.signOut();
  }, [walletConnection]);

  const memoizedContext = useMemo<BlockchainContext>(
    () => ({
      address,
      formatAmount,
      gasFees,
      isSignedIn,
      mint,
      signIn,
      signOut,
      parseAmount,
    }),
    [address, gasFees, isSignedIn, mint, signIn, signOut],
  );

  return (
    <NearContext.Provider value={memoizedContext}>
      {children}
    </NearContext.Provider>
  );
};

export { useNear, NearProvider };
