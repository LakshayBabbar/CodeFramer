import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/api/webhooks/(.*)',
  '/web-editor',
  '/compiler/(.*)',
  '/',
  '/sign-in',
  '/sign-up',
  '/chat',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/api/(.*)',
    '/dashboard(.*)',
    '/web-editor/(.*)',
    '/api/webhooks/(.*)',
    '/chat',
    '/compiler/(.*)',
  ],
};
