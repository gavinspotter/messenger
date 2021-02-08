
# messenger

heroku: 

## packages


### server side packages 
server side packages include ... bcryptjs, body-parser, express, jsonwebtoken, mongoose, mongoose-unique-validator, and nodemon.

#### bcryptjs

bcryptjs used to hash or encrypt passwords so people accessing the database aren't able to hack into accounts with the users chosen password.

#### body-parser

body-parser is used as a middleware.

#### express

express is used to create, read, update, and delete data from a database through RESTful api calls.

#### jsonwebtoken

jsonwebtoken is used to provide authentication to a user who is logged in and allows them to stay logged in for a period of one hour.

#### mongoose 

mongoose is used to create schemas in our models folder for the database and to connect to the database in our app.js.

#### mongoose-unique-validator

mongoose-unique-validator is used to create unique validators in the mongoose schema.

#### nodemon

nodemon is used in development to start the server and have it automatically update upon saving in vs code.


### client side packages
client side packages include ... react, react-dom, react-hook-form, and react-router-dom.

#### react

react is used to process things like jsx, context, and hooks

#### react-dom

react-dom is used to import custom hooks to the document object modal.

#### react-hook-form

react-hook-form is used to handle form inputs.

#### react-router-dom

react-router-dom is used to handle routing with components like route, router, switch

## database

user has many messages

user has many message boards

message board has many users

message board has many messages

message has one sender

message has one message board

## side notes:

I implemented http errors (REST)

