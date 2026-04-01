import app from "./src/app.js";
async function startServer() {
  try {
    await dbConnection();

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
}
