import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    // COMPANY INFORMATION
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/i, "Please provide a valid website URL"],
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    // COMPANY LOGO
    logo: {
      type: String,
      default: "",
    },

    // RECRUITER REFERENCE
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Company = mongoose.model("Company", companySchema);
