import { Router } from "express";
import { getAppInfo, getMostRated } from "../controllers/admin.js";
import { isAdmin, isAuth, isMod } from "../middlewares/auth.js";

export const adminRoute = Router();


adminRoute.get('/app-info',isAuth,isMod,getAppInfo)
adminRoute.get('/most-rated',isAuth,isMod,getMostRated)