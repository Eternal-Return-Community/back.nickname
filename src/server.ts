import * as dotenv from 'dotenv';
dotenv.config()
import App from './App';
import connect from "./database/connect";

const port = process.env.PORT || 3000;
App.listen(port, () => {
  console.log(`Server is online! using port ${port}`);
  connect();
});