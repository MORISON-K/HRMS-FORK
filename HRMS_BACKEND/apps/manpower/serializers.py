from rest_framework import serializers
from .models import ManpowerPlan, EstablishmentPost


class EstablishmentPostSerializer(serializers.ModelSerializer):
    position_title = serializers.ReadOnlyField(source="position.title")
    grade_level    = serializers.ReadOnlyField(source="grade.level")
    vacant_count   = serializers.ReadOnlyField()

    class Meta:
        model  = EstablishmentPost
        fields = "__all__"


class ManpowerPlanSerializer(serializers.ModelSerializer):
    department_name = serializers.ReadOnlyField(source="department.name")
    submitted_by_name = serializers.ReadOnlyField(source="submitted_by.full_name")
    posts           = EstablishmentPostSerializer(many=True, read_only=True)
    gap             = serializers.ReadOnlyField()

    class Meta:
        model  = ManpowerPlan
        fields = "__all__"
        read_only_fields = ["submitted_by", "approved_by", "created_at"]

    def create(self, validated_data):
        validated_data["submitted_by"] = self.context["request"].user
        return super().create(validated_data)