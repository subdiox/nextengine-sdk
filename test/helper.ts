import path from "path";

require("dotenv").config({
  silent: true,
  path: path.join(__dirname, "..", ".env"),
});
