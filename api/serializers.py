from rest_framework import serializers
from .models import StudentPortfolio

class StudentPortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentPortfolio
        fields = "__all__"
        
         