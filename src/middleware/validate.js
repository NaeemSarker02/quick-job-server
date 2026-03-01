const { body, validationResult } = require("express-validator");

// Reusable validation error checker
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
};

// Job validation rules
const validateJob = [
  body("title").notEmpty().withMessage("Title is required"),
  body("company").notEmpty().withMessage("Company is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("type").notEmpty().withMessage("Job type is required"),
  body("description").notEmpty().withMessage("Description is required"),
  handleValidationErrors,
];

// Application validation rules
const validateApplication = [
  body("job_id").notEmpty().withMessage("Job ID is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  // body("resume_link").isURL().withMessage("Valid resume URL is required"),
  handleValidationErrors,
];

module.exports = { validateJob, validateApplication };