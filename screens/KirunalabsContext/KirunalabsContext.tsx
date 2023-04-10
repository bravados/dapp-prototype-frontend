import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { User } from '@domain/user';

type KirunalabsContextType = {
  user?: User;
  setUser: (user: User) => void;
  deleteUser: () => void;
};

const KirunalabsContext = createContext<KirunalabsContextType | null>(null);

const useKirunalabs = (): KirunalabsContextType => {
  const context = useContext(KirunalabsContext);

  if (!context) {
    throw new Error('Ensure you have a KirunalabsContext provider');
  }

  return context;
};

type KirunalabsContextProviderProps = {
  children: React.ReactNode;
};

const KirunalabsProvider = ({ children }: KirunalabsContextProviderProps) => {
  const [user, setUser] = useState<User>();

  const deleteUser = useCallback(() => {
    setUser(undefined);
  }, [setUser]);

  const memoizedContext = useMemo<KirunalabsContextType>(
    () => ({
      user,
      setUser,
      deleteUser,
    }),
    [user, setUser, deleteUser],
  );

  return (
    <KirunalabsContext.Provider value={memoizedContext}>
      {children}
    </KirunalabsContext.Provider>
  );
};

export { useKirunalabs, KirunalabsProvider };
