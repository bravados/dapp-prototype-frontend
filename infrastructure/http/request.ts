type FetchResponse<T> = {
  loading: boolean;
  error?: boolean;
  data?: T;
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';

type RequestOptions = {
  method: Method;
  headers?: Record<string, string>;
  body?: unknown;
};

type FetchOptions = {
  method: Method;
  headers: Record<string, string>;
  body?: string;
};

type Callback<T = unknown, S = unknown> = (data?: T, context?: S) => void;

class HTTPError extends Error {
  status?: number;

  constructor(message?: string, status?: number) {
    super(message);

    this.status = status;
  }
}

const request = async (
  url: string,
  { method, body, headers = {} }: RequestOptions,
) => {
  const defaultHeaders = {
    'content-type': 'application/json',
  };

  const fetchOptions: FetchOptions = {
    method,
    headers: {
      ...defaultHeaders,
      ...(headers || {}),
    },
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new HTTPError('Invalid request', response.status);
  }

  return response.json();
};

export { request };
export type { FetchResponse, Method, Callback, HTTPError };
