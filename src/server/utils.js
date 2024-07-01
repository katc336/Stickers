const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<--------------------------------AUTHORIZATION MIDDLEWARE-------------------------------->
const authMiddleware = async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    // continue...
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id, role } = jwt.verify(token, JWT_SECRET);
      if (id) {
        if (role === "user") {
          req.user = await prisma.user.findUnique({
            where: { id }
          });
        } else if (role === "parent") {
          req.parent = await prisma.parent.findUnique({
            where: { id }
          });
        } else if (role === "student") {
          req.parent = await prisma.studentAccount.findUnique({
            where: { id }
          });
        }
        next();
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: 'Authorization token malformed',
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
};

// requireUser error
const requireUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).send("You need an account to do that action")
  }
  else next();
};
const requireParent = (req, res, next) => {
  if (!req.parent) {
    res.status(401).send("Parents only!")
  }
  else next();
};
const requireStudent = (req, res, next) => {
  if (!req.student) {
    res.status(401).send("You do not have access to this student account")
  }
  else next();
};

module.exports = {
  requireUser,
  requireParent,
  requireStudent,
  authMiddleware
}