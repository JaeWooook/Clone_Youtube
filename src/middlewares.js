import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "YourTube";
  res.locals.routes = routes;
  next();
};
