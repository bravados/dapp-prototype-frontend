import { renderHook, act, waitFor } from '@testing-library/react';
import { useMutation } from '../mutation';
import { request } from '../request';

jest.mock('../request', () => ({ request: jest.fn() }));

const url = 'localhost';
const path = '/path';

describe.skip('useMutation', () => {
  describe('when request is successful', () => {
    beforeEach(() => {
      (request as jest.Mock).mockResolvedValue({});
    });

    it('triggers the request calling the returned function', async () => {
      const { result } = renderHook(() => useMutation());

      act(() => {
        const [mutation] = result.current;

        mutation();
      });

      await waitFor(() => {
        expect(request).toBeCalled();
      });
    });

    it('triggers the request with the right url', async () => {
      const { result } = renderHook(() => useMutation(url));

      act(() => {
        const [mutation] = result.current;

        mutation({ path, data: {} });
      });

      await waitFor(() => {
        expect(request).toBeCalledWith(`${url}${path}`, {
          method: 'POST',
          body: {},
          headers: {},
        });
      });
    });

    it('calls on success callback', async () => {
      const id = 1;
      const context = { id };
      const onSuccess = jest.fn();
      const { result } = renderHook(() => useMutation(url, { onSuccess }));

      const [mutation, { data }] = result.current;

      act(() => {
        mutation({ context });
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
      const { result } = renderHook(() => useMutation(url, { onError }));

      act(() => {
        const [mutation] = result.current;

        mutation();
      });

      await waitFor(() => {
        expect(onError).toBeCalled();
      });
    });
  });
});
