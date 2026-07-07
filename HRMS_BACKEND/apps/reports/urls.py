from django.urls import path
from .views import ReportListView, HeadcountSummaryView, LeaveSummaryView, RecruitmentSummaryView

urlpatterns = [
    path("",             ReportListView.as_view(),         name="report_list"),
    path("headcount/",   HeadcountSummaryView.as_view(),   name="report_headcount"),
    path("leave/",       LeaveSummaryView.as_view(),       name="report_leave"),
    path("recruitment/", RecruitmentSummaryView.as_view(), name="report_recruitment"),
]