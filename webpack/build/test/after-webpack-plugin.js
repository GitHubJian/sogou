const fse = require('fs-extra');
const glob = require('glob');
const copy = require('copy');

function _copy_(from, to) {
    return new Promise((resolve, reject) => {
        copy(from, to, (err, files) => {
            if (err) reject(err);
            else resolve(files);
        });
    });
}

class AfterWebpackPlugin {
    constructor(patterns = []) {
        if (!Array.isArray(patterns)) {
            throw new Error('[after-webpack-plugin] patterns must be an array');
        }

        this.patterns = patterns;
    }

    async _copy_() {
        try {
            for (const { from, to } of this.patterns) {
                await _copy_(from, to);
            }
        } catch (err) {
            console.error(err);
        }
    }

    apply(compiler) {
        let self = this;
        const plugin = { name: 'AfterWebpackPlugin' };

        compiler.hooks.done.tapAsync(plugin, (compilation, cb) => {
            self._copy_();
            cb();
        });
    }
}

// AfterWebpackPlugin.default = AfterWebpackPlugin;
module.exports = AfterWebpackPlugin;
