import django_filters
from .models import Employee

class EmployeeFilter(django_filters.FilterSet):
    join_date_after  = django_filters.DateFilter(field_name="join_date", lookup_expr="gte")
    join_date_before = django_filters.DateFilter(field_name="join_date", lookup_expr="lte")

    class Meta:
        model  = Employee
        fields = ["department", "employment_status", "contract_type", "gender", "grade"]