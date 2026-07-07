from django.urls import path
from .views import (
    TrainingProgramListCreateView, TrainingProgramDetailView,
    TraineeListCreateView, TraineeDetailView,
    TraineeAssessmentListCreateView, TraineeCourseListCreateView,
    MyTraineeProfileView,
)

urlpatterns = [
    path("programs/",                              TrainingProgramListCreateView.as_view(),     name="program_list"),
    path("programs/<int:pk>/",                     TrainingProgramDetailView.as_view(),         name="program_detail"),
    path("",                                       TraineeListCreateView.as_view(),             name="trainee_list"),
    path("me/",                                    MyTraineeProfileView.as_view(),              name="my_trainee_profile"),
    path("<int:pk>/",                              TraineeDetailView.as_view(),                 name="trainee_detail"),
    path("<int:trainee_pk>/assessments/",          TraineeAssessmentListCreateView.as_view(),   name="trainee_assessments"),
    path("<int:trainee_pk>/courses/",              TraineeCourseListCreateView.as_view(),       name="trainee_courses"),
]