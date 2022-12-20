import mongoose, { Schema } from "mongoose";
import { genres } from "../utils/genre.js";

const animeSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["public", "private"],
    },
    genre: {
      type: [String],
      required: true,
      enum: genres,
    },
    tags: {
      type: [String],
      required: true,
    },
    cast: [
      {
        character: {
          type: Schema.Types.ObjectId,
          ref: "Character",
          leadChar: Boolean,
        },
      },
    ],
    poster: {
      type: Object,
      url: { type: String, required: true },
      public_id: { type: String, required: true },
      required: true,
    },
    trailer: {
      type: Object,
      url: { type: String, required: true },
      public_id: { type: String, required: true },
      required: true,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Anime = mongoose.model('Anime',animeSchema);