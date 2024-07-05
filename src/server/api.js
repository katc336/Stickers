const express = require('express');
const apiRouter = express.Router();

const { requireUser, requireParent, requireStudent } = require("./utils")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<-----------------ADD PROFILE IMAGE----------------->
apiRouter.patch("/add_profile", requireUser, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const { profileImg } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                profile: profileImg
            }
        });
        delete updatedUser.password;
        res.json({ message: "Profile image added successfully" });
    } catch (error) {
        next(error);
    }
});
//<-----------------GET ALL CLASSES----------------->
apiRouter.get("/my_classes", requireUser, async (req, res, next) => {
    try {
        const classes = await prisma.class.findMany({
            where: { teacherId: req.user.id },
            include: {
                students: true,
                lessons: {
                    include: { Assignment: true }
                }
            }
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
                students: {
                    include: {
                        studentProgress: true
                    }
                },
                lessons: true
            }
        })
        // average progress for all of student's progress...
        myClass.students.forEach((student) => {
            let totalProgress = 0;
            student.studentProgress.forEach((progress) => {
                totalProgress = totalProgress + progress.progressPrecent;
            });
            const averagedAllProgress = totalProgress / student.studentProgress.length;
            student.averagedAllProgress = averagedAllProgress;
        });
        // Sort students in alphabetical order...
        myClass.students.sort((a, b) => a.name.localeCompare(b.name));

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
    const generateParentCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = "";
        for (let i = 0; i < 8; i++) {
            code = code + characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }
    const generateStudentCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = "";
        for (let i = 0; i < 8; i++) {
            code = code + characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }
    try {
        const { name, id } = req.body;
        studentCode = generateParentCode();
        parentCode = generateStudentCode();
        const newStudent = await prisma.student.create({
            data: {
                name: name,
                class: { connect: { id: id } },
                studentCode: studentCode,
                parentCode: parentCode
            }
        });
        res.send(newStudent);
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
apiRouter.get("/students/average-objectives", requireUser, async (req, res, next) => {
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
//<-----------------GET SINGLE STUDNET WITH AVERAGE FOR OBJECTIVES----------------->
apiRouter.get("/student/:id", requireUser, async (req, res, next) => {
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
apiRouter.get("/lesson/:id", requireUser, async (req, res, next) => {
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


//<-----------------ADD A LESSON OBJECTIVE----------------->
apiRouter.post("/objective", requireUser, async (req, res, next) => {
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
        const objectives = teacher.classes.
            flatMap((className) => className.lessons.
                flatMap((lesson) => lesson.learningObjectives))

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
//<-----------------GET ALL STUDNET'S PROGRESS FOR A LESSON----------------->
apiRouter.get("/progress", requireUser, async (req, res, next) => {
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
apiRouter.post('/studentProgress', requireUser, async (req, res, next) => {
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
//<-----------------DELETE A CLASS----------------->
apiRouter.delete("/delete_class/:id", requireUser, async (req, res, next) => {
    try {
        const deleteClass = await prisma.class.delete({
            where: { id: Number(req.params.id) },
        });
        if (!deleteClass) {
            return res.status(404).send("Class not found!");
        }
        res.send({ deleteClass, message: "Deleted!" });
    } catch (error) {
        next(error);
    }
});
//<-----------------DELETE A STUDNET----------------->
apiRouter.delete("/delete_student/:id", requireUser, async (req, res, next) => {
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
//<-----------------DELETE A LESSON----------------->
apiRouter.delete("/delete_lesson/:id", requireUser, async (req, res, next) => {
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
//<-----------------DELETE AN OBJECTIVE----------------->
apiRouter.delete("/delete_objective/:id", requireUser, async (req, res, next) => {
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
//<-----------------DELETE STUDENT'S PROGRESS----------------->
apiRouter.delete("/delete_progress/:id", requireUser, async (req, res, next) => {
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
apiRouter.patch("/attendance", requireUser, async (req, res, next) => {
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
//<-----------------POST AN ASSIGNMENT----------------->
apiRouter.post('/new_assignment', requireUser, async (req, res, next) => {
    const { name, task, dueDate, classId, lessonId } = req.body;
    try {
        const newAssignment = await prisma.assignment.create({
            data: {
                name: name,
                task: task,
                dueDate: dueDate,
                class: { connect: { id: classId } },
                lesson: { connect: { id: lessonId } },
            }
        });
        res.send(newAssignment);
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;