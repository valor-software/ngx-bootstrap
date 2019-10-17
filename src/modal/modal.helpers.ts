import { CloseInterceptorFn } from './models';

export const iterateOverInterceptors = (closeInterceptors: CloseInterceptorFn[],
                                        data?: any,
                                        i?: number): Promise<boolean> => {
  const key = i === undefined ? 0 : i;
  const interceptor = closeInterceptors[key];
  if (!interceptor) {
    return Promise.resolve(data);
  }

  return interceptor(data).then(
    res => iterateOverInterceptors(closeInterceptors, res, key + 1),
    res => Promise.reject(res)
  );
};
