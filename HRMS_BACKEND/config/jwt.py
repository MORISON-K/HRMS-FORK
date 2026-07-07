"""JWT configuration consumed by settings/base.py."""
from datetime import timedelta


def get_jwt_config():
    return {
        "ACCESS_TOKEN_LIFETIME":  timedelta(minutes=60),
        "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
        "ROTATE_REFRESH_TOKENS":  True,
        "BLACKLIST_AFTER_ROTATION": True,
        "ALGORITHM": "HS256",
        "AUTH_HEADER_TYPES": ("Bearer",),
        "TOKEN_OBTAIN_SERIALIZER": "apps.authentication.serializers.CustomTokenObtainPairSerializer",
    }