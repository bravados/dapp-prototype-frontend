import { HTTPError, request } from '../request';

global.fetch = jest.fn();

const url = 'localhost';
const method = 'POST';

describe('request', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('when request includes body', () => {
    beforeEach(() => {
      (fetch as jest.Mock).mockResolvedValue({ ok: true, json: () => {} });
    });

    it('includes body as string', async () => {
      const body = { data: 'data' };

      await request(url, { method, body });

      expect(fetch).toBeCalledWith(url, {
        method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    });
  });

  describe('when request includes custom headers', () => {
    beforeEach(() => {
      (fetch as jest.Mock).mockResolvedValue({ ok: true, json: () => {} });
    });

    it('includes body as string', async () => {
      const headers = { 'X-CUSTOM-HEADER': 'header' };

      await request(url, { method, headers });

      expect(fetch).toBeCalledWith(url, {
        method,
        headers: {
          'content-type': 'application/json',
          'X-CUSTOM-HEADER': 'header',
        },
      });
    });
  });

  describe('when request fails', () => {
    describe('when status is not unauthorized', () => {
      const status = 403;
      beforeEach(() => {
        (fetch as jest.Mock).mockResolvedValue({
          ok: false,
          status,
        });
      });

      it('raises an error', async () => {
        try {
          await request(url, { method });
        } catch (error) {
          expect((error as HTTPError).status).toEqual(status);
        }
      });
    });
  });
});
