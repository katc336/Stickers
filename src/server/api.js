const express = require('express');
const apiRouter = express.Router();

const { requireUser } = require("./utils")

const { PrismaClient } = require("@prisma/client");
const { recipeBookItem, recipeBook, level, userPostedRecipe } = require('./client');
const prisma = new PrismaClient();

//<-----------------GET ALL CLASSES----------------->
apiRouter.get("/my_classes", requireUser, async (req, res, next) => {
    try {
        const classes = await prisma.class.findMany({
            where: { teacherId: req.user.id }
        })
        res.send(classes)
    } catch (error) {
        next(error)
    }
});
//<-----------------ADD A CLASS----------------->
apiRouter.post("/class", requireUser, async (req, res, next) => {
    try {
        const { name } = req.body
        const newClass = await prisma.class.create({
            data: {
                teacher: { connect: { id: req.user.id } },
                name: name
            }
        })
        res.send(newClass)
    } catch (error) {
        next(error)
    }
});
//<-----------------ADD STUDNETS TO A CLASS----------------->
apiRouter.post("/class/:id/add_student", requireUser, async (req, res, next) => {
    try {
        const { name } = req.body
        const id = Number(req.params.id);
        const newStudent = await prisma.student.create({
            data: {
                name: name,
                class: { connect: { classId: id } }
            }
        })
        res.send(newStudent)
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;