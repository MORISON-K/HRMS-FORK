"""ASGI config for hrms_project (WebSocket-ready)."""
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hrms_project.settings.production")
application = get_asgi_application()