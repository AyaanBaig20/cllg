import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    githubUrl: {
      type: String,
      trim: true,
    },

    linkedinUrl: {
      type: String,
      trim: true,
    },

    summary: {
      type: String,
      trim: true,
    },

    education: [
      {
        degree: {
          type: String,
          trim: true,
        },
        institution: {
          type: String,
          trim: true,
        },
        year: {
          type: String,
          trim: true,
        },
      },
    ],

    projects: [
      {
        title: {
          type: String,
          trim: true,
        },
        points: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],

    experience: [
      {
        role: {
          type: String,
          trim: true,
        },
        company: {
          type: String,
          trim: true,
        },
        startDate: {
          type: String,
          trim: true,
        },
        endDate: {
          type: String,
          trim: true,
        },
        points: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    certifications: [
      {
        type: String,
        trim: true,
      },
    ],

    achievements: [
      {
        type: String,
        trim: true,
      },
    ],

    languages: [
      {
        type: String,
        trim: true,
      },
    ],

    interests: [
      {
        type: String,
        trim: true,
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);
let resume = mongoose.model("Resume",resumeSchema)

export default resume