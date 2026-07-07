from rest_framework import serializers
from .models import LeaveType, LeaveBalance, LeaveRequest, LeaveApproval


class LeaveTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model  = LeaveType
        fields = '__all__'


class LeaveBalanceSerializer(serializers.ModelSerializer):
    leave_type_name = serializers.ReadOnlyField(source='leave_type.name')
    remaining_days  = serializers.ReadOnlyField()

    class Meta:
        model  = LeaveBalance
        fields = '__all__'


class LeaveRequestSerializer(serializers.ModelSerializer):
    employee_name  = serializers.ReadOnlyField(source='employee.full_name')
    leave_type_name= serializers.ReadOnlyField(source='leave_type.name')
    approvals      = serializers.SerializerMethodField()

    class Meta:
        model  = LeaveRequest
        fields = '__all__'
        read_only_fields = ['employee', 'status', 'applied_at']

    def get_approvals(self, obj):
        return LeaveApprovalSerializer(obj.approvals.all(), many=True).data

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['employee'] = user.employee_profile
        return super().create(validated_data)

    def validate(self, attrs):
        if attrs['end_date'] < attrs['start_date']:
            raise serializers.ValidationError({'end_date': 'End date must be after start date.'})
        return attrs


class LeaveApprovalSerializer(serializers.ModelSerializer):
    approver_name = serializers.ReadOnlyField(source='approver.full_name')

    class Meta:
        model  = LeaveApproval
        fields = '__all__'
        read_only_fields = ['approver', 'decided_at']