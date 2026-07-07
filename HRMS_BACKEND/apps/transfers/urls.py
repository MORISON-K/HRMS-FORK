from django.urls import path
from .views import TransferListCreateView, TransferDetailView, ApproveTransferView

urlpatterns = [
    path("",             TransferListCreateView.as_view(), name="transfer_list"),
    path("<int:pk>/",    TransferDetailView.as_view(),     name="transfer_detail"),
    path("<int:pk>/approve/", ApproveTransferView.as_view(), name="transfer_approve"),
]