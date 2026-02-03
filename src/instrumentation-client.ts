import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: 'https://3d3c9b9c92d702d7a877477b78b9d0ec@o4509600094093322.ingest.us.sentry.io/4509600102678528',
    integrations: [Sentry.replayIntegration()],
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
