export const contains = (target, deep = true) => {
    const walk = parent => {
        const children = parent.childNodes || [];
        let result = false;
        for (let i = 0, j = children.length; i < j; i++) {
            const child = children[i];
            if (child === target || (deep && walk(child))) {
                result = true;
                break;
            }
        }

        return result;
    };

    return walk(this);
};
