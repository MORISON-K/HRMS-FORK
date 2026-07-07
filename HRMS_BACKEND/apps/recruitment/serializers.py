from rest_framework import serializers
from .models import JobPosting, JobApplication, Interview, JobOffer
from apps.authentication.serializers import UserSerializer


class JobPostingSerializer(serializers.ModelSerializer):
    department_name    = serializers.ReadOnlyField(source='department.name')
    application_count  = serializers.SerializerMethodField()
    posted_by_name     = serializers.ReadOnlyField(source='posted_by.full_name')

    class Meta:
        model  = JobPosting
        fields = '__all__'
        read_only_fields = ['posted_by', 'created_at', 'published_at']

    def get_application_count(self, obj):
        return obj.applications.count()

    def create(self, validated_data):
        validated_data['posted_by'] = self.context['request'].user
        return super().create(validated_data)


class JobApplicationSerializer(serializers.ModelSerializer):
    applicant_name  = serializers.ReadOnlyField(source='applicant.full_name')
    applicant_email = serializers.ReadOnlyField(source='applicant.email')
    job_title       = serializers.ReadOnlyField(source='job.title')
    job_ref         = serializers.ReadOnlyField(source='job.reference_no')

    class Meta:
        model  = JobApplication
        fields = '__all__'
        read_only_fields = ['applicant', 'status', 'score', 'submitted_at']

    def create(self, validated_data):
        validated_data['applicant'] = self.context['request'].user
        return super().create(validated_data)


class InterviewSerializer(serializers.ModelSerializer):
    panel_members = UserSerializer(source='panel', many=True, read_only=True)
    panel_ids     = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True,
        queryset=__import__('django.contrib.auth', fromlist=['get_user_model']).get_user_model().objects.all(),
        source='panel', required=False
    )

    class Meta:
        model  = Interview
        fields = '__all__'


class JobOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model  = JobOffer
        fields = '__all__'