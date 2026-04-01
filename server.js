import app from "./src/app.js";
async function startServer() {
  try {
    await dbConnection();

    app.listen(3000, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
}
