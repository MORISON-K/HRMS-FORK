from rest_framework import serializers
from .models import TrainingProgram, Trainee, TraineeAssessment, TraineeCourse


class TrainingProgramSerializer(serializers.ModelSerializer):
    department_name  = serializers.ReadOnlyField(source="department.name")
    coordinator_name = serializers.ReadOnlyField(source="coordinator.full_name")
    enrolled_count   = serializers.SerializerMethodField()

    class Meta:
        model  = TrainingProgram
        fields = "__all__"

    def get_enrolled_count(self, obj):
        return obj.trainees.filter(status="active").count()


class TraineeCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model  = TraineeCourse
        fields = "__all__"


class TraineeAssessmentSerializer(serializers.ModelSerializer):
    assessed_by_name = serializers.ReadOnlyField(source="assessed_by.full_name")

    class Meta:
        model  = TraineeAssessment
        fields = "__all__"
        read_only_fields = ["assessed_by","assessed_at"]

    def create(self, validated_data):
        validated_data["assessed_by"] = self.context["request"].user
        return super().create(validated_data)


class TraineeSerializer(serializers.ModelSerializer):
    full_name        = serializers.ReadOnlyField(source="user.full_name")
    email            = serializers.ReadOnlyField(source="user.email")
    program_title    = serializers.ReadOnlyField(source="program.title")
    department_name  = serializers.ReadOnlyField(source="department.name")
    supervisor_name  = serializers.ReadOnlyField(source="supervisor.full_name")
    assessments      = TraineeAssessmentSerializer(many=True, read_only=True)
    courses          = TraineeCourseSerializer(many=True, read_only=True)

    class Meta:
        model  = Trainee
        fields = "__all__"