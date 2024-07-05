const express = require('express');
const teacherStudentsRouter = express.Router();

const { requireUser } = require("../utils")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//<-----------------GET ALL STUDNETS FOR A TEACHER----------------->
teacherStudentsRouter.get("/my_students", requireUser, async (req, res, next) => {
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
                                        learningObjective: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        //take the students from the classes at flatten them into a single array
        const students = teacher.classes.flatMap((classes) => classes.students)

        // average progress for all of student's progress...
        students.forEach(student => {
            let totalProgress = 0;
            student.studentProgress.forEach(progress => {
                totalProgress = totalProgress + progress.progressPrecent;
            });
            const averagedAllProgress = totalProgress / student.studentProgress.length;
            student.averagedAllProgress = averagedAllProgress;
        });
        // Sort students in alphabetical order...
        students.sort((a, b) => a.name.localeCompare(b.name));

        res.send(students)
    } catch (error) {
        next(error)
    }
});
//<-----------------GET AVERAGE OF ALL STUDENTS FOR OBJECTIVES----------------->
teacherStudentsRouter.get("/students/average-objectives", requireUser, async (req, res, next) => {
    try {
        const students = await prisma.student.findMany({
            include: {
                studentProgress: {
                    include: {
                        combinedObjective: true
                    }
                }
            }
        });
        // Array to hold combinedObjectives average data
        let combinedObjectivesArray = [];
        // Loop through each student
        students.forEach((student) => {
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
        res.send({ averageObjectives: combinedObjectivesArray });
    } catch (error) {
        next(error);
    }
});
//<-----------------GET ALL STUDNETS FOR A CLASS----------------->
teacherStudentsRouter.get("/class/:id/students", requireUser, async (req, res, next) => {
    try {
        const classes = await prisma.student.findMany({
            where: { classId: Number(req.params.id) }
        })
        res.send(classes)
    } catch (error) {
        next(error)
    }
});
//<-----------------GET SINGLE STUDNET WITH AVERAGE FOR OBJECTIVES----------------->
teacherStudentsRouter.get("/student/:id", requireUser, async (req, res, next) => {
    try {
        const student = await prisma.student.findUnique({
            where: { id: Number(req.params.id) },
            include: {
                studentProgress: {
                    include: {
                        combinedObjective: true,
                    }
                },
                class: true,
                attendances: true
            }
        });
        // Array to hold combinedObjectives average data
        let combinedObjectivesArray = [];
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
        //Find the average from the combinedObjectives array 
        //Loop through each objective in the combinedObjectivesArray array.
        combinedObjectivesArray.forEach((objective) => {
            let totalProgress = 0;
            //Loop through the progress part of the data and add all the values together
            for (let i = 0; i < objective.progress.length; i++) {
                totalProgress = totalProgress + objective.progress[i];
            }
            //Make a new average property and assign it the average
            objective.average = totalProgress / objective.progress.length;
        });
        res.send({ student, averageObjectives: combinedObjectivesArray });
    } catch (error) {
        next(error);
    }
});
//<-----------------DELETE A STUDNET----------------->
teacherStudentsRouter.delete("/delete_student/:id", requireUser, async (req, res, next) => {
    try {
        const deleteStudent = await prisma.student.delete({
            where: { id: Number(req.params.id) },
        });
        if (!deleteStudent) {
            return res.status(404).send("Student not found!");
        }
        res.send({ deleteStudent, message: "Deleted!" });
    } catch (error) {
        next(error);
    }
});


module.exports = teacherStudentsRouter;