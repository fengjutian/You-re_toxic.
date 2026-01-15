import gulpError from './utils/gulpError';
App({
    globalData: {
      tirsAnswers: {},
      rtdrsAnswers: {},
      result: null
    },
    onShow() {
        if (gulpError !== 'gulpErrorPlaceHolder') {
            wx.redirectTo({
                url: `/pages/gulp-error/index?gulpError=${gulpError}`,
            });
        }
    },
});
