module.exports = {
  chainWebpack: config => {
    config.module
      .rule('pdf')
      .test(/\.pdf$/)
      .use('file-loader')
      .loader('file-loader')
  },
  devServer: {
    proxy: 'http://localhost:8070',
  },
};
