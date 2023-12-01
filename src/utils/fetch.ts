import { handleCustomError } from './error';

type Methods = 'get' | 'post';

type Print = <T = unknown>(
  method: Methods,
  path: string,
  init?: RequestInit,
  headers?: () => Headers,
) => Promise<{ status: number; data: T }>;

type PrintWithoutMethod = <T = unknown>(
  path: string,
  init?: RequestInit,
  headers?: () => Headers,
) => Promise<{ status: number; data: T }>;

type MethodInit = {
  [K in Methods]: PrintWithoutMethod;
};
type RequestHeaders = Partial<{ Cookie?: string; 'User-Agent'?: string; 'x-forwarded-for'?: string }>;

const methods: Methods[] = ['get', 'post'];

const formatHeader = <T extends Headers>(headers: T): RequestHeaders | undefined => {
  if (!headers) {
    return undefined;
  }

  const userAgent = headers.get('User-Agent');
  const cookie = headers.get('Cookie');
  const ipAddress = headers.get('x-forwarded-for');

  return {
    ...(userAgent && { 'User-Agent': userAgent }),
    ...(cookie && { Cookie: cookie }),
    ...(ipAddress && { 'x-forwarded-for': ipAddress }),
  };
};


export const fetchClient = (() => {
  const print: Print = async (method, path, init, headers) => {
    if (typeof globalThis !== 'undefined' && typeof window === 'undefined' && !headers) {
      throw new Error("Missing 'headers' property in the options object");
    }

    const headerInstance = headers && formatHeader(headers());

    const { headers: headerInit, ...rest } = init || {};

    const options: RequestInit & { headers?: HeadersInit } = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(headerInit || {}),
        ...(headerInstance || {}),
      } as HeadersInit,
      ...rest,
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}${path}`;
    const response = await fetch(url, options);
    const status = response.status;

    if (!response.ok) {
      const errorData = await response.json();
      const message = errorData.message;

      throw handleCustomError(status, message);
    }

    try {
      const data = await response.json();
      return { status, data };
    } catch (error) {
      return { status, data: null };
    }
  };

  return methods.reduce((acc, cur) => ({ ...acc, [cur]: print.bind(null, cur) }), {}) as MethodInit;
})();
