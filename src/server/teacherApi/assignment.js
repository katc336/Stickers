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
//<-----------------DELETE AN ASSIGNMENT----------------->
teacherAssignmentRouter.delete("/delete_assignment/:id", requireUser, async (req, res, next) => {
    try {
        const deleteAssignment = await prisma.assignment.delete({
            where: { id: Number(req.params.id) },
        });
        if (!deleteAssignment) {
            return res.status(404).send("Assignment not found!");
        }
        res.send({ deleteAssignment, message: "Deleted!" });
    } catch (error) {
        next(error);
    }
});


module.exports = teacherAssignmentRouter;