try {
    setTimeout(() => {
        throw new Error('1111');
    }, 2000);
} catch (e) {
    console.log(e);
}

window.onerror(e => {
    console.error(e);
});

process.on('uncaughtException', e => {
    console.log(e);
});
