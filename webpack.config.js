const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point của ứng dụng
  entry: './src/index.tsx',

  // Chế độ phát triển hoặc sản xuất
  mode: 'development',

  // Nơi Webpack sẽ xuất các tệp sau khi build
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Dọn sạch thư mục dist trước khi build
  },

  // Các phần mở rộng được xử lý tự động
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  // Module và các loader
  module: {
    rules: [
      // Quy tắc cho TypeScript và TSX
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Quy tắc cho file CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Quy tắc cho file hình ảnh (jpg, png, svg, gif)
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // Các plugin Webpack
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // File HTML template
    }),
  ],

  // Cấu hình cho Webpack Dev Server
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,  // Nén các tệp để tối ưu tốc độ
    port: 3000,      // Cổng server
    hot: true,       // Hỗ trợ Hot Module Replacement (HMR)
    open: true,      // Mở trình duyệt sau khi server khởi động
    historyApiFallback: true, // Điều hướng cho ứng dụng SPA
  },
};
