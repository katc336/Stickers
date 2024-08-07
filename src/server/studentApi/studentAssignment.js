
const express = require('express');
const studentAssignmentRouter = express.Router();

const { requireStudent } = require("./utils")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<-----------------ADD PROFILE IMAGE----------------->
studentAssignmentRouter.post("/new_submission", requireStudent, async (req, res, next) => {
    const { name, content, assignmentId, studentId  } = req.body;
    try {
        const newSubmission = await prisma.submission.create({
            data: {
                name: name,
                content: content,
                assignment: { connect: { id: assignmentId } },
                student: { connect: { id: studentId } },
            }
        });
        res.send(newSubmission);
    } catch (error) {
        next(error);
    }
});


module.exports = studentAssignmentRouter;