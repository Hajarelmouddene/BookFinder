//separate app and server to prevent Jest error: app.listen is keeping Jest
//from exiting (open handle).

require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
