from rest_framework import serializers
from .models import Report


class ReportSerializer(serializers.ModelSerializer):
    generated_by_name = serializers.ReadOnlyField(source="generated_by.full_name")

    class Meta:
        model  = Report
        fields = "__all__"
        read_only_fields = ["generated_by","generated_at","file"]