function login_weixin({ target_url } = {}) {
  const appid = process.env.WEIXIN_APPID

  // NOTE: 不要假设这个Promise一定会resolve！
  // 并不是所有系统所有版本的微信都有pageshow事件。
  return new Promise((resolve) => {
    const onPageshow = (e) => {
      window.removeEventListener('pageshow', onPageshow)
      if (e.persisted) {
        resolve()
      }
    };
    window.addEventListener('pageshow', onPageshow)

    const ru = target_url || window.location.href
    // 因为这个接口decode了两次，ru本身有参数的话会乱，所以encode两次(或者换其他编码)
    const redirectUri = encodeURIComponent(encodeURIComponent(`${process.env.BASE_URL_H5}/zzzz/account/oauth2_callback/weixin?appid=${appid}&ru=${encodeURIComponent(ru)}`))

    window.location = `${process.env.WEIXIN_AUTHORIZE_URL}?appid=${appid}&redirect_uri=${redirectUri}&scope=snsapi_userinfo&mode=bycode`
  });
}