const express = require('express');
const apiRouter = express.Router();

const { requireUser } = require("./utils")

const { PrismaClient } = require("@prisma/client");
const { recipeBookItem, recipeBook, level, userPostedRecipe } = require('./client');
const prisma = new PrismaClient();

module.exports = apiRouter;