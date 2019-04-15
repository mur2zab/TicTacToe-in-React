const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        path:path.join(__dirname,'/bundle'),
        filename: 'index_bundle.js'
    },
    devServer: {
        inline: true,
        port: 5558
    },
    module:{
        rules:[
            {
                test: [/\.jsx?$/,/\.css$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                 presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}