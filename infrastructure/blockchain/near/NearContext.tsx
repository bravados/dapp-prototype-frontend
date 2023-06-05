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
import { NftNear } from '@domain/nft/nft';

type WalletContext = {
  isSignedIn: boolean;
  signIn: (successUrl?: string) => void;
  signOut: () => void;
  accountBalance?: string;
  address?: string;
};

type BlockchainContext = WalletContext & {
  buyNft: (params: BuyParams) => void;
  gasFees?: string;
  formatAmount: (amount: string) => string;
  mint: (params: MintParams) => any;
  parseAmount: (formattedAmount: string) => string;
  publishNft: (params: PublishParams) => void;
  storageDeposit: (params: StorageDepositParams) => void;
  storageWithdraw: (params: StorageWithdrawParams) => void;
  unpublishNft: (params: UnpublishParams) => void;
  useGetNft: () => [
    (tokenId: string) => void,
    { error?: { status: number }; data?: NftNear },
  ];
  useGetNftsByOwner: () => [(address: string) => void, { data?: NftNear[] }];
  useGetSale: () => [(nftId: string) => void, { error: any; data: Sale }];
};

type BuyParams = {
  tokenId: string;
  price: string;
  callbackUrl?: string;
};

type MintParams = {
  title: string;
  description: string;
  nftStorageId: string;
  royalties: Royalty[];
  callbackUrl?: string;
};

type StorageDepositParams = {
  amount: string;
  accountId?: string;
  callbackUrl: string;
};

type StorageWithdrawParams = {
  callbackUrl: string;
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

type Sale = {
  ownerAddress: string;
  price: string;
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

  const [accountBalance, setAccountBalance] = useState<string>();

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

      // account balance
      if (address) {
        walletConnection
          .account()
          .getAccountBalance()
          .then((balance) => {
            setAccountBalance(balance.total);
          });
      }

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
          changeMethods: [
            'remove_sale',
            'offer',
            'storage_deposit',
            'storage_withdraw',
          ],
        },
      );
      setMarketContract(marketContract);
    }
  }, [walletConnection]);

  useEffect(() => {
    setIsSignedIn(walletConnection?.isSignedIn() ?? false);
  }, [walletConnection]);

  const buyNft = ({ tokenId, price, callbackUrl }: BuyParams) => {
    marketContract.offer({
      args: {
        nft_contract_id: getConfig().nftContractName,
        token_id: tokenId,
      },
      gas: BOATLOAD_OF_GAS,
      amount: parseAmount(price),
      callbackUrl: callbackUrl,
    });
  };

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
    { error?: { status: number }; data?: NftNear },
  ] => {
    const [nft, setNft] = useState<NftNear>();
    const [error, setError] = useState<any>();

    const requestGetNft = useCallback(
      (tokenId: string) => {
        if (nftContract) {
          nftContract
            .nft_token({
              token_id: tokenId,
            })
            .then((nft: any) => {
              const deserializedNft = nft ? NftNear.fromData(nft) : nft;
              setNft(deserializedNft);
            });
        }
      },
      [nftContract],
    );

    useEffect(() => {
      if (nft === null) {
        setError({ status: 404 });
      }
    }, [nft]);

    return [requestGetNft, { error, data: nft }];
  };

  const useGetNftsByOwner = (): [
    (address: string) => void,
    { data?: NftNear[] },
  ] => {
    const [nfts, setNfts] = useState<NftNear[]>();

    const requestGetNftsByOwner = useCallback(
      (address: string) => {
        if (nftContract) {
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
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [nftContract],
    );

    return [requestGetNftsByOwner, { data: nfts }];
  };

  const useGetSale = (): [
    (tokenId: string) => void,
    { error: any; data: any },
  ] => {
    const [sale, setSale] = useState<Sale>();
    const [error, setError] = useState<any>();

    const request = useCallback(
      (tokenId: string) => {
        if (marketContract) {
          marketContract
            .get_sale({
              nft_contract_token: `${getConfig().nftContractName}.${tokenId}`,
            })
            .then((sale: { owner_id: string; sale_conditions: string }) => {
              if (sale) {
                setSale({
                  ownerAddress: sale.owner_id,
                  price: sale.sale_conditions,
                });
              } else {
                setError({ status: 404, message: 'Sale not found' });
              }
            });
        }
      },
      [marketContract],
    );

    return [request, { error, data: sale }];
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

  const storageDeposit = useCallback(
    ({ amount, accountId, callbackUrl }: StorageDepositParams) => {
      if (!marketContract) {
        throw new Error('Market contract is not initialized');
      }

      const args = accountId
        ? {
            account_id: accountId,
          }
        : {};

      return marketContract.storage_deposit({
        args,
        gas: BOATLOAD_OF_GAS,
        amount: parseAmount(amount),
        callbackUrl: callbackUrl,
      });
    },
    [marketContract],
  );

  const storageWithdraw = useCallback(
    ({ callbackUrl }: StorageWithdrawParams) => {
      if (!marketContract) {
        throw new Error('Market contract is not initialized');
      }

      return marketContract.storage_withdraw({
        args: {},
        amount: MIN_ATTACHABLE_DEPOSIT,
        gas: BOATLOAD_OF_GAS,
        callbackUrl: callbackUrl,
      });
    },
    [marketContract],
  );

  const memoizedContext = useMemo<BlockchainContext>(
    () => ({
      accountBalance,
      address,
      buyNft,
      formatAmount,
      gasFees,
      isSignedIn,
      mint,
      storageDeposit,
      storageWithdraw,
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
    [
      accountBalance,
      address,
      buyNft,
      gasFees,
      isSignedIn,
      mint,
      signIn,
      signOut,
    ],
  );

  return (
    <NearContext.Provider value={memoizedContext}>
      {children}
    </NearContext.Provider>
  );
};

export { useNear, NearProvider };
