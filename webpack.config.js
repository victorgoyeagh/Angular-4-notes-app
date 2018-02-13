let path = require("path"),
    webpack = require("webpack"),
    watchBabel = require("watch-babel"),
    options = { glob: "src/*.js" },
    optionsCss = { glob: "src/*.scss" };

module.exports = {

    entry: ["src/app/app.module.ts"],
    output: {
        path: "src/assets/js/transpiled/",
        filename: "app.es6c.js"
    },
    watch: true,
    devServer: {
        inline: true,
        port: 8000
    },
    module: {
        loaders: [{
            test: [/\.js$/, /\.jsx?$/, /\.ts?$/, /\.tsx?$/],
            exclude: /(node_modules|bower_components)/,
            loader: ['babel-loader', 'ts-loader'],
            query: {
                presets: ["es2015", "stage-0"]
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.tsx', '.ts']
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules/')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
};