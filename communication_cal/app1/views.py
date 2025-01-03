from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime
from rest_framework import status
from .models import Company, CommunicationMethod,Communication, CommunicationSchedule
from .serializers import CompanySerializer, CommunicationMethodSerializer,CommunicationSerializer, CommunicationScheduleSerializer,CompanyDetailSerializer
from django.utils.timezone import make_aware, now
from django.utils.timezone import now, is_naive, make_aware
import pytz
from rest_framework.views import APIView
from django.db.models import Prefetch


# Create your views here.
#def first_page(request):
 #   return HttpResponse("Hello world")


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().prefetch_related(
        # Prefetch the last five communications for each company
        Prefetch(
            'communications',
            queryset=Communication.objects.order_by('-date')[:5],  # Fetch last five communications
            to_attr='last_five_communications'  # Store as a custom attribute
        )
    )
    serializer_class = CompanySerializer
class CommunicationMethodViewSet(viewsets.ModelViewSet):
    queryset = CommunicationMethod.objects.all()
    serializer_class = CommunicationMethodSerializer

class CommunicationViewSet(viewsets.ModelViewSet):
    queryset = Communication.objects.all()
    serializer_class = CommunicationSerializer

    def create(self, request, *args, **kwargs):
        try:
            print("Request Data:", request.data)

        # Fetch company
            company = Company.objects.get(id=request.data['company'])

        # Create Communication
            communication = Communication.objects.create(
                company=company,
                communication_type=request.data['communication_type'],
                date=request.data['date'],  # Ensure date is valid and timezone-aware
                notes=request.data.get('notes', '')
            )
            print("Communication Created:", communication)

        # Update CommunicationSchedule Highlights
            current_time = now()
            schedules = CommunicationSchedule.objects.filter(company=company)
            for schedule in schedules:
                if is_naive(schedule.scheduled_date):
                    schedule.scheduled_date = make_aware(schedule.scheduled_date, pytz.UTC)

                if schedule.scheduled_date < current_time:
                    schedule.highlight = 'Red'
                elif schedule.scheduled_date.date() == current_time.date():
                    schedule.highlight = 'Yellow'
                else:
                    schedule.highlight = 'Green'
                schedule.save()

            return Response({"status": "Communication Added and Highlights Reset"}, status=201)

        except Company.DoesNotExist:
            print("Error: Company not found")
            return Response({"error": "Invalid company ID provided"}, status=400)

        except Exception as e:
            print("Error in create method:", str(e))
            return Response({"error": str(e)}, status=500)


class CommunicationScheduleViewSet(viewsets.ModelViewSet):
    queryset = CommunicationSchedule.objects.all()
    serializer_class = CommunicationScheduleSerializer

    def create(self, request, *args, **kwargs):
        company = Company.objects.get(id=request.data['company'])
        communication_method = CommunicationMethod.objects.get(id=request.data['communication_method'])

        # Step 1: Create a new communication schedule
        schedule = CommunicationSchedule.objects.create(
            company=company,
            communication_method=communication_method,
            scheduled_date=make_aware(request.data['scheduled_date']) if is_naive(request.data['scheduled_date']) else request.data['scheduled_date'],
            highlight='Green'
        )
        return Response({"status": "Schedule Added"})

class CompanyDetailView(APIView):
    def get(self, request, pk):
        try:
            company = Company.objects.get(id=pk)
            # Query for last 5 communications
            last_five_communications = company.communications.order_by('-date')[:5]
            
            # You can pass this data to the serializer if required
            serializer = CompanySerializer(company, context={'last_five_communications': last_five_communications})
            
            return Response(serializer.data)
        except Company.DoesNotExist:
            return Response({"error": "Company not found"}, status=404)