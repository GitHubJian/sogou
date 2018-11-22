const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
        return reject(1);
        console.log(123);
    }, 2000);
});

prom.catch(e => {
    console.log(e);
});
