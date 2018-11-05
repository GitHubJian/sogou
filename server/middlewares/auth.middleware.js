const AUTH_SERVER = 'https://qsso.corp.qunar.com/login.php';
const VERIFY_TOKEN = 'http://qsso.corp.qunar.com/api/verifytoken.php';
const SSO_KEY = 'sensor_7896';
const SSO_APP_KEY = 'SENSOR';
const COOKIE_TOKEN_KEY = SSO_APP_KEY + '_ssoid';
const COOKIE_USER_ID = 'userId';
const COOKIE_USER_INFO = 'userInfo';
const logger = require('./../utils/logger');
const axios = require('axios');

module.exports = () => {
    return async (ctx, next) => {
        let checkUrl = ctx.path;
        // 静态资源
        // if (checkUrl.startsWith('/static/')) {
        //     return await next();
        // }

        // 跳过sso
        if (ctx.skipSSO) {
            return await next();
        }
        // alive check
        if (checkUrl === '/auth/login') {
            return await login.call(ctx);
        }

        if (checkUrl === '/auth/callback') {
            return await callback.call(ctx);
        }

        const token = getToken.call(ctx);

        // 如果没有token或者token验证失败
        if (token) {
            var { userInfo } = await getUserInfo.call(ctx, token);
        }

        if (!token) {
            return setLoginMessage.call(ctx, '已退出登录，请重新登录');
        }

        // if (!userInfo) {
        //     return setLoginMessage.call(ctx, '登录过期，请重新登录');
        // }

        // token 与 login 是否一致
        // TODO
        await next();
    };
};

async function login() {
    let callbackUri = this.query.callback || encodeURIComponent('/');
    let redirect_uri = encodeURIComponent(
        `${this.origin}/auth/callback?callback=${callbackUri}`
    );

    logger.node('正在登录...');

    return this.redirect(`${AUTH_SERVER}?ret=${redirect_uri}`);
}

async function callback() {
    let { token } = this.request.body;
    let callback_uri = this.query.callback;

    try {
        let { userId, userInfo } = await getUserInfo.call(this, token);

        setToken.call(this, token);
        setUserInfo.call(this, userId, userInfo);

        logger.node('登录成功');

        this.redirect(callback_uri);
    } catch (e) {
        this.status = 401;
        this.body = `登录失败，请稍后重试(${e})`;
    }
}

function getToken() {
    return this.cookies.get(COOKIE_TOKEN_KEY) || '';
}

function setToken(token) {
    this.cookies.set(COOKIE_TOKEN_KEY, token);
}

function setLoginMessage(msg) {
    if (!this.accepts('html')) {
        this.status = 401;
        return (this.body = {
            code: 5,
            data: null,
            msg: msg
        });
    } else {
        const redirect_uri = `${
            this.origin
        }/auth/login?callback=${encodeURIComponent(this.url)}`;

        return this.redirect(redirect_uri);
    }
}

function setUserInfo(userId = '', userInfo = {}) {
    this.cookies.set(COOKIE_USER_ID, userId);
    this.cookies.set(COOKIE_USER_INFO, userInfo);
}

async function getUserInfo(token) {
    let token_uri = `${VERIFY_TOKEN}?token=${token}`;
    let res = await axios.get(token_uri);
    let {
        data: { ret, data, errmsg },
        status
    } = res;

    if (status !== 200) {
        throw new Error('验证token失败');
    }

    if (ret) {
        return data;
    } else {
        throw new Error(errmsg);
    }
}
