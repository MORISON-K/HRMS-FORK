"""Shared helper functions used across HRMS apps."""
import random
import string
from datetime import date
from django.utils import timezone


def generate_employee_id():
    """Generate NWSC-YYMM-NNNN style employee ID."""
    today = date.today()
    suffix = "".join(random.choices(string.digits, k=4))
    return f"NWSC-{today.strftime('%y%m')}-{suffix}"


def generate_reference_number(prefix="REF"):
    """Generic reference number for jobs, transfers, etc."""
    today = date.today()
    suffix = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"{prefix}-{today.year}-{suffix}"


def get_financial_year(d=None):
    """Return financial year string e.g. '2024/25'. FY starts July 1."""
    d = d or date.today()
    start = d.year if d.month >= 7 else d.year - 1
    return f"{start}/{str(start + 1)[-2:]}"


def age_from_dob(dob):
    """Calculate age in years from a date of birth."""
    if not dob:
        return None
    today = date.today()
    return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))