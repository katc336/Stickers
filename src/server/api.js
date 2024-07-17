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
        res.send({ message: "Profile image added successfully" });
    } catch (error) {
        next(error);
    }
});


module.exports = apiRouter;