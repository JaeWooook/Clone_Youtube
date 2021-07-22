export const localsMiddleware = (req, res, next) => {
  console.log(req.session); //로컬 미들웨어보다 서버에서 위에 session을 생성 해주기 때문에 가능한일이다.
  res.locals.loggedIn = Boolean(req.session.loggedIn); //boolean으로 하는것음 true false만을체크하기 위함이다 언디파인에러를 잡기위함
  res.locals.siteName = "YourTube";
  res.locals.loggedInUser = req.session.user; //이건 로그인안하면 언디파인이 될 수 있기 때문에 로그인 아닐때는 사용해서는안된다.
  console.log(res.locals);
  next();
};
