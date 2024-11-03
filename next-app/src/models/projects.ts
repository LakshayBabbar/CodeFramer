import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name cannot be empty"],
    },
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["web", "compiler"],
    },
    languages: {
      html: {
        type: String,
      },
      css: {
        type: String,
      },
      js: {
        type: String,
      },
      python: {
        type: String,
      },
      java: {
        type: String,
      },
      cpp: {
        type: String,
      },
      c: {
        type: String,
      },
      javascript: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
const Project =
  mongoose.models.projects || mongoose.model("projects", projectSchema);
export default Project;
