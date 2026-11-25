import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    // JOB REFERENCE
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    // STUDENT REFERENCE
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // APPLICATION STATUS
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate applications for the same job by same applicantt
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const applicationModel = mongoose.model("Application", applicationSchema);

export default applicationModel
