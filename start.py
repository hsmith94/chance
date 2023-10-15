import uvicorn

uvicorn.run(
    "backend.main:app",
    host    = "localhost",
    port    = 8080,
)