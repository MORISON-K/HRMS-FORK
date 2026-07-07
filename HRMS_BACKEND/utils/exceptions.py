"""Custom DRF exception handlers."""
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        # Wrap DRF errors in a consistent envelope
        data = {"success": False, "errors": response.data}
        return Response(data, status=response.status_code)

    # Unhandled exceptions → 500
    return Response(
        {"success": False, "errors": {"detail": "An unexpected error occurred."}},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )