const express = require('express');
const teacherProgressRouter = express.Router();

const { requireUser } = require("../utils")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<-----------------GET ALL STUDNET'S PROGRESS FOR A LESSON----------------->
teacherProgressRouter.get("/progress", requireUser, async (req, res, next) => {
    try {
        const teacher = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                classes: {
                    include: {
                        students: {
                            include: {
                                studentProgress: {
                                    include: {
                                        combinedObjective: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        const progress = teacher.classes.
            flatMap((className) => className.students)
        // Array to hold combinedObjectives average data
        let combinedObjectivesArray = [];
        // Loop through each student
        progress.forEach((student) => {
            // Loop through each progress of the student
            student.studentProgress.forEach((progress) => {
                const combinedObjectiveId = progress.combinedObjective.id;
                const progressPercent = progress.progressPrecent;
                // Check if the objective already exists in the combinedObjectivesArray
                const existingObjective = combinedObjectivesArray.find((objective) => objective.combinedObjectiveId === combinedObjectiveId);
                // If it already exists, add the progressPercent to that objective
                if (existingObjective) {
                    existingObjective.progress.push(progressPercent);
                }
                // If not, make a new one with the id, the progress percent, and the objective name (the data that should be returned)
                else {
                    combinedObjectivesArray.push({
                        combinedObjectiveId,
                        progress: [progressPercent],
                        objectiveName: progress.combinedObjective.objectiveName
                    });
                }
            });
        });
        //Find the average from the combinedObjectivesArray
        //Loop through each objective in the combinedObjectivesArray array
        combinedObjectivesArray.forEach((objective) => {
            let totalProgress = 0;
            //Loop through the progress part of the data and add all the values together
            for (let i = 0; i < objective.progress.length; i++) {
                totalProgress = totalProgress + objective.progress[i];
            }
            //Make a new average property and assign it the average
            objective.average = totalProgress / objective.progress.length;
        });

        res.send({ progress, averageObjectives: combinedObjectivesArray })
    } catch (error) {
        next(error);
    }
});
//<-----------------POST STUDNET'S PROGRESS IN AN OBJECTIVE----------------->
teacherProgressRouter.post('/studentProgress', requireUser, async (req, res, next) => {
    const { studentId, objectiveId, progressPercent, combinedObjectiveId } = req.body;
    try {
        const newStudentProgress = await prisma.studentProgress.create({
            data: {
                student: { connect: { id: studentId } },
                learningObjective: { connect: { id: objectiveId } },
                progressPrecent: progressPercent,
                combinedObjective: { connect: { id: combinedObjectiveId } }
            }
        });
        res.send(newStudentProgress);
    } catch (error) {
        next(error);
    }
});
//<-----------------DELETE STUDENT'S PROGRESS----------------->
teacherProgressRouter.delete("/delete_progress/:id", requireUser, async (req, res, next) => {
    try {
        const deleteProgress = await prisma.studentProgress.delete({
            where: { id: Number(req.params.id) },
        });
        if (!deleteProgress) {
            return res.status(404).send("Student progress not found!");
        }
        res.send({ deleteProgress, message: "Deleted!" });
    } catch (error) {
        next(error);
    }
});
//<-----------------UPDATE STUDENT'S PROGRESS----------------->
teacherProgressRouter.patch("/attendance", requireUser, async (req, res, next) => {
    try {
        const { studentId, lessonId, attendance } = req.body;
        let attendanceRecord = await prisma.attendance.findFirst({
            where: { studentId: studentId, lessonId: lessonId }
        });
        if (attendanceRecord) {
            const updatedAttendance = await prisma.attendance.update({
                where: { id: attendanceRecord.id },
                data: { present: attendance }
            });
            res.send({ updatedAttendance, message: "Attendance updated!" });
        } else {
            const newAttendance = await prisma.attendance.create({
                data: {
                    present: attendance,
                    student: { connect: { id: studentId } },
                    lesson: { connect: { id: lessonId } }
                }
            });
            res.send({ newAttendance, message: "New attendance created!" });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = teacherProgressRouter;