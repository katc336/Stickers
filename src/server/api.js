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
//<-----------------GET SINGLE CLASS----------------->
apiRouter.get("/my_classes/:id", requireUser, async (req, res, next) => {
    try {
        const myClass = await prisma.class.findUnique({
            where: { id: Number(req.params.id) },
        })
        res.send(myClass)
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
apiRouter.post("/add_student", requireUser, async (req, res, next) => {
    try {
        const { name, id } = req.body
        const newStudent = await prisma.student.create({
            data: {
                name: name,
                class: { connect: { id: id } }
            }
        })
        res.send(newStudent)
    } catch (error) {
        next(error);
    }
});
//<-----------------GET ALL STUDNETS----------------->
apiRouter.get("/class/:id/students", requireUser, async (req, res, next) => {
    try {
        const classes = await prisma.student.findMany({
            where: { classId: Number(req.params.id) }
        })
        res.send(classes)
    } catch (error) {
        next(error)
    }
});
//<-----------------GET SINGLE STUDNET----------------->
apiRouter.get("/student/:id", requireUser, async (req, res, next) => {
    try {
        const student = await prisma.student.findUnique({
            where: { id: Number(req.params.id) }
        })
        res.send(student)
    } catch (error) {
        next(error)
    }
});
//<-----------------ADD A LESSON----------------->
apiRouter.post("/class/:id/lesson", requireUser, async (req, res, next) => {
    try {
        const myClass = await prisma.class.findUnique({
            where: { id: Number(req.params.id) }
        })
        const { lessonName } = req.body
        const lesson = await prisma.lesson.create({
            data: {
                lessonName: lessonName,
                class: { connect: { id: myClass.id } }
            }
        })
        res.send(lesson)
    } catch (error) {
        next(error)
    }
});
//<-----------------GET ALL LESSONS----------------->
apiRouter.get("/lessons", requireUser, async (req, res, next) => {
    try {
        const classes = await prisma.class.findMany({
            where: { teacherId: req.user.id }
        })
        res.send(classes)
    } catch (error) {
        next(error)
    }
});
//<-----------------GET A SINGLE LESSON----------------->
apiRouter.get("/lesson/:id", requireUser, async (req, res, next) => {
    try {
        const lesson = await prisma.class.findUnique({
            where: { id: Number(req.params.id) }
        })
        res.send(lesson)
    } catch (error) {
        next(error)
    }
});
//<-----------------ADD AN OBJECTIVE----------------->
apiRouter.post("/lesson/:id/objective", requireUser, async (req, res, next) => {
    try {
        const myLesson = await prisma.lesson.findUnique({
            where: { id: Number(req.params.id) }
        });

        if (!myLesson) {
            return res.status(404).json({ error: "Lesson not found" });
        }

        const { objectiveName } = req.body;
        const lesson = await prisma.learningObjective.create({
            data: {
                objectiveName: objectiveName,
                lesson: { connect: { id: myLesson.id } }
            }
        });

        res.send(lesson);
    } catch (error) {
        next(error);
    }
});
//<-----------------GET ALL OBJECTIVES----------------->
apiRouter.get("/lesson/:id/objective", requireUser, async (req, res, next) => {
    try {
        const lesson = await prisma.class.findUnique({
            where: { id: Number(req.params.id) }
        })
        const objective = await prisma.learningObjective.findMany({
            where: { lessonId: lesson.id }
        })
        res.send(objective)
    } catch (error) {
        next(error)
    }
});
//<-----------------GET A SINGLE OBJECTIVE----------------->
apiRouter.get("/lesson/objective/:id", requireUser, async (req, res, next) => {
    try {
        const lesson = await prisma.learningObjective.findUnique({
            where: { id: Number(req.params.id) }
        })
        res.send(lesson)
    } catch (error) {
        next(error)
    }
});

module.exports = apiRouter;