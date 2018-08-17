const path = require('path');
const  webpack =require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath:'/dist/',
        filename: 'js/app.jsx'
    },
    module: {
        rules: [
            //react语法的处理
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            //css文件处理
            {
                test: /\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            //scss文件处理
            {
                test: /\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader",'sass-loader']
                })
            },
            //图片的配置
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name:'resource/[name.[ext]'
                        }
                    }
                ]
            },
            //字体图标的配置
            {
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
    use: [
    {
        loader: 'url-loader',
        options: {
            limit: 8192
        }
    }
]
}
        ]
    },
plugins: [
    //处理html文件
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    //独立css文件
    new ExtractTextPlugin("css/[name].css"),
    //提出公共模块
    new webpack.optimize.CommonsChunkPlugin({
        name:'common',
        filename:'js/base.js'
    })
],
    devServer:{
      port:8086,
        historyApiFallback:
            {
                index:'/dist/index.html'
            },
            //接口定义
            proxy:{
                '/manage':{
                    target:'http://admintest.happymmall.com',
                    changeOrigin:true
                },
                '/user/logout.do' :{
                    target:'http://admintest.happymmall.com',
                    changeOrigin:true
                },
                '/manage/user/list.do':{
                    target:'http://admintest.happymmall.com',
                    changeOrigin:true

                }
            }
    }
};
