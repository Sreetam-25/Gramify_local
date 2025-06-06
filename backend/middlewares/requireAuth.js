import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: "Authorization token required" });

  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(id).select("_id");
    next();
  } catch (err) {
    res.status(401).json({ message: "Request not authorized" });
  }
};

export default requireAuth;
