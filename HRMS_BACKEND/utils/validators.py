"""Custom Django field validators."""
import re
from django.core.exceptions import ValidationError


def validate_phone_ug(value):
    """Accepts +256XXXXXXXXX or 07XXXXXXXX / 03XXXXXXXX."""
    pattern = r'^(\+256|0)(7[0-9]|3[0-9])\d{7}$'
    if not re.match(pattern, value.replace(" ", "")):
        raise ValidationError("Enter a valid Ugandan phone number.")


def validate_nwsc_email(value):
    if value and not value.endswith("@nwsc.co.ug"):
        raise ValidationError("Staff email must end with @nwsc.co.ug")


def validate_positive(value):
    if value is not None and value < 0:
        raise ValidationError("Value must be non-negative.")