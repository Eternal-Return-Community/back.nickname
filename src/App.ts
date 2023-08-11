import express, { Application } from "express";
import cors from "cors";
import router from "./router/router";
import rateLimit from "express-rate-limit";
import rateLimitOptions from "./middleware/rateLimitOptions";
import corsOptions from "./middleware/corsOptions";

class App {

  public readonly _app: Application

  constructor() {
    this._app = express();
    this.middleware().group().router();
  };

  middleware() {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(rateLimit(rateLimitOptions));
    this._app.use(cors(corsOptions));
    return this;
  }

  group() {
    this._app.use('/v1', router);
    return this;
  };

  router() {
    this._app.get('*', (req, res) => {
      res.json({
        message: "This router don't exist."
      })
    })
  };

}

export default new App()._app;