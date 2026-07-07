from django.urls import path
from .views import NotificationListView, MarkReadView, MarkAllReadView, UnreadCountView

urlpatterns = [
    path("",                    NotificationListView.as_view(), name="notif_list"),
    path("unread-count/",       UnreadCountView.as_view(),      name="notif_count"),
    path("mark-all-read/",      MarkAllReadView.as_view(),      name="notif_mark_all"),
    path("<int:pk>/read/",      MarkReadView.as_view(),         name="notif_mark_read"),
]