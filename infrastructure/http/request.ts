type FetchResponse<T> = {
  loading: boolean;
  error?: boolean;
  data?: T;
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';

type ContentType = 'application/json' | 'multipart/form-data';

type RequestOptions = {
  method: Method;
  headers?: Record<string, string>;
  body?: unknown;
  contentType?: ContentType;
};

type FetchOptions = {
  method: Method;
  headers: Record<string, string>;
  body?: any;
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
  {
    method,
    body,
    headers,
    contentType = 'application/json',
  }: RequestOptions,
) => {
  let defaultHeaders = {} as any;
  
  if(contentType === 'application/json'){
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const fetchOptions: FetchOptions = {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };

  if (body) {
    fetchOptions.body =
      contentType === 'application/json' ? JSON.stringify(body) : body;
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new HTTPError('Invalid request', response.status);
  }

  return response.json();
};

export { request };
export type { ContentType, FetchResponse, Method, Callback, HTTPError };
