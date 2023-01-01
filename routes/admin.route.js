import { Router } from "express";
import { getAppInfo, getMostRated } from "../controllers/admin.js";
import { isAdmin, isAuth } from "../middlewares/auth.js";

export const adminRoute = Router();


adminRoute.get('/app-info',isAuth,isAdmin,getAppInfo)
adminRoute.get('/most-rated',isAuth,isAdmin,getMostRated)