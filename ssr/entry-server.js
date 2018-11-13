import { createApp } from './app';
import App from './App.vue';

export default context => {
    return new Promise((resolve, reject) => {
        const { app, store } = createApp();

        App.fetch({ store }).then(() => {
            context.state = store.state;
            resolve(app);
        });
    });
};
