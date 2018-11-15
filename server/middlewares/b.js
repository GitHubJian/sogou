const p = () =>
    new Promise((res, rej) => {
        setTimeout(() => {
            rej(1);
        }, 1000);
    });

(async () => {
    try {
        let a = await p();
        console.log(a);
    } catch (e) {
        console.log(e);
    }
})();
