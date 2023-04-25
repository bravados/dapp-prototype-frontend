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
  MINT_DEPOSIT,
  PUBLISH_DEPOSIT,
  MIN_ATTACHABLE_DEPOSIT,
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
import { Nft, NftNear } from '@domain/nft/nft';

type WalletContext = {
  isSignedIn: boolean;
  signIn: (successUrl?: string) => void;
  signOut: () => void;
  address?: string;
};

type BlockchainContext = WalletContext & {
  gasFees?: string;
  formatAmount: (amount: string) => string;
  mint: (params: MintParams) => any;
  parseAmount: (formattedAmount: string) => string;
  publishNft: (params: PublishParams) => void;
  unpublishNft: (params: UnpublishParams) => void;
  useGetNft: () => [
    (tokenId: string) => void,
    { error?: { status: number }; data?: Nft },
  ];
  useGetNftsByOwner: () => [(address: string) => void, { data?: Nft[] }];
  useGetSale: () => [(nftId: string) => void, { data: any }];
};

type MintParams = {
  title: string;
  description: string;
  nftStorageId: string;
  royalties: Royalty[];
  callbackUrl?: string;
};

type PublishParams = {
  tokenId: string;
  price: string;
  callbackUrl?: string;
};

type UnpublishParams = {
  tokenId: string;
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

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

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
          viewMethods: ['nft_token', 'nft_tokens', 'nft_tokens_for_owner'],
          changeMethods: [
            'new_default_meta',
            'nft_mint',
            'nft_approve',
            'nft_revoke',
          ],
        },
      );
      setNftContract(nftContract);

      const marketContract = new nearAPI.Contract(
        walletConnection.account(),
        getConfig().marketContractName,
        {
          viewMethods: [
            'get_sale',
            'get_sales_by_nft_contract_id',
            'get_supply_by_nft_contract_id',
          ],
          changeMethods: ['offer', 'remove_sale'],
        },
      );
      setMarketContract(marketContract);
    }
  }, [walletConnection]);

  useEffect(() => {
    setIsSignedIn(walletConnection?.isSignedIn() ?? false);
  }, [walletConnection]);

  const publishNft = ({ tokenId, price, callbackUrl }: PublishParams) => {
    const parsedPrice = parseAmount(price);

    nftContract.nft_approve({
      args: {
        token_id: tokenId,
        account_id: getConfig().marketContractName,
        msg: JSON.stringify({ sale_conditions: parsedPrice }),
      },
      gas: BOATLOAD_OF_GAS,
      amount: PUBLISH_DEPOSIT,
      callbackUrl: callbackUrl,
    });
  };

  const unpublishNft = ({ tokenId, callbackUrl }: UnpublishParams) => {
    marketContract.remove_sale({
      args: {
        nft_contract_id: getConfig().nftContractName,
        token_id: tokenId,
      },
      gas: BOATLOAD_OF_GAS,
      amount: MIN_ATTACHABLE_DEPOSIT,
      callbackUrl: callbackUrl,
    });
  };

  const useGetNft = (): [
    (tokenId: string) => void,
    { error?: { status: number }; data?: Nft },
  ] => {
    const [nft, setNft] = useState<Nft>();
    const [error, setError] = useState<any>();

    const requestGetNft = (tokenId: string) => {
      nftContract
        .nft_token({
          token_id: tokenId,
        })
        .then((nft: any) => {
          const deserializedNft = nft ? NftNear.fromData(nft) : nft;
          setNft(deserializedNft);
        });
    };

    useEffect(() => {
      if (nft === null) {
        setError({ status: 404 });
      }
    }, [nft]);

    return [requestGetNft, { error, data: nft }];
  };

  const useGetNftsByOwner = (): [
    (address: string) => void,
    { data?: Nft[] },
  ] => {
    const [nfts, setNfts] = useState<Nft[]>();

    const requestGetNftsByOwner = (address: string) => {
      nftContract
        .nft_tokens_for_owner({
          account_id: address,
        })
        .then((nfts: any) => {
          const deserializedNfts = nfts.map((nft: any) =>
            NftNear.fromData(nft),
          );
          setNfts(deserializedNfts);
        });
    };

    return [requestGetNftsByOwner, { data: nfts }];
  };

  const useGetSale = (): [(tokenId: string) => void, { data: any }] => {
    const [sale, setSale] = useState<boolean>(false);

    const requestIsPublished = (tokenId: string) => {
      marketContract
        .get_sale({
          nft_contract_token: `${getConfig().nftContractName}.${tokenId}`,
        })
        .then((sale: any) => {
          setSale(sale);
        });
    };

    return [requestIsPublished, { data: sale }];
  };

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
        amount: MINT_DEPOSIT,
        callbackUrl,
        meta: tokenId,
      };

      return nftContract.nft_mint(mintParams);
    },
    [nftContract, marketContract, address],
  );

  const signIn = useCallback(
    (successUrl?: string) => {
      walletConnection?.requestSignIn({ successUrl });
    },
    [walletConnection],
  );

  const signOut = useCallback(() => {
    walletConnection?.signOut();
    setIsSignedIn(false);
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
      publishNft,
      unpublishNft,
      useGetNft,
      useGetNftsByOwner,
      useGetSale,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, gasFees, isSignedIn, mint, signIn, signOut],
  );

  return (
    <NearContext.Provider value={memoizedContext}>
      {children}
    </NearContext.Provider>
  );
};

export { useNear, NearProvider };
