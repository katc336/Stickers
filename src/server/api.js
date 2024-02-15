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
            include: {
                students: true,
                lessons: true
            }
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
//<-----------------GET ALL STUDNETS FOR A TEACHER----------------->
apiRouter.get("/my_students", requireUser, async (req, res, next) => {
    try {
        const teacher = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                classes: {
                    include: {
                        students: true
                    }
                }
            }
        })
        //take the students from the classes at flatten them into a single array
        const students = teacher.classes.flatMap((classes) => classes.students)
        res.send(students)
    } catch (error) {
        next(error)
    }
});

//<-----------------GET ALL STUDNETS FOR A CLASS----------------->
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
apiRouter.post("/lesson", requireUser, async (req, res, next) => {
    try {
        const { lessonName, id } = req.body
        const lesson = await prisma.lesson.create({
            data: {
                lessonName: lessonName,
                class: { connect: { id: id } }
            }
        })
        res.send(lesson)
    } catch (error) {
        next(error)
    }
});
//<-----------------GET ALL LESSONS PER TEACHER----------------->
apiRouter.get("/lessons", requireUser, async (req, res, next) => {
    try {
        const teacher = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                classes: {
                    include: {
                        lessons: true
                    }
                }
            }
        })
        // take the lessons from the classes and flatten them into a single array
        const lessons = teacher.classes.flatMap((className) => className.lessons)
        res.send(lessons);
    } catch (error) {
        next(error)
    }
});

//<-----------------GET A SINGLE LESSON----------------->
apiRouter.get("/lesson/:id", requireUser, async (req, res, next) => {
    try {
        const lesson = await prisma.lesson.findUnique({
            where: { id: Number(req.params.id) }
        })
        res.send(lesson)
    } catch (error) {
        next(error)
    }
});
//<-----------------ADD AN OBJECTIVE----------------->
apiRouter.post("/objective", requireUser, async (req, res, next) => {
    try {
        const { objectiveName, id } = req.body;
        const lesson = await prisma.learningObjective.create({
            data: {
                objectiveName: objectiveName,
                lesson: { connect: { id: id } }
            }
        });
        res.send(lesson);
    } catch (error) {
        next(error);
    }
});
//<-----------------GET ALL OBJECTIVES FOR A TEACHER----------------->
apiRouter.get("/my_lesson-objecives", requireUser, async (req, res, next) => {
    try {
        const teacher = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                classes: {
                    include: {
                        lessons: {
                            include: {
                                learningObjectives: true
                            }
                        }
                    }
                }
            }
        })
        //take the lessons from the classes, and the objectives from the lessons and flatten them into a single array
        const objectives = teacher.classes.flatMap((className) => className.lessons.flatMap((lesson) => lesson.learningObjectives))

        res.send(objectives)
    } catch (error) {
        next(error)
    }
});

//<-----------------GET ALL OBJECTIVES BY LESSON----------------->
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