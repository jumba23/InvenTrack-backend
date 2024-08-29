// Centralized error handling
export default function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.message === "Not found") {
    res.status(404).send("Not found");
  } else {
    res.status(500).send("An error occurred");
  }
}
