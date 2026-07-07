from rest_framework import generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import ManpowerPlan, EstablishmentPost
from .serializers import ManpowerPlanSerializer, EstablishmentPostSerializer
from apps.authentication.permissions import IsHROrAdmin, IsDepartmentHeadOrAbove, IsManagement


class ManpowerPlanListCreateView(generics.ListCreateAPIView):
    queryset           = ManpowerPlan.objects.select_related("department","submitted_by").all()
    serializer_class   = ManpowerPlanSerializer
    permission_classes = [IsDepartmentHeadOrAbove]
    filter_backends    = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields   = ["status","department","financial_year"]
    search_fields      = ["title","department__name"]


class ManpowerPlanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset           = ManpowerPlan.objects.all()
    serializer_class   = ManpowerPlanSerializer
    permission_classes = [IsDepartmentHeadOrAbove]


class ApproveManpowerPlanView(APIView):
    permission_classes = [IsManagement]

    def post(self, request, pk):
        try:
            plan = ManpowerPlan.objects.get(pk=pk)
        except ManpowerPlan.DoesNotExist:
            return Response({"detail":"Not found."}, status=404)
        decision = request.data.get("decision")
        if decision not in ("approved","rejected"):
            return Response({"detail":"Invalid decision."}, status=400)
        plan.status      = decision
        plan.approved_by = request.user
        plan.save()
        return Response({"detail": f"Plan {decision}."})


class EstablishmentPostListCreateView(generics.ListCreateAPIView):
    queryset           = EstablishmentPost.objects.all()
    serializer_class   = EstablishmentPostSerializer
    permission_classes = [IsDepartmentHeadOrAbove]
    filter_backends    = [DjangoFilterBackend]
    filterset_fields   = ["status","manpower_plan","position"]


class EstablishmentPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset           = EstablishmentPost.objects.all()
    serializer_class   = EstablishmentPostSerializer
    permission_classes = [IsHROrAdmin]