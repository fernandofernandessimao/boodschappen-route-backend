- **[ABOUT](#ABOUT)**
- **[PROJECT](#PROJECT)**
- **[LINKS](#LINKS)**
- **[TECNOLOGIES](#TECNOLOGIES)**
- **[INSTALLATION](#INSTALLATION)**
- **[IMPORTANT](#IMPORTANT!!!)**
- **[ENDPOINTS](#ENDPOINTS)**

# ABOUT ME

Curious by nature and eager to learn. Knowledge it the most valuable asset to me. I love to do things which require thinking and creativity, and programming is one of them. As a frehsly Full Stack Developer graduated, I'm looking forward to explore both backend and frontend programming. 


# PROJECT Shopping list route 

First portfolio project for Full Stack Developer course. This actual version is a conceptual idea, as it needs real data and models from supermarkets or stores. Although conceptual, it can be applied (and actually it is) to any store and warehouse, both for workers and employees. 
As I come from a game programming background, I thought I could create something with a searching algorithm. The true is I got too excited and didn't think all the way through and the actual app is a really simplified version of what I have envisioned. 

# LINKS

Deployed backend version at HEROKU: https://shoppinglist-route.herokuapp.com/

Deployed frontend version at NETLIFY: https://eager-swartz-9988d6.netlify.app/

Taskboard: https://github.com/users/fernandofernandessimao/projects/1

Wireframe conception: https://wireframepro.mockflow.com/view/MVDs12Mz4h#/page/7afbcbdf32054dd9a35100b8339aab5e

Data model: https://dbdiagram.io/d/617bfc4bfa17df5ea6752412

Frontend repository: https://github.com/fernandofernandessimao/boodschappen-route-frontend

# TECNOLOGIES 

Backend: Express, Sequelize, PostgreSQL, Node, REST
Frontend: React, Redux, Axios, Leaflet

# INSTALLATION

Download both backend and frontend repositories. At frontend repository, go to /store/shoppingList/actions.js line 9, and change the URL to https://localhost:4000. Do the same to the line 1 at /src/config/constants.js. Install the dependecies packages with npm i for both repositories. and you are good to run. At the terminal, type npm start.

# IMPORTANT!!!

Create in your database and set it up at /config/config.json line 3. If you don't change it, everyone (including me) is gonna use the same data base and
mess it up.

# ENDPOINTS

  All endpoints require authentication. So you need to use a header sending a valid token.