/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

const middleware = jsonServer.defaults();

server.use(middleware);

server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  setTimeout(next, 2000);
});

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.post("/products/", (req, res, next) => {
  const error = validateProduct(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.name);
    setTimeout(next, 2000);
  }
});

server.put("/products/:slug", (req, res, next) => {
  const error = validateProduct(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    setTimeout(next, 2000);
  }
});

server.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function validateProduct(product) {
  if (!product.name) return "Name is Required.";
  if (!product.description) return "Description is Required.";
  if (!product.category) return "Category is Required.";
  return "";
}
