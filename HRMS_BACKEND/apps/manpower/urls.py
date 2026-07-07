from django.urls import path
from .views import (
    ManpowerPlanListCreateView, ManpowerPlanDetailView, ApproveManpowerPlanView,
    EstablishmentPostListCreateView, EstablishmentPostDetailView,
)

urlpatterns = [
    path("plans/",                   ManpowerPlanListCreateView.as_view(),   name="manpower_plan_list"),
    path("plans/<int:pk>/",          ManpowerPlanDetailView.as_view(),       name="manpower_plan_detail"),
    path("plans/<int:pk>/approve/",  ApproveManpowerPlanView.as_view(),      name="manpower_plan_approve"),
    path("posts/",                   EstablishmentPostListCreateView.as_view(), name="post_list"),
    path("posts/<int:pk>/",          EstablishmentPostDetailView.as_view(),     name="post_detail"),
]