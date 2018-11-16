/**
 * Axios Proxy
 * 
 * @description
 * if ctx.path that is '/api/path' starts with '/api' that value is http://search,
 * proxy to 'http://search//api/path',
 * but proxy object has keys '/api' and '/api/pa',
 * now keys is sorted, and is matching who returns prefix
 * @author xiaowengsheng@sogou-inc.com
 * @param path
 *      that is current location.path
 * @returns 
 *      type of prefix is String
 * @create_time 2018/11/16
 * @example
 * path is ctx.path
 * function glob(path){
 *   return url_prefix
 * }
 */

module.exports = {
    '/api': () => {
        return 'http://';
    },
    '/api/a': () => {
        return 'http://123';
    }
};
