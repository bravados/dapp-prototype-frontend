import { alice } from '@domain/user/__mocks__/user';
import { useLocalStorageUser } from '@infrastructure/localStorage';
import { UserAdapter } from '@services/users/user.adapter';
import { renderHook } from '@testing-library/react';
import { useGetUser } from '../getUser.usecase';

jest.mock('@infrastructure/localStorage', () => ({
  useLocalStorageUser: jest.fn(),
}));

jest.mock('@services/users/user.adapter');

const request = jest.fn();

const blockchain = 'NEAR';
const address = 'alice.near';

describe.skip('getUser', () => {
  describe('when the user exists in the local storage', () => {
    const setUser = jest.fn();

    beforeEach(() => {
      (useLocalStorageUser as jest.Mock).mockReturnValue([alice, setUser]);
      const userAdapterInstance = (UserAdapter as jest.Mock).mock.instances[0];
      userAdapterInstance.getUser.mockReturnValue([
        request,
        { loading: false },
      ]);
    });

    it('returns the user from the local storage', () => {
      const {
        result: {
          current: { user, request, loading },
        },
      } = renderHook(() => useGetUser(blockchain, address));

      const userAdapterInstance = (UserAdapter as jest.Mock).mock.instances[0];

      expect(userAdapterInstance.getUser).toHaveBeenCalledWith(
        blockchain,
        address,
      );

      expect(setUser).not.toHaveBeenCalled();

      expect(loading).toEqual(false);

      expect(request).toBeDefined();

      expect(user).toEqual(alice);
    });
  });
});
