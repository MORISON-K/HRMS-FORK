from rest_framework import serializers
from .models import Transfer


class TransferSerializer(serializers.ModelSerializer):
    employee_name       = serializers.ReadOnlyField(source="employee.full_name")
    employee_id         = serializers.ReadOnlyField(source="employee.employee_id")
    from_dept_name      = serializers.ReadOnlyField(source="from_department.name")
    to_dept_name        = serializers.ReadOnlyField(source="to_department.name")
    from_position_title = serializers.ReadOnlyField(source="from_position.title")
    to_position_title   = serializers.ReadOnlyField(source="to_position.title")
    initiated_by_name   = serializers.ReadOnlyField(source="initiated_by.full_name")
    approved_by_name    = serializers.ReadOnlyField(source="approved_by.full_name")

    class Meta:
        model  = Transfer
        fields = "__all__"
        read_only_fields = ["initiated_by", "approved_by", "status", "created_at"]

    def create(self, validated_data):
        validated_data["initiated_by"] = self.context["request"].user
        return super().create(validated_data)