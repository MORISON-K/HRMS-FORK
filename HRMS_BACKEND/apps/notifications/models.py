from django.db import models
from django.conf import settings


class Notification(models.Model):
    TYPE = [
        ("info",    "Info"),
        ("success", "Success"),
        ("warning", "Warning"),
        ("danger",  "Danger"),
    ]
    CATEGORY = [
        ("leave",       "Leave"),
        ("transfer",    "Transfer"),
        ("recruitment", "Recruitment"),
        ("payroll",     "Payroll"),
        ("evaluation",  "Evaluation"),
        ("system",      "System"),
        ("general",     "General"),
    ]

    recipient   = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notifications")
    title       = models.CharField(max_length=200)
    message     = models.TextField()
    notif_type  = models.CharField(max_length=20, choices=TYPE, default="info")
    category    = models.CharField(max_length=20, choices=CATEGORY, default="general")
    link        = models.CharField(max_length=300, blank=True)  # frontend route
    is_read     = models.BooleanField(default=False)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "notifications"
        ordering = ["-created_at"]

    def __str__(self):
        return f"→ {self.recipient.username}: {self.title}"