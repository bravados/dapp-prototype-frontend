import { useMutation, useQuery } from '@infrastructure/http';
import { User } from '@domain/user';
import { UserAdapter } from '@services/users/user.adapter';
import { Blockchain } from '@domain/wallet';

jest.mock('@infrastructure/http', () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock('@domain/user', () => ({
  User: {
    fromData: jest.fn(),
  },
}));

const blockchain = 'NEAR';

const address = '123';

const baseUrl = process.env.NEXT_PUBLIC_KIRUNALABS_API_URL;

describe('createUser', () => {
  const request = jest.fn();
  const payload = {
    blockchain: 'NEAR' as Blockchain,
    address: '123',
  };

  describe('when the request is loading', () => {
    beforeEach(() => {
      (useMutation as jest.Mock).mockReturnValue([
        request,
        {
          loading: true,
        },
      ]);
    });

    it('does not build the domain entity', () => {
      const adapter = new UserAdapter();

      adapter.createUser(payload);

      expect(User.fromData).not.toBeCalled();
    });
  });

  describe('when the request is already performed', () => {
    beforeEach(() => {
      (useMutation as jest.Mock).mockReturnValue([
        request,
        {
          loading: false,
          data: {},
        },
      ]);
    });

    it('builds the domain entity', () => {
      const adapter = new UserAdapter();

      adapter.createUser(payload);

      expect(useMutation).toBeCalledWith(`${baseUrl}/users`, {
        method: 'POST',
      });

      expect(User.fromData).toBeCalled();
    });

    it('performs the request with the payload', () => {
      const adapter = new UserAdapter();

      const [requestFn, _] = adapter.createUser(payload);

      requestFn();

      expect(request).toBeCalledWith({ data: payload });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('getUser', () => {
  describe('when the request is loading', () => {
    const request = jest.fn();

    beforeEach(() => {
      (useQuery as jest.Mock).mockReturnValue([
        request,
        {
          loading: true,
        },
      ]);
    });

    it('does not build the domain entity', () => {
      const adapter = new UserAdapter();

      adapter.getUser(blockchain, address);

      expect(User.fromData).not.toBeCalled();
    });
  });

  describe('when the request is already performed', () => {
    const request = jest.fn();

    beforeEach(() => {
      (useQuery as jest.Mock).mockReturnValue([
        request,
        {
          loading: false,
          data: {},
        },
      ]);
    });

    it('builds the domain entity', () => {
      const adapter = new UserAdapter();

      adapter.getUser(blockchain, address);

      expect(useQuery).toBeCalledWith(
        `${baseUrl}/users/${blockchain.toLowerCase()}/${address}`,
      );

      expect(User.fromData).toBeCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
