import uvicorn

uvicorn.run(
    "backend.main:app",
    host    = "localhost",
    port    = 8080,
    # reload  = True, # FIXME: `reload=True` gives `[Errno 48] Address already in use`
)