const router = require("express").Router();
const _ = require("lodash");

let _registerRoutes = (routes, method) => {
  _.forEach(routes, (value, key) => {
    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Array)
    ) {
      _registerRoutes(value, key);
    } else {
      if (method === "get") {
        router.get(key, routes[key]);
      } else if (method === "post") {
        router.post(key, value);
      } else {
        console.log(key, value);
        router.use(value);
      }
    }
  });
};

let route = routes => {
  _registerRoutes(routes);
  return router;
};

module.exports.route = route;
