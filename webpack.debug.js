const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        eosjs_api: './src/eosjs-api.ts',
        eosjs_jsonrpc: './src/rpc-web.ts',
        eosjs_jssig: './src/eosjs-jssig.ts',
        eosjs_wasig: './src/eosjs-webauthn-sig.ts', // AMIHDEBUG I need webauthn sig provider
        eosjs_numeric: './src/eosjs-numeric.ts',
        eosjs_serialize: './src/eosjs-serialize.ts', // AMIHDEBUG added this since it is needed in EOS-in-a-Box for creating webauthn key pairs
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.web.json'
                    }
                },
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*'] }),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            buffer: 'buffer',
            crypto: 'crypto-browserify'
        }
    },
    output: {
        filename: x => x.chunk.name.replace('_', '-') + '.js',
        library: '[name]',
        path: path.resolve(__dirname, 'dist-web'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'externals',
                    filename: 'externals.js',
                    chunks: 'all'
                },
            },
        },
    }
};
