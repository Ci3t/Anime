import { check, validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";
import { genres } from "../utils/genre.js";

export const userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is Missing"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is Missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

export const validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is Missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

export const signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password").trim().not().isEmpty().withMessage("Password is Missing"),
];

export const characterInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is Missing"),
  check("about").trim().not().isEmpty().withMessage("About is Required field"),
  check("gender")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Gender is Required field"),
];

export const validateAnime = [
  check("title").trim().not().isEmpty().withMessage("Anime title is missing!"),
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Anime description is missing! and required"),
  check("language")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Anime Language is missing!"),
  check("releaseDate").isDate().withMessage("Release Date is missing!"),
  check("status")
    .isIn(["public", "private"])
    .withMessage("Anime Status must be public or private!"),
  check("type").trim().not().isEmpty().withMessage("Anime type is missing!"),
  check("genres")
    .isArray()
    .withMessage("Genres must be an array of strings!")
    .custom((value) => {
      for (let val of value) {
        if (!genres.includes(val)) throw Error("Invalid genres!");
    }
    
    return true
    }),
  check("tags")
    .isArray({ min: 1 })
    .withMessage("Tags must be an array of strings!")
    .custom((tags) => {
      for (let tag of tags) {
        if (typeof tag !== "string")
          throw Error("Tags must be an array of strings!");
        }
        return true
    }),
  check("cast")
    .isArray()
    .withMessage("Cast must be an array of objects!")
    .custom((cast) => {
      for (let c of cast) {
        if (!isValidObjectId(c.character)) throw Error("Invalid Cast ID inside Cast");
        // if (!c.roleAs?.trim())
        //   throw Error("Role as is missing inside cast!");
        if (typeof c.leadChar !== "boolean")
          throw Error("Only accepted boolean value inside leadCharacter");
        }
        return true
    }),
 
  // check("poster").custom((_, { req }) => {
  //   if (!req.file) throw Error("Poster file is missing");
  //   return true
  // }),
];

// export const validateAnimeWithoutPoster = [
//   check("title").trim().not().isEmpty().withMessage("Anime title is missing!"),
//   check("description")
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage("Anime description is missing! and required"),
//   check("language")
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage("Anime Language is missing!"),
//   check("releaseDate").isDate().withMessage("Release Date is missing!"),
//   check("status")
//     .isIn(["public", "private"])
//     .withMessage("Anime Status must be public or private!"),
//   check("type").trim().not().isEmpty().withMessage("Anime type is missing!"),
//   check("genres")
//     .isArray()
//     .withMessage("Genres must be an array of strings!")
//     .custom((value) => {
//       for (let val of value) {
//         if (!genres.includes(val)) throw Error("Invalid genres!");
//     }
    
//     return true
//     }),
//   check("tags")
//     .isArray({ min: 1 })
//     .withMessage("Tags must be an array of strings!")
//     .custom((tags) => {
//       for (let tag of tags) {
//         if (typeof tag !== "string")
//           throw Error("Tags must be an array of strings!");
//         }
//         return true
//     }),
//   check("cast")
//     .isArray()
//     .withMessage("Cast must be an array of objects!")
//     .custom((cast) => {
//       for (let c of cast) {
//         if (!isValidObjectId(c.character)) throw Error("Invalid Cast ID inside Cast");
//         // if (!c.roleAs?.trim())
//         //   throw Error("Role as is missing inside cast!");
//         if (typeof c.leadChar !== "boolean")
//           throw Error("Only accepted boolean value inside leadCharacter");
//         }
//         return true
//     }),

 
// ];

export const validateTrailer =   check("trailer")
.isObject()
.withMessage("trailer must be an object with url and public_id")
.custom(({ url, public_id }) => {
  try {
    const result = new URL(url);
    if (!result.protocol.includes("http"))
      throw Error("Trailer url is invalid");

    const arr = url.split("/");
    const publicId = arr[arr.length - 1].split(".")[0];
    if (public_id !== publicId) throw Error("Trailer URL is Invalid");
    return true
  } catch (error) {
    throw Error("Trailer URL is Invalid");
  }
  
})

export const validateRatings = check('rating',"Rating must be a number between 0 and 10").isFloat({min:0,max:10});

export const validate = (req, res, next) => {
  const error = validationResult(req).array();

  if (error.length) {
    return res.status(401).json({
      error: error[0].msg,
    });
  }
  next();
};


