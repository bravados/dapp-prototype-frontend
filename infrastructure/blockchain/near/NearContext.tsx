import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  BrowserLocalStorageKeyStore,
  getConfig,
  Near,
  nearAPI,
  WalletConnection,
} from './config';

type WalletContext = {
  isSignedIn: () => void;
  signIn: (successUrl?: string) => void;
  signOut: () => void;
};

const NearContext = createContext<WalletContext | null>(null);

const useNearContext = (): WalletContext => {
  const context = useContext(NearContext);

  if (!context) {
    throw new Error('Ensure you have a NearContext provider');
  }

  return context;
};

const NearContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [keyStore, setKeyStore] = useState<BrowserLocalStorageKeyStore>();

  const [near, setNear] = useState<Near>();

  const [walletConnection, setWalletConnection] = useState<WalletConnection>();

  useEffect(() => {
    if (!keyStore) {
      const newKeyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore({
        prefix: 'kirunalabs-near-wallet',
      });
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
      setWalletConnection(new nearAPI.WalletConnection(near, null));
    }
  }, [near]);

  const isSignedIn = useCallback(() => {
    walletConnection?.isSignedIn();
  }, [walletConnection]);

  const signIn = useCallback(
    (successUrl?: string) => {
      walletConnection?.requestSignIn({ successUrl });
    },
    [walletConnection],
  );

  const signOut = useCallback(() => {
    walletConnection?.signOut();
  }, [walletConnection]);

  const memoizedContext = useMemo<WalletContext>(
    () => ({
      isSignedIn,
      signIn,
      signOut,
    }),
    [isSignedIn, signIn, signOut],
  );

  return (
    <NearContext.Provider value={memoizedContext}>
      {children}
    </NearContext.Provider>
  );
};

export { useNearContext, NearContextProvider };
