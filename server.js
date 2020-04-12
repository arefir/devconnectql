const express = require("express");
const graphqlHTTP = require("express-graphql");
const connectDB = require("./config/db");
const authenticator = require("./middleware/authenticator");

const schema = require("./graphQL/schema/index");
const rootValue = require("./graphQL/resolver/index");

const app = express();

//Init Middleware
app.use(express.json({ extended: false }));

//Connect to MongoDB
connectDB();

//Auth Middleware
app.use(authenticator);

//graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  })
);

//app.get("/", (req, res) => res.send("API Running"));

//Define routes
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/profile", require("./routes/api/profile"));
// app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
