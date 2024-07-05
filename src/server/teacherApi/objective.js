const express = require('express');
const teacherObjectiveRouter = express.Router();

const { requireUser } = require("../utils")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<-----------------ADD A LESSON OBJECTIVE----------------->
teacherObjectiveRouter.post("/objective", requireUser, async (req, res, next) => {
    try {
        const { objectiveName, id } = req.body;
        const combinedObjective = await prisma.combinedObjective.findUnique({
            where: {
                objectiveName: objectiveName,
            }
        });
        if (combinedObjective) {
            const objective = await prisma.learningObjective.create({
                data: {
                    objectiveName: objectiveName,
                    lesson: { connect: { id: id } },
                    combinedObjective: { connect: { id: combinedObjective.id } }
                }
            });
            res.send(objective);
        } else {
            const newCombinedObjective = await prisma.combinedObjective.create({
                data: {
                    objectiveName: objectiveName
                }
            });
            const objective = await prisma.learningObjective.create({
                data: {
                    objectiveName: objectiveName,
                    lesson: { connect: { id: id } },
                    combinedObjective: { connect: { id: newCombinedObjective.id } }
                }
            });
            res.send({ objective, combinedObjectiveId: newCombinedObjective.id });
        }
    } catch (error) {
        next(error);
    }
});
//<-----------------GET ALL OBJECTIVES FOR A TEACHER----------------->
teacherObjectiveRouter.get("/my_lesson-objecives", requireUser, async (req, res, next) => {
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
        const objectives = teacher.classes.
            flatMap((className) => className.lessons.
                flatMap((lesson) => lesson.learningObjectives))

        res.send(objectives)
    } catch (error) {
        next(error)
    }
});
//<-----------------GET ALL OBJECTIVES BY LESSON----------------->
teacherObjectiveRouter.get("/lesson/:id/objective", requireUser, async (req, res, next) => {
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
teacherObjectiveRouter.get("/lesson/objective/:id", requireUser, async (req, res, next) => {
    try {
        const lesson = await prisma.learningObjective.findUnique({
            where: { id: Number(req.params.id) }
        })
        res.send(lesson)
    } catch (error) {
        next(error)
    }
});
//<-----------------DELETE AN OBJECTIVE----------------->
teacherObjectiveRouter.delete("/delete_objective/:id", requireUser, async (req, res, next) => {
    try {
        const deleteObjective = await prisma.learningObjective.delete({
            where: { id: Number(req.params.id) },
        });
        if (!deleteObjective) {
            return res.status(404).send("Learning objective not found!");
        }
        res.send({ deleteObjective, message: "Deleted!" });
    } catch (error) {
        next(error);
    }
});
module.exports = teacherObjectiveRouter;