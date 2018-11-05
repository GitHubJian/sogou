const logger = require('./../utils/logger');

module.exports = function() {
    return async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            logger.error(e, [ctx.request.url]);
        }
    };
};
