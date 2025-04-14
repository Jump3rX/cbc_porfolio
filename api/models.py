from django.db import models

# Create your models here.
class StudentPortfolio(models.Model):
    student_name = models.CharField(max_length=20)
    reg_number = models.CharField(max_length=20)
    grade = models.CharField(max_length=20)
    subject = models.CharField(max_length=20)
    files = models.FileField(upload_to='uploads')
    uploaded_by = models.CharField(max_length=20, null=True)
    description = models.TextField(null=True)
    parent_comment = models.TextField(null=True)
    
    def __str__(self):
        return f"{self.student_name} - {self.subject} ({self.grade})"
