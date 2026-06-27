import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "test";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedData = jwt.verify(token, JWT_SECRET);

    req.userId = decodedData?.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default auth;
