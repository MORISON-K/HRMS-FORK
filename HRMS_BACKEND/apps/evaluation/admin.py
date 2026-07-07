from django.contrib import admin
from .models import PerformanceCycle, KPI, PerformanceReview, JobEvaluation

admin.site.register(PerformanceCycle)
admin.site.register(KPI)

@admin.register(PerformanceReview)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["employee","cycle","overall_score","grade","status"]
    list_filter  = ["status","cycle"]

@admin.register(JobEvaluation)
class JobEvalAdmin(admin.ModelAdmin):
    list_display = ["position","total_score","recommended_grade","status"]