import { createContext, useContext, useMemo } from 'react';
import { User } from '@domain/user';
import { useGetUser } from 'application/user/getUser.usecase';
import { useLocalStorageUser } from '@infrastructure/localStorage';

type KirunalabsContextType = {
  user: Maybe<User>;
  setUser: (user: User) => void;
};

const KirunalabsContext = createContext<KirunalabsContextType | null>(null);

const useKirunalabsContext = (): KirunalabsContextType => {
  const context = useContext(KirunalabsContext);

  if (!context) {
    throw new Error(
      'Ensure you have a KirunalabsContext provider',
    );
  }

  return context;
};

type KirunalabsContextProviderProps = {
  children: React.ReactNode;
}

const KirunalabsContextProvider = ({children}: KirunalabsContextProviderProps) => {
  const [user, setUser] = useLocalStorageUser();

  const memoizedContext = useMemo<KirunalabsContextType>(() => ({
    user,
    setUser
  }), [user, setUser])
  
return <KirunalabsContext.Provider value={memoizedContext}>{children}</KirunalabsContext.Provider>
};

export { useKirunalabsContext, KirunalabsContextProvider };
