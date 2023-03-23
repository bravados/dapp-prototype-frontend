import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { User } from '@domain/user';

const localStorageUser = atomWithStorage<User | null>('kirunalabs-user', null);

const useLocalStorageUser = () => useAtom(localStorageUser);

export { useLocalStorageUser };
