from django.db import models
from django.utils import timezone
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.db import connection


# Create your models here.

class Company(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    linkedin_profile = models.URLField(max_length=500, blank=True, null=True)
    emails = models.TextField()  # Use a JSON structure for multiple emails
    phone_numbers = models.TextField()  # JSON structure for multiple numbers
    comments = models.TextField(blank=True, null=True)
    communication_periodicity = models.CharField(max_length=100, default="2 weeks")

class CommunicationMethod(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    sequence = models.IntegerField()
    mandatory = models.BooleanField(default=False)

class Communication(models.Model):
    COMMUNICATION_TYPE_CHOICES = [
        ('LinkedIn Post', 'LinkedIn Post'),
        ('LinkedIn Message', 'LinkedIn Message'),
        ('Email', 'Email'),
        ('Phone Call', 'Phone Call'),
        ('Other', 'Other'),
    ]

    company = models.ForeignKey(Company, related_name='communications', on_delete=models.CASCADE)
    communication_type = models.CharField(max_length=255, choices=COMMUNICATION_TYPE_CHOICES)
    date = models.DateTimeField()
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.communication_type} with {self.company.name}"


class CommunicationSchedule(models.Model):
    company = models.ForeignKey(Company, related_name='communication_schedule', on_delete=models.CASCADE)
    communication_method = models.ForeignKey(CommunicationMethod, on_delete=models.CASCADE)
    scheduled_date = models.DateTimeField()
    highlight = models.CharField(max_length=10, default='Green')  # Red, Yellow, Green

    def __str__(self):
        return f"{self.communication_method.name} with {self.company.name} scheduled for {self.scheduled_date}, highlight: {self.highlight}"
   
    
    def update_highlight(self):
        now = timezone.now()
        if self.scheduled_date < now:
            self.highlight = 'Red'  # Overdue
        elif self.scheduled_date.date() == now.date():
            self.highlight = 'Yellow'  # Due today
        else:
            self.highlight = 'Green'  # On schedule
        self.save()
    
    def __str__(self):
        return f"{self.communication_method.name} with {self.company.name} scheduled for {self.scheduled_date}, highlight: {self.highlight}"