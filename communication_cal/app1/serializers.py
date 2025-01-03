from rest_framework import serializers
from .models import Company, CommunicationMethod,Communication, CommunicationSchedule




class CommunicationMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunicationMethod
        fields = '__all__'

class CommunicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Communication
        fields = ['id',  'communication_type', 'date', 'notes']
    
    def validate(self, data):
        # Ensure date is in the future or present
        if data['date'] < timezone.now():
            raise serializers.ValidationError("Date cannot be in the past.")
        return data



class CommunicationScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunicationSchedule
        fields = ['id', 'company', 'communication_method', 'scheduled_date','highlight']

class CompanyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):
    last_five_communications = CommunicationSerializer(many=True)
    
    # Serialize scheduled communications
    scheduled_communications = CommunicationScheduleSerializer(many=True, source='communication_schedule')  # Correct the field here

    class Meta:
        model = Company
        fields = ['id', 'name', 'location', 'linkedin_profile', 'emails', 'phone_numbers', 
                  'comments', 'communication_periodicity', 'last_five_communications', 
                  'scheduled_communications']