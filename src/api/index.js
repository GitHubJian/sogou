export function serverFetchUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: 'server' });
        }, 200);
    });
}

export function clientFetchUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: 'client' });
        }, 200);
    });
}
