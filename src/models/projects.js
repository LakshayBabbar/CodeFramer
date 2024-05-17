import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name cannot be empty"],
    },
    description: {
      type: String,
      required: [true, "Description cannot be empty"],
    },
    userId: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      default: "<h1 onclick='Alert()'>New Project</h1>",
    },
    css: {
      type: String,
      default: "h1 {\n\tcolor: red;\n\tcursor: pointer;\n}",
    },
    js: {
      type: String,
      default: "function Alert() {\n\talert('Hello');\n}",
    },
  },
  { timestamps: true }
);
const Project =
  mongoose.models.projects || mongoose.model("projects", projectSchema);
export default Project;
