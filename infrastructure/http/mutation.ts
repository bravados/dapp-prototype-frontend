import { useMutation as _useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { request } from './request';
import type { Method, Callback } from './request';

type MutationRequestOptions<T = unknown> = {
  data?: unknown;
  path?: string;
  context?: T;
};

type MutationResponse<T = unknown, S = unknown> = [
  (params?: MutationRequestOptions<S>) => void,
  {
    loading: boolean;
    error?: boolean;
    data?: T;
  },
];

type MutationOptions<T = unknown, S = unknown> = {
  method?: Method;
  onError?: Callback<T | undefined, S | undefined>;
  onSuccess?: Callback<T | undefined, S | undefined>;
};

const useMutation = <T = unknown, S = unknown>(
  url?: string,
  options?: MutationOptions<T, S>,
): MutationResponse<T, S> => {
  const [requestUrl, setRequestUrl] = useState<string>(url || '');
  const [data, setData] = useState<unknown>();
  const [enabled, setEnabled] = useState<boolean>(false);
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

  const mutationFn = async (data: unknown) => {
    let headers: Record<string, string> = {};
    let theRequest;

    try {
      theRequest = await request(requestUrl, {
        method: options?.method || 'POST',
        body: data,
        headers,
      });
      setEnabled(false);
    } catch (error) {
      console.log('Error while preparing the mutation');
      setEnabled(false);
      throw error;
    }

    return theRequest;
  };

  const mutation = _useMutation({
    retry: false,
    mutationFn,
    onSuccess: onSuccessCallback,
    onError: onErrorCallback,
  });

  const performMutation = ({
    data,
    path,
    context,
  }: MutationRequestOptions<S> = {}) => {
    setRequestUrl(`${url || ''}${path || ''}`);
    setContext(context);
    setData(data);

    setEnabled(true);
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    mutation.mutate(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return [
    performMutation,
    {
      loading: mutation.isLoading,
      error: mutation.isError,
      data: mutation.data,
    },
  ];
};

export { useMutation };
export type { MutationResponse, MutationOptions };
