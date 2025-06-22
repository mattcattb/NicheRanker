import {app} from "./app";

export default {
  fetch: app.fetch,
  hostname: process.env.HOSTNAME,
};
