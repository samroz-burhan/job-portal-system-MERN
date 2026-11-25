import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  //JOB INFORMATION
  title: {
    type: String,
    required: [true, "Job title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Job description is required"],
    trim: true,
  },

  reqirements: [{ type: String, trim: true }],

  //JOB DETAILS
  experienceLevel: {
    type: String,
    enum: ["Entry Level", "Junior", "Mid Level", "Senior", "Expert"],
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },

  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: true,
  },

  position: {
    type: Number,
    required: true,
    min: [1, "At least one position is required"],
  },

  //COMPANY REFERENCE
  conpany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

  // RECRUITER REFERENCE
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // RECRUITER REFERENCE
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
