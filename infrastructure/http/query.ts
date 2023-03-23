import { useState } from 'react';
import { useQuery as _useQuery } from '@tanstack/react-query';

import { request } from './request';
import type { Callback } from './request';

type QueryRequestOptions<T = unknown> = {
  path?: string;
  context?: T;
};

type QueryResponse<T = unknown, S = unknown> = [
  (params?: QueryRequestOptions<S>) => void,
  {
    loading: boolean;
    error?: any;
    data?: T;
  },
];

type QueryOptions<T = unknown, S = unknown> = {
  key?: string;
  onError?: Callback<T | undefined, S | undefined>;
  onSuccess?: Callback<T | undefined, S | undefined>;
};

const useQuery = <T = unknown, S = unknown>(
  url?: string,
  options?: QueryOptions<T, S>,
): QueryResponse<T, S> => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [requestUrl, setRequestUrl] = useState<string>(url || '');
  const [context, setContext] = useState<S>();

  const onSuccessCallback = (data?: T) => {
    try {
      options?.onSuccess!(data, context);
    } catch {}
  };

  const onErrorCallback = (data?: T) => {
    try {
      options?.onError!(data, context);
    } catch {}
  };

  const response = _useQuery({
    queryKey: options?.key ? [options.key] : [requestUrl],
    queryFn: () => request(requestUrl, { method: 'GET' }),
    retry: false,
    enabled,
    refetchOnWindowFocus: false,
    onSuccess: onSuccessCallback,
    onError: onErrorCallback,
  });

  const performQuery = <T>({ path, context }: QueryRequestOptions<T> = {}) => {
    setRequestUrl(`${url || ''}${path || ''}`);
    setContext(context as S);

    if (enabled) {
      response.refetch();
    } else {
      setEnabled(true);
    }
  };

  return [
    performQuery,
    {
      loading: response.isLoading && response.isFetching,
      error: response.error,
      data: response.data as T,
    },
  ];
};

export { useQuery };
export type { QueryResponse, QueryOptions };
