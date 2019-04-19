var webpack = require('webpack');
const path= require("path");
const output_dir = "dist";
const output_path = path.resolve(__dirname, output_dir);
module.exports = {
    mode:"development",
    devtool:"cheap-module-source-map",
    devServer: {
        contentBase: ".", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        hot: true,
        inline: true, //实时刷新
        hot: true, //Enable webpack's Hot Module Replacement feature
        compress: true, //Enable gzip compression for everything served
        overlay: true, //Shows a full-screen overlay in the browser
        stats: "errors-only", //To show only errors in your bundle
        open: true, //When open is enabled, the dev server will open the browser.
        openPage:'demos/framework.html',

    },
    entry:{
        "tridom":"./src/index.ts"
    },
    output: {
        filename: '[name].js',
        path: output_path,
        library: '',
        libraryTarget: 'umd',
        // globalObject: 'this',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [{
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /^\.d.ts$/,
                use: 'ignore-loader'
            }
        ]
    },
}