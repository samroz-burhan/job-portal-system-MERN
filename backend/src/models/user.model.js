
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // PERSONAL INFORMATION
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email",
      ],
    },

    // AUTHENTICATION
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    // USER ROLE
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: [true, "Please select your role"],
    },

    // TERMS AND CONDITIONS
    termsAccepted: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value) => value === true,
        message: "You must accept Terms and Privacy Policy",
      },
    },

    termsAcceptedAt: {
      type: Date,
      default: null,
    },

    // EMAIL VERIFICATION
    isVerified: {
      type: Boolean,
      default: false,
    },

    // PROFILE INFORMATION
    profile: {
      bio: {
        type: String,
        default: "",
      },

      skills: {
        type: [String],
        default: [],
      },

      resume: {
        type: String,
        default: "",
      },

      resumeOriginalName: {
        type: String,
        default: "",
      },

      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: null,
      },

      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

// PASSWORD HASHING
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

// PASSWORD COMPARISON
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;


// {
//   "fullName": "Amina Raza",
//   "email": "amina@example.com",
//   "password": "$2b$12$hashedpassword",
//   "role": "student",
//   "termsAccepted": true,
//   "termsAcceptedAt": "2026-11-25T17:00:00.000Z",
//   "isVerified": false,
//   "profile": {
//     "bio": "",
//     "skills": [],
//     "resume": "",
//     "resumeOriginalName": "",
//     "company": null,
//     "profilePhoto": ""
//   }
// }
