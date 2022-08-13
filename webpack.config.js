const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

console.log(process.env.NODE_ENV)

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: './dating_app/assets/index.js',
    output: {
        path: path.resolve(__dirname, './dating_app/static'),
        publicPath: '/static/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                },
            },

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'source-map-loader',
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        hot: true,
        proxy: {
            '!/static/**': {
                target: 'http://localhost:8000',
                secure: false,
            }
        },
        client: {
            overlay: false,
        },
    },
    plugins: [isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
}