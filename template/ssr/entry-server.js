import { createApp } from './app';

const isProd = process.env.NODE_ENV === 'production';

export default context => {
    return new Promise((resolve, reject) => {
        const s = !isProd && Date.now();

        const { app, router, store } = createApp();
        const { url } = context;
        const { fullPath } = router.resolve(url).route;

        if (fullPath !== url) {
            return reject({ url: fullPath });
        }

        // set router's location
        router.push(url);

        // wait until router has resolved possible async hooks
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            // no matched routes
            console.log('-'.repeat(20));
            console.log(matchedComponents.length);
            console.log('-'.repeat(20));

            if (!matchedComponents.length) {
                return reject({ code: 404, message: 'no matched routes' });
            }

            Promise.all(
                matchedComponents.map(
                    ({ asyncData }) =>
                        asyncData &&
                        asyncData({ store, route: router.currentRoute })
                )
            )
                .then(() => {
                    !isProd &&
                        console.log(`data pre-fetch: ${Date.now() - s}ms`);
                    context.state = store.state;
                    resolve(app);
                })
                .catch(reject);
        }, reject);
    });
};
