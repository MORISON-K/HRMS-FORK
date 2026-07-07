from django.urls import path
from .views import (
    JobPostingListCreateView, JobPostingDetailView,
    ApplicationListCreateView, ApplicationDetailView, UpdateApplicationStatusView,
    InterviewListCreateView, InterviewDetailView,
    JobOfferListCreateView, JobOfferDetailView,
)

urlpatterns = [
    path('jobs/',                        JobPostingListCreateView.as_view(),  name='job_list'),
    path('jobs/<int:pk>/',               JobPostingDetailView.as_view(),      name='job_detail'),
    path('applications/',                ApplicationListCreateView.as_view(), name='app_list'),
    path('applications/<int:pk>/',       ApplicationDetailView.as_view(),     name='app_detail'),
    path('applications/<int:pk>/status/',UpdateApplicationStatusView.as_view(),name='app_status'),
    path('interviews/',                  InterviewListCreateView.as_view(),   name='interview_list'),
    path('interviews/<int:pk>/',         InterviewDetailView.as_view(),       name='interview_detail'),
    path('offers/',                      JobOfferListCreateView.as_view(),    name='offer_list'),
    path('offers/<int:pk>/',             JobOfferDetailView.as_view(),        name='offer_detail'),
]