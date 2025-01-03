from django.test import TestCase

# Create your tests here.
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Company

class CommunicationAPITest(APITestCase):
    def test_create_communication(self):
        company = Company.objects.create(name="Test Company")
        payload = {
            "company": company.id,
            "communication_type": "Email",
            "date": "2025-01-01T12:00:00Z",
            "notes": "Follow-up call"
        }
        response = self.client.post('/api/communications/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], "Communication Added and Highlights Reset")
