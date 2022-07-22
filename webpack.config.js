const path = require('path')

module.exports = {
    entry: './dating_app/assets/index.js',
    output: {
        path: path.resolve(__dirname, './dating_app/static'),
        filename: 'bundle.js', 
    }, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env", "@babel/preset-react"]}
            }
        ]
    }
}