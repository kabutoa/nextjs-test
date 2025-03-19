// middleware.ts
import { NextResponse } from 'next/server';
import isMobile from 'is-mobile';
import logger from '@/lib/logger';

// 创建middleware专用的logger实例
const middlewareLogger = logger.child({ component: 'middleware' });

export function middleware(request: Request) {
  const startTime = Date.now();
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);

  // 记录请求开始
  middlewareLogger.info({
    msg: 'Incoming request',
    path: url.pathname,
    userAgent,
  });

  const isMobileDevice = isMobile({ ua: userAgent, tablet: false });
  const isTablet = !isMobileDevice && isMobile({ ua: userAgent, tablet: true });
  const isDesktop = !isMobileDevice && !isTablet;

  let response: NextResponse;

  if (isMobileDevice && url.pathname !== '/mobile') {
    response = NextResponse.redirect(new URL('/mobile', request.url));
  } else if (isTablet && url.pathname !== '/tablet') {
    response = NextResponse.redirect(new URL('/tablet', request.url));
  } else if (isDesktop && url.pathname !== '/') {
    response = NextResponse.redirect(new URL('/', request.url));
  } else {
    response = NextResponse.next();
  }

  // 记录请求处理结果
  const duration = Date.now() - startTime;
  middlewareLogger.info({
    msg: 'Request completed',
    path: url.pathname,
    duration,
    deviceType: isMobileDevice ? 'mobile' : isTablet ? 'tablet' : 'desktop',
    redirected: response instanceof NextResponse && response.headers.has('Location'),
  });

  return response;
}

export const config = {
  matcher: ["/", "/mobile", "/tablet"],
};

