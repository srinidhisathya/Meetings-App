const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    login: './src/auth/signin/login.js',
    signup: './src/auth/signup/signup.js',
    calendar: './src/calendar/calendar.js',
    addMeeting: './src/meeting/addMeeting.js',
    filterMeeting: './src/meeting/filterMeeting.js',
    teams: './src/teams/teams.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './src/auth/signin/signin.html',
      template: './src/auth/signin/signin.html',
      inject: true,
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      filename: './src/auth/signup/signup.html',
      template: './src/auth/signup/signup.html',
      inject: true,
      chunks: ['signup'],
    }),
    new HtmlWebpackPlugin({
      filename: './src/calendar/calendar.html',
      template: './src/calendar/calendar.html',
      inject: true,
      chunks: ['calendar'],
    }),

    new HtmlWebpackPlugin({
      filename: './src/meeting/addMeeting.html',
      template: './src/meeting/addMeeting.html',
      inject: true,
      chunks: ['addMeeting'],
    }),
    new HtmlWebpackPlugin({
      filename: './src/meeting/filterMeeting.html',
      template: './src/meeting/filterMeeting.html',
      inject: true,
      chunks: ['filterMeeting'],
    }),
    new HtmlWebpackPlugin({
      filename: './src/teams/teams.html',
      template: './src/teams/teams.html',
      inject: true,
      chunks: ['teams'],
    }),
  ],
};
