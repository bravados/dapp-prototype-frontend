import { renderHook, act, waitFor } from '@testing-library/react';
import { useQuery } from '../query';
import { request } from '../request';

jest.mock('../request', () => ({ request: jest.fn() }));

const url = 'localhost';
const path = '/path';

describe.skip('useQuery', () => {
  describe('when request is not performed', () => {
    it('returns loading to false', () => {
      const { result } = renderHook(() => useQuery());

      const [_, { loading }] = result.current;

      expect(loading).toEqual(false);
    });
  });

  describe('when request is successful', () => {
    beforeEach(() => {
      (request as jest.Mock).mockResolvedValue({});
    });

    it('triggers the request calling the returned function', async () => {
      const { result } = renderHook(() => useQuery());

      act(() => {
        const [query] = result.current;

        query();
      });

      await waitFor(() => {
        expect(request).toBeCalled();
      });
    });

    it('triggers the request with the right url', async () => {
      const { result } = renderHook(() => useQuery(url));

      act(() => {
        const [query] = result.current;

        query({ path });
      });

      await waitFor(() => {
        expect(request).toBeCalledWith(`${url}${path}`, { method: 'GET' });
      });
    });

    it('calls on success callback', async () => {
      const id = 1;
      const context = { id };
      const onSuccess = jest.fn();
      const { result } = renderHook(() => useQuery(url, { onSuccess }));

      const [query, { data }] = result.current;

      act(() => {
        query({ context });
      });

      await waitFor(() => {
        expect(onSuccess).toBeCalledWith(data, context);
      });
    });
  });

  describe('when request fails', () => {
    beforeEach(() => {
      (request as jest.Mock).mockRejectedValue(new Error());
    });

    it('calls on error callback', async () => {
      const onError = jest.fn();
      const { result } = renderHook(() => useQuery(url, { onError }));

      act(() => {
        const [query] = result.current;

        query();
      });

      await waitFor(() => {
        expect(onError).toBeCalled();
      });
    });
  });

  describe('when request is already performed', () => {
    it('triggers the refetch method', async () => {
      const { result } = renderHook(() => useQuery(url));

      act(() => {
        const [query] = result.current;

        query({ path });
      });

      await waitFor(() => {
        expect(request).toBeCalledWith(`${url}${path}`, { method: 'GET' });
      });

      act(() => {
        const [query] = result.current;

        query({ path });
      });

      await waitFor(() => {
        expect(request).toBeCalledWith(`${url}${path}`, { method: 'GET' });
      });
    });
  });
});
