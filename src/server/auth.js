const express = require('express');
const authRouter = express.Router();

const { requireUser, requireParent } = require("./utils")

const jwt = require("jsonwebtoken")

require("dotenv").config();
const { JWT_SECRET } = process.env

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

//<--------------------------------REGISTER USER-------------------------------->
// POST /auth/register
authRouter.post("/register", async (req, res, next) => {
    try {
        const { username, name, password, } = req.body
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
        const user = await prisma.user.create({
            data: {
                name: name,
                username: username,
                password: hashedPassword
            }
        });
        delete user.password
        const token = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SECRET);
        res.send({ token });
        console.log("Registration successful!");
    } catch (error) {
        next(error)
    }
})
//<--------------------------------LOGIN USERS-------------------------------->
//POST /auth/login
authRouter.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await prisma.user.findUnique({
            where: {
                username: username
            },
        });
        const validPassword = await bcrypt.compare(
            password,
            user?.password ?? ""
        );
        //Check user and password
        if (!user) {
            return res.status(401).send("There is no user with that username.");
        } else if (!validPassword) {
            return res.status(401).send("Incorrect password.");
        }
        //Create token
        const token = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SECRET);
        res.send({ token });
        console.log("Login successful!");
    } catch (error) {
        next(error);
    }
})

//<--------------------------------GET USER ACCOUNT-------------------------------->
//GET /auth/my_account
authRouter.get("/account", requireUser, async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });
        delete user.password
        res.send(user);
    } catch (error) {
        next(error)
    }
});
//<--------------------------------REGISTER PARENT-------------------------------->
authRouter.post("/register_parent", async (req, res, next) => {
    try {
        const { username, password, studentCode } = req.body;
        // Find the student by studentCode
        const student = await prisma.student.findFirst({
            where: { studentCode: studentCode }
        });
        if (!student) {
            return res.send({ message: "Student not found" });
        } else {
            const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
            const parent = await prisma.parent.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    studentId: student.id,  // Assign the student's id to parent's studentId
                    studentCode: studentCode
                }
            });
            delete parent.password;
            const token = jwt.sign({ id: parent.id, username, studentId: student.id, role: "parent" }, process.env.JWT_SECRET)
            res.send({ token, message: "Parent registration successful!" });
        }
    } catch (error) {
        next(error);
    }
});
//<--------------------------------LOGIN PARENT-------------------------------->
authRouter.post("/login_parent", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const parent = await prisma.parent.findUnique({
            where: { username: username },
        });
        if (!parent) {
            return res.status(401).send("There is no parent with that username.");
        }
        const validPassword = await bcrypt.compare(password, parent.password);
        if (!validPassword) {
            return res.status(401).send("Incorrect password.");
        }
        const token = jwt.sign({ id: parent.id, role: "parent" }, process.env.JWT_SECRET);
        res.send({ token });
        console.log("Parent login successful!");
    } catch (error) {
        next(error);
    }
});
//<--------------------------------GET PARENT ACCOUNT-------------------------------->
authRouter.get("/account_parent", requireParent, async (req, res, next) => {
    try {
        const parent = await prisma.parent.findUnique({
            where: { id: req.parent.id },
            include: {
                student: {
                    include: {
                        studentProgress: {
                            include: {
                                 learningObjective: {
                                    include: {lesson: true }
                                }
                            }
                        }
                    }
                }
            }
        });
        delete parent.password
        res.send(parent);
    } catch (error) {
        next(error)
    }
});

module.exports = authRouter;