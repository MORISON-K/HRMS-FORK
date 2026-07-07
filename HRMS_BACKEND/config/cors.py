"""CORS configuration helpers (values consumed in settings/base.py)."""
# Extend this list in production via environment variables.
CORS_DEFAULT_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]