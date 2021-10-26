const express = require("express");
const loggerMiddleWare = require("morgan");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const authRouter = require("./routers/auth");
const authMiddleWare = require("./auth/middleware");
const { user, artwork, bid } = require("./models");

const app = express();
/**
 * Middlewares: DO NOT REGISTER ANY ROUTERS BEFORE THE MIDDLEWARES
 *
 * It is advisable to configure your middleware before configuring the routes
 * If you configure routes before the middleware, these routes will not use them
 *
 */

/**
 *
 * cors middleware:
 *
 * Since our api is hosted on a different domain than our client
 * we are are doing "Cross Origin Resource Sharing" (cors)
 * Cross origin resource sharing is disabled by express by default
 * for safety reasons (should everybody be able to use your api, I don't think so!)
 *
 * We are configuring cors to accept all incoming requests
 * If you want to limit this, you can look into "white listing" only certain domains
 *
 * docs: https://expressjs.com/en/resources/middleware/cors.html
 *
 */

app.use(corsMiddleWare());

/**
 * morgan:
 *
 * simple logging middleware so you can see
 * what happened to your request
 *
 * example:
 *
 * METHOD   PATH        STATUS  RESPONSE_TIME   - Content-Length
 *
 * GET      /           200     1.807 ms        - 15
 * POST     /echo       200     10.251 ms       - 26
 * POST     /puppies    404     1.027 ms        - 147
 *
 * github: https://github.com/expressjs/morgan
 *
 */

app.use(loggerMiddleWare("dev"));

/**
 *
 * express.json():
 * be able to read request bodies of JSON requests
 * a.k.a. body-parser
 * Needed to be able to POST / PUT / PATCH
 *
 * docs: https://expressjs.com/en/api.html#express.json
 *
 */

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

/**
 *
 * delay middleware
 *
 * Since our api and client run on the same machine in development mode
 * the request come in within milliseconds
 * To simulate normal network traffic this simple middleware delays
 * the incoming requests by 1500 second
 * This allows you to practice with showing loading spinners in the client
 *
 * - it's only used when you use npm run dev to start your app
 * - the delay time can be configured in the package.json
 */

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

/**
 * Routes
 *
 * DEFINE YOUR ROUTES AFTER THIS MESSAGE (now that middlewares are configured)
 */

// GET endpoint to list all artworks
app.get("/", async (req, res, next) => {
  try {
    const artworks = await artwork.findAll({
      include: { model: bid },
    });
    res.send(artworks.map((artwork) => artwork.toJSON()));
  } catch (e) {
    next(e);
  }
});
// get details of a specified artwork
app.get("/artworks/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const artworkDetails = await artwork.findByPk(parseInt(id), {
      include: { model: bid },
    });
    console.log("details", artworkDetails.toJSON());
    res.status(200).send(artworkDetails.toJSON());
  } catch (e) {
    next(e);
  }
});
// increase amount of hearts of an artwork
app.patch("/artworks/:id/hearts/:h", async (req, res, next) => {
  try {
    const { id, h } = req.params;
    const updateArtwork = await artwork.findByPk(id);
    const hearts = await updateArtwork.update({ hearts: h });
    res.status(200).send(updateArtwork);
  } catch (e) {
    next(e);
  }
});
// create a bid
app.post("/artworks/:id/bid", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, amount, artworkId } = req.body;
    const newBid = await bid.create({
      email,
      amount,
      artworkId,
    });
    res.status(200).send(newBid.dataValues);
    console.log(newBid.dataValues);
  } catch (e) {
    next(e);
  }
});

app.post("/auction/:userId", async (req, res) => {
  const { title, imageUrl, minimumBid } = req.body;
  const { userId } = req.params;

  if (!title || !imageUrl || !minimumBid) {
    return res
      .status(400)
      .send("Please provide an title, imageUrl and a minimum bid");
  }
  try {
    console.log(`before\n`);
    const newArtwork = await artwork.create({
      title,
      userId,
      imageUrl,
      minimumBid,
    });    
    res.status(201).send(newArtwork.dataValues);    
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// POST endpoint which requires a token for testing purposes, can be removed
app.post("/authorized_post_request", authMiddleWare, (req, res) => {
  // accessing user that was added to req by the auth middleware
  const user = req.user;
  // don't send back the password hash
  delete user.dataValues["password"];

  res.json({
    youPosted: {
      ...req.body,
    },
    userFoundWithToken: {
      ...user.dataValues,
    },
  });
});

app.use("/", authRouter);

// Listen for connections on specified port (default is port 4000)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
