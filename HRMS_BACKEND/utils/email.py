"""Email utility wrappers. Reads SMTP settings from Django settings."""
from django.core.mail import send_mail
from django.conf import settings


def send_notification_email(to_email, subject, message):
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[to_email],
        fail_silently=False,
    )


def send_leave_approval_email(employee, approved, leave_request):
    action = "approved" if approved else "rejected"
    subject = f"Your leave request has been {action}"
    message = (
        f"Dear {employee.user.get_full_name()},\n\n"
        f"Your {leave_request.leave_type.name} leave from "
        f"{leave_request.start_date} to {leave_request.end_date} "
        f"has been {action}.\n\n"
        "Regards,\nNWSC HR Department"
    )
    send_notification_email(employee.user.email, subject, message)


def send_welcome_email(user):
    subject = "Welcome to NWSC HRMS"
    message = (
        f"Dear {user.get_full_name()},\n\n"
        "Your HRMS account has been created. "
        f"Your username is: {user.username}\n\n"
        "Please log in and change your password immediately.\n\n"
        "Regards,\nNWSC HR Team"
    )
    send_notification_email(user.email, subject, message)