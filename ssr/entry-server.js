import { 
    app, 
    store, 
    App 
} from './app';

export default context => {
    return new Promise((resolve, reject) => {
        App.fetch({ 
            store
         }).then(() => {
            context.state = store.state;
            resolve(app);
        });
    });
};
