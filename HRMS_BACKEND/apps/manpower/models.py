from django.db import models
from django.conf import settings
from apps.employees.models import Department, Position, Grade


class ManpowerPlan(models.Model):
    STATUS = [("draft","Draft"),("submitted","Submitted"),("approved","Approved"),("rejected","Rejected")]

    title         = models.CharField(max_length=200)
    department    = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="manpower_plans")
    financial_year= models.CharField(max_length=10)   # e.g. 2024/25
    current_staff = models.PositiveIntegerField(default=0)
    required_staff= models.PositiveIntegerField(default=0)
    budget        = models.DecimalField(max_digits=16, decimal_places=2, default=0)
    status        = models.CharField(max_length=20, choices=STATUS, default="draft")
    justification = models.TextField(blank=True)
    submitted_by  = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="manpower_plans")
    approved_by   = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="approved_manpower_plans")
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "manpower_plans"
        unique_together = ["department", "financial_year"]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.department} — {self.financial_year}"

    @property
    def gap(self):
        return self.required_staff - self.current_staff


class EstablishmentPost(models.Model):
    STATUS = [("filled","Filled"),("vacant","Vacant"),("frozen","Frozen")]

    manpower_plan = models.ForeignKey(ManpowerPlan, on_delete=models.CASCADE, related_name="posts")
    position      = models.ForeignKey(Position, on_delete=models.CASCADE)
    grade         = models.ForeignKey(Grade, null=True, blank=True, on_delete=models.SET_NULL)
    approved_count= models.PositiveIntegerField(default=1)
    filled_count  = models.PositiveIntegerField(default=0)
    status        = models.CharField(max_length=20, choices=STATUS, default="vacant")
    notes         = models.TextField(blank=True)

    class Meta:
        db_table = "establishment_posts"

    def __str__(self):
        return f"{self.position} x{self.approved_count} ({self.status})"

    @property
    def vacant_count(self):
        return self.approved_count - self.filled_count