import os

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

# Fetching URLs from environment variables or setting default values
ADDRESS = os.getenv("APP_ADDRESS", "http://127.0.0.1")
CLIENT_URL = os.getenv("APP_CLIENT_URL", "http://localhost:3000")
PORT = os.getenv("APP_PORT", "8000")
HOST_URL = f"https://{os.getenv('VERCEL_URL')}"
LOG_FILE = os.getenv("APP_LOG_FILE")
MODE = os.getenv("APP_MODE", "DEV")


def scrub_sensitive_environment_variables():
    os.unsetenv("OPENAI_API_KEY")
