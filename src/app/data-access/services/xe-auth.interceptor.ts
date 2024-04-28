import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const XE_API_URL = 'https://xecdapi.xe.com';
const KEY = 'swinburneuniversity332764369';
const SECRET = '19k6dncm0u2q4ih5l7uqh580bv';

export const xeAuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (req.url.includes(XE_API_URL)) {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${KEY}:${SECRET}`),
      },
    });
  }
  return next(req);
};
