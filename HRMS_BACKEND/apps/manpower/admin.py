from django.contrib import admin
from .models import ManpowerPlan, EstablishmentPost

@admin.register(ManpowerPlan)
class ManpowerPlanAdmin(admin.ModelAdmin):
    list_display = ["department","financial_year","current_staff","required_staff","status"]
    list_filter  = ["status","financial_year"]

@admin.register(EstablishmentPost)
class EstablishmentPostAdmin(admin.ModelAdmin):
    list_display = ["position","manpower_plan","approved_count","filled_count","status"]
    list_filter  = ["status"]