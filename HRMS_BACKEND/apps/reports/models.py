from django.db import models
from django.conf import settings


class Report(models.Model):
    TYPE = [
        ("headcount",   "Headcount Report"),
        ("leave",       "Leave Summary"),
        ("payroll",     "Payroll Report"),
        ("recruitment", "Recruitment Report"),
        ("performance", "Performance Report"),
        ("transfer",    "Transfer Report"),
        ("trainee",     "Trainee Report"),
        ("custom",      "Custom Report"),
    ]
    FORMAT = [("pdf","PDF"),("excel","Excel"),("csv","CSV")]

    title        = models.CharField(max_length=200)
    report_type  = models.CharField(max_length=30, choices=TYPE)
    format       = models.CharField(max_length=10, choices=FORMAT, default="pdf")
    parameters   = models.JSONField(default=dict)   # date ranges, filters etc
    generated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    file         = models.FileField(upload_to="reports/", null=True, blank=True)
    generated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "reports"
        ordering = ["-generated_at"]

    def __str__(self):
        return f"{self.title} ({self.generated_at.date()})"