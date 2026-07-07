from django.contrib import admin
from .models import TrainingProgram, Trainee, TraineeAssessment, TraineeCourse

@admin.register(TrainingProgram)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ["title","program_type","department","start_date","end_date","status"]
    list_filter  = ["program_type","status"]

@admin.register(Trainee)
class TraineeAdmin(admin.ModelAdmin):
    list_display  = ["user","trainee_type","department","program","start_date","end_date","status"]
    list_filter   = ["trainee_type","status","department"]
    search_fields = ["user__first_name","user__last_name","institution"]

admin.site.register(TraineeAssessment)
admin.site.register(TraineeCourse)