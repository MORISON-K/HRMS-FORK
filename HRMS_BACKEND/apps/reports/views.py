from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count, Q
from datetime import date

from .models import Report
from .serializers import ReportSerializer
from apps.authentication.permissions import IsHROrAdmin, IsManagement
from apps.employees.models import Employee, Department
from apps.leave.models import LeaveRequest
from apps.recruitment.models import JobPosting, JobApplication


class ReportListView(generics.ListAPIView):
    queryset           = Report.objects.all()
    serializer_class   = ReportSerializer
    permission_classes = [IsHROrAdmin]
    filter_backends    = [DjangoFilterBackend]
    filterset_fields   = ["report_type","format"]


# ── Analytical endpoints (data for dashboard charts) ──────────────────────────

class HeadcountSummaryView(APIView):
    """GET /api/reports/headcount/ — total staff, by department, by gender."""
    permission_classes = [IsManagement]

    def get(self, request):
        total      = Employee.objects.filter(employment_status="active").count()
        by_dept    = list(Department.objects.annotate(
            active=Count("employees", filter=Q(employees__employment_status="active"))
        ).values("name","active").order_by("-active"))
        by_gender  = list(Employee.objects.filter(employment_status="active")
                          .values("gender").annotate(count=Count("id")))
        by_contract= list(Employee.objects.filter(employment_status="active")
                          .values("contract_type").annotate(count=Count("id")))
        return Response({
            "total":       total,
            "by_dept":     by_dept,
            "by_gender":   by_gender,
            "by_contract": by_contract,
        })


class LeaveSummaryView(APIView):
    """GET /api/reports/leave/?year=2024"""
    permission_classes = [IsHROrAdmin]

    def get(self, request):
        year = request.query_params.get("year", date.today().year)
        qs   = LeaveRequest.objects.filter(start_date__year=year)
        by_status = list(qs.values("status").annotate(count=Count("id")))
        by_type   = list(qs.values("leave_type__name").annotate(count=Count("id")))
        return Response({"year": year, "by_status": by_status, "by_type": by_type, "total": qs.count()})


class RecruitmentSummaryView(APIView):
    """GET /api/reports/recruitment/"""
    permission_classes = [IsHROrAdmin]

    def get(self, request):
        jobs  = JobPosting.objects.all()
        apps  = JobApplication.objects.all()
        return Response({
            "total_jobs":          jobs.count(),
            "open_jobs":           jobs.filter(status="open").count(),
            "total_applications":  apps.count(),
            "shortlisted":         apps.filter(status="shortlisted").count(),
            "hired":               apps.filter(status="hired").count(),
            "rejected":            apps.filter(status="rejected").count(),
            "by_job_type":         list(jobs.values("job_type").annotate(count=Count("id"))),
        })