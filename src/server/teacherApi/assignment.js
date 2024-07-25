const express = require('express');
const teacherAssignmentRouter = express.Router();

const { requireUser } = require("../utils")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<-----------------POST AN ASSIGNMENT----------------->
teacherAssignmentRouter.post('/new_assignment', requireUser, async (req, res, next) => {
    const { name, task, dueDate, dueTime, classId, lessonId } = req.body;
    try {
        const newAssignment = await prisma.assignment.create({
            data: {
                name: name,
                task: task,
                dueDate: dueDate,
                dueTime: dueTime,
                class: { connect: { id: classId } },
                lesson: { connect: { id: lessonId } },
            }
        });
        res.send(newAssignment);
    } catch (error) {
        next(error);
    }
});


module.exports = teacherAssignmentRouter;