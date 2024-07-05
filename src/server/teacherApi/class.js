const express = require('express');
const teacherClassRouter = express.Router();

const { requireUser } = require("../utils")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<-----------------GET ALL CLASSES----------------->
teacherClassRouter.get("/my_classes", requireUser, async (req, res, next) => {
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
teacherClassRouter.get("/my_classes/:id", requireUser, async (req, res, next) => {
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
teacherClassRouter.post("/class", requireUser, async (req, res, next) => {
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
teacherClassRouter.post("/add_student", requireUser, async (req, res, next) => {
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
//<-----------------DELETE A CLASS----------------->
teacherClassRouter.delete("/delete_class/:id", requireUser, async (req, res, next) => {
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

module.exports = teacherClassRouter;