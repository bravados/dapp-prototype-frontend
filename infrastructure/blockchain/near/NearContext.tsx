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
  isSignedIn: () => boolean;
  signIn: (successUrl?: string) => void;
  signOut: () => void;
  address?: string;
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

  const [address, setAddress] = useState<string>();

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
      setWalletConnection(new nearAPI.WalletConnection(near, 'kirunalabs'));
    }
  }, [near]);

  useEffect(() => {
    if (walletConnection) {
      const address = walletConnection.getAccountId();
      setAddress(address);
    }
  }, [walletConnection]);

  const isSignedIn = useCallback(() => {
    return walletConnection?.isSignedIn() ?? false;
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
      address,
    }),
    [isSignedIn, signIn, signOut, address],
  );

  return (
    <NearContext.Provider value={memoizedContext}>
      {children}
    </NearContext.Provider>
  );
};

export { useNearContext, NearContextProvider };
