"""Database configuration builder."""
from decouple import config


def get_db_config():
    return {
        "ENGINE":   "django.db.backends.mysql",
        "NAME":     config("DB_NAME",     default="hrms_db"),
        "USER":     config("DB_USER",     default="root"),
        "PASSWORD": config("DB_PASSWORD", default=""),
        "HOST":     config("DB_HOST",     default="127.0.0.1"),
        "PORT":     config("DB_PORT",     default="3306"),
        "OPTIONS":  {
            "charset": "utf8mb4",
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }