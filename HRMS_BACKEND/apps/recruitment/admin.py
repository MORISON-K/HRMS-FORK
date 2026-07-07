from django.contrib import admin
from .models import JobPosting, JobApplication, Interview, JobOffer

@admin.register(JobPosting)
class JobPostingAdmin(admin.ModelAdmin):
    list_display  = ["reference_no", "title", "department", "job_type", "status", "deadline"]
    list_filter   = ["status", "job_type", "department"]
    search_fields = ["title", "reference_no"]

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display  = ["applicant", "job", "status", "submitted_at"]
    list_filter   = ["status"]
    search_fields = ["applicant__username", "job__reference_no"]

@admin.register(Interview)
class InterviewAdmin(admin.ModelAdmin):
    list_display = ["application", "interview_type", "scheduled_at", "outcome"]

@admin.register(JobOffer)
class JobOfferAdmin(admin.ModelAdmin):
    list_display = ["application", "offered_salary", "status", "expires_at"]