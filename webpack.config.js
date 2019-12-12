const path = require('path');

module.exports = {
    entry: {
        tetris: path.join(__dirname, '/tetris.ts'),
        front: path.join(__dirname, '/front.ts'),
      } ,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        writeToDisk: true
      },
};
