const express = require('express');
const teacherLessonRouter = express.Router();

const { requireUser } = require("../utils")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<-----------------ADD A LESSON----------------->
teacherLessonRouter.post("/lesson", requireUser, async (req, res, next) => {
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
teacherLessonRouter.get("/lessons", requireUser, async (req, res, next) => {
    try {
        const teacher = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                classes: {
                    include: {
                        lessons: {
                            include: {
                                learningObjectives: {
                                    include: { combinedObjective: true }
                                },
                                class: true
                            }
                        }
                    }
                }
            }
        })
        const classes = teacher.classes
        res.send(classes);
    } catch (error) {
        next(error)
    }
});
//<-----------------GET A SINGLE LESSON----------------->
teacherLessonRouter.get("/lesson/:id", requireUser, async (req, res, next) => {
    try {
        const lesson = await prisma.lesson.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                class: {
                    include: {
                        students: {
                            include: {
                                attendances: {
                                    where: {
                                        lessonId: Number(req.params.id)
                                    }
                                },
                                studentProgress: {
                                    include: {
                                        learningObjective: true
                                    }
                                }
                            }
                        }
                    },
                },
                learningObjectives: {
                    where: { lessonId: Number(req.params.id) }
                }
            },
        });
        lesson.class.students.forEach((student) => {
            student.studentProgress = student.studentProgress.filter((progress) => {
                return lesson.learningObjectives.some((objective) => {
                    return objective.id === progress.objectiveId;
                });
            });
        });
        // Sort students in alphabetical order...
        lesson.class.students.sort((a, b) => a.name.localeCompare(b.name));
        res.send(lesson);
    } catch (error) {
        next(error)
    }
});
//<-----------------DELETE A LESSON----------------->
teacherLessonRouter.delete("/delete_lesson/:id", requireUser, async (req, res, next) => {
    try {
        const deleteLesson = await prisma.lesson.delete({
            where: { id: Number(req.params.id) },
        });
        if (!deleteLesson) {
            return res.status(404).send("Lesson not found!");
        }
        res.send({ deleteLesson, message: "Deleted!" });
    } catch (error) {
        next(error);
    }
});


module.exports = teacherLessonRouter;