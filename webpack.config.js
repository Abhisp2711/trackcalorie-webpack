const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
   mode: 'production',
   entry: './src/app.js',
   output: {
      path: path.resolve(__dirname,'dist'),
      filename: 'bundle.js',
   },
   devServer : {
      static:{
         directory: path.resolve(__dirname,'dist'),
      },
      port: 3000,
      hot : true,
      open : true,
      compress: true,
      historyApiFallback: true,
   },
   module:{
      rules: [
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader,'css-loader']
         },
         {
            test: /\.js$/,
            exclude:/node_modules/,
            use:{
               loader: 'babel-loader',
               options:{
                  presets:['@babel/preset-env']
               },
            },
         },
      ],
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: '[name].css', // Generate a CSS file with the same name as the entry file
       }),
      new htmlWebpackPlugin({
         title: 'Webpack App',
         filename: 'index.html',
         template: './src/index.html',
      }),
   ],
};
