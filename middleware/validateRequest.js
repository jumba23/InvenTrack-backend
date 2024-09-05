// middleware/validateRequest.js

// function will  analyze the request object and validate it against the schema provided
export const validateRequest = (schema, schemaType = "body") => {
  return (req, res, next) => {
    let dataToValidate;
    switch (schemaType) {
      case "body":
        dataToValidate = req.body;
        break;
      case "query":
        dataToValidate = req.query;
        break;
      case "params":
        dataToValidate = req.params;
        break;
      default:
        dataToValidate = req.body;
    }

    const { error } = schema.validate(dataToValidate, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors });
    }
    next();
  };
};
