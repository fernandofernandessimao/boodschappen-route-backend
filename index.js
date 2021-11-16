const express = require("express");
const loggerMiddleWare = require("morgan");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const authRouter = require("./routers/auth");
const authMiddleWare = require("./auth/middleware");
const {
  category,
  product,
  list,
  productList,
  supermarketCategory,
} = require("./models");
const Sequelize = require("sequelize");
const { default: Axios } = require("axios");

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

// return all products
app.get("/products", async (req, res, next) => {
  try {
    const products = await product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.status(200).send(products.map((product) => product.toJSON()));
  } catch (e) {
    next(e);
  }
});

// return all categories
app.get("/categories", authRouter, async (req, res, next) => {
  try {
    const categories = await category.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).send(categories.map((category) => category.toJSON()));
  } catch (e) {
    next(e);
  }
});

// delete productlist with specified id
app.delete("/productlist/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const [deleteProductLists, deleteLists] = await Promise.all([
      productList.findAll({ where: { listId: id } }),
      list.findAll({ where: { id } }),
    ]);

    await deleteProductLists.forEach((p) => p.destroy());
    await deleteLists.forEach((p) => p.destroy());
    res.status(200).send({
      message: `ALl productlists and lists with id ${id} were deleted`,
    });
  } catch (e) {
    next(e);
  }
});

// return all productlist with specified id
app.get("/productlist/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const lists = await productList.findAll({
      order: [["id", "ASC"]],
      where: { listId: id },
      // attributes: ["productId", [Sequelize.fn("count", Sequelize.col("productId")), "count"]],
      // group: ["productList.productId"],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: product,
        include: [list],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });

    const onlyProducts = lists.map((list) => list.product.dataValues);

    // [{}, {}, {}, {}]

    const productsWithQuantity = onlyProducts.reduce((acc, product) => {
      // need to check if the new product is already in the array
      // if he's not => add to array with quantity 1
      // if he is in the array => +1 quantity

      const isInArray = acc.find((p) => p.id === product.id);

      if (isInArray) {
        return acc.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...acc, { ...product, quantity: 1 }];
      }
    }, []);

    console.log(productsWithQuantity);

    res.status(200).send(productsWithQuantity);
  } catch (e) {
    next(e);
  }
});

// return all productlists
app.get("/productlists/", async (req, res, next) => {
  try {
    const productlists = await productList.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: product,
        attributes: { exclude: ["id", "listId", "createdAt", "updatedAt"] },
      },
    });

    res.status(200).send(productlists);
  } catch (e) {
    next(e);
  }
});

app.get("/supermarket/:id/categories", async (req, res, next) => {
  try {
    const { id } = req.params;
    const listCategories = await supermarketCategory.findAll({
      order: [["id", "ASC"]],
      where: { supermarketId: id },
      include: { model: category },
    });

    res.status(200).send(listCategories);
  } catch (e) {
    next(e);
  }
});

app.patch("/productlist/:listId/:productId/:update", async (req, res, next) => {
  const { listId, productId, update } = req.params;
  try {
    // increase quantity by creating a new productList
    if (update === "true") {
      console.log("increasing");
      const increaseQuantityProduct = await productList.create({
        productId,
        listId,
      });

      res.status(200).send(await updateProduct(listId, productId));
    } else {
      console.log("deleting");
      const decreaseQuantityProduct = await productList.findOne({
        where: { listId, productId },
      });
      await decreaseQuantityProduct.destroy();

      res.status(200).send(await updateProduct(listId, productId));
    }

    // console.log(productsWithQuantity);

    // res.status(200).send(productsWithQuantity);
  } catch (e) {
    next(e);
  }
});

// return all lists
app.get("/lists/:userId", authRouter, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const lists = await list.findAll({
      where: { userId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: product,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        through: { attributes: ["id"] },
      },
    });
    res.status(200).send(lists.map((list) => list.toJSON()));
  } catch (e) {
    next(e);
  }
});

// return specified list
app.get("/list/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const findList = await list.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: product,
        attributes: { exclude: ["createdAt", "updatedAt", "position"] },
        through: { attributes: ["id"] },
      },
    });
    res.status(200).send(findList.toJSON());
  } catch (e) {
    next(e);
  }
});

// create a productlist
app.post("/productlist/:user", async (req, res, next) => {
  try {
    const { myShoppingList } = req.body;
    const { user } = req.params;
    console.log("request", myShoppingList);
    //creating a new list to associate to the user
    const new_list = await list.create({
      userId: user,
      total: 0,
    });
    const list_id = new_list.dataValues.id;
    // mapping the array to create a productlist for each of them
    const createShoppingList = async () =>
      myShoppingList.forEach((element) => {
        productList.create({
          productId: element.value,
          listId: list_id,
        });
      });
    createShoppingList();
    res.status(200).send("createShoppingList");
  } catch (e) {
    next(e);
  }
});

// end of testig ending points

// // get details of a specified artwork
// app.get("/artworks/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const artworkDetails = await artwork.findByPk(parseInt(id), {
//       include: { model: bid },
//     });
//     console.log("details", artworkDetails.toJSON());
//     res.status(200).send(artworkDetails.toJSON());
//   } catch (e) {
//     next(e);
//   }
// });
// // increase amount of hearts of an artwork
// app.patch("/artworks/:id/hearts/:h", async (req, res, next) => {
//   try {
//     const { id, h } = req.params;
//     const updateArtwork = await artwork.findByPk(id);
//     const hearts = await updateArtwork.update({ hearts: h });
//     res.status(200).send(updateArtwork);
//   } catch (e) {
//     next(e);
//   }
// });
// // create a bid
// app.post("/artworks/:id/bid", authMiddleWare, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { email, amount, artworkId } = req.body;
//     const newBid = await bid.create({
//       email,
//       amount,
//       artworkId,
//     });
//     res.status(200).send(newBid.dataValues);
//     console.log(newBid.dataValues);
//   } catch (e) {
//     next(e);
//   }
// });

// app.post("/auction/:userId", authMiddleWare, async (req, res) => {
//   const { title, imageUrl, minimumBid } = req.body;
//   const { userId } = req.params;

//   if (!title || !imageUrl || !minimumBid) {
//     return res
//       .status(400)
//       .send("Please provide an title, imageUrl and a minimum bid");
//   }
//   try {
//     const newArtwork = await artwork.create({
//       title,
//       userId,
//       imageUrl,
//       minimumBid,
//     });
//     res.status(201).send(newArtwork.dataValues);
//   } catch (error) {
//     if (error.name === "SequelizeUniqueConstraintError") {
//       return res
//         .status(400)
//         .send({ message: "There is an existing account with this email" });
//     }

//     return res.status(400).send({ message: "Something went wrong, sorry" });
//   }
// });

// // POST endpoint which requires a token for testing purposes, can be removed
// app.post("/authorized_post_request", authMiddleWare, (req, res) => {
//   // accessing user that was added to req by the auth middleware
//   const user = req.user;
//   // don't send back the password hash
//   delete user.dataValues["password"];

//   res.json({
//     youPosted: {
//       ...req.body,
//     },
//     userFoundWithToken: {
//       ...user.dataValues,
//     },
//   });
// });

app.use("/", authRouter);

// Listen for connections on specified port (default is port 4000)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const updateProduct = async (listId, productId) => {
  // logic must be here
  const list = await productList.findAll({
    where: { listId, productId },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: product,
      attributes: { exclude: ["listId", "createdAt", "updatedAt"] },
    },
  });

  const onlyProducts = list.map((list) => list.product.dataValues);

  // [{}, {}, {}, {}]

  // reduce function always return an array with object(s) so in your thunk should access index 0 in case of just one object
  const productsWithQuantity = onlyProducts.reduce((acc, product) => {
    // need to check if the new product is already in the array
    // if he's not => add to array with quantity 1
    // if he is in the array => +1 quantity

    const isInArray = acc.find((p) => p.id === product.id);

    if (isInArray) {
      return acc.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      return [...acc, { ...product, quantity: 1 }];
    }
  }, []);
  console.log(productsWithQuantity.length);
  return productsWithQuantity;
};
