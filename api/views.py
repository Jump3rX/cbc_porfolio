from rest_framework. decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import StudentPortfolio
from .serializers import StudentPortfolioSerializer

# Create your views here.

@api_view(['GET'])
def home(request):

    urls = {
        'home':'api/',
    }

    return Response(urls)


@api_view(['POST'])
def addStudentPortfolio(request):
    details = StudentPortfolioSerializer(data=request.data)
    if details.is_valid():
        details.save()
        return Response({'message':"Saved!"}, status=status.HTTP_200_OK)
    else:
        print(details.errors)
        return Response({'message':"Not Saved!"}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def viewPortfolios(request):
    porfolios = StudentPortfolio.objects.all()
    serializer = StudentPortfolioSerializer(porfolios,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPortfolio(request):
    # Get the search query parameter (either student name or registration number)
    query = request.GET.get('query', None)

    if query:
        # If query exists, filter portfolios based on student name or registration number
        portfolios = StudentPortfolio.objects.filter(
            student_name__icontains=query
        ) | StudentPortfolio.objects.filter(
            reg_number__icontains=query
        )
    else:
        # If no query is provided, return all portfolios
        portfolios = StudentPortfolio.objects.all()

    # Serialize the portfolio data
    serializer = StudentPortfolioSerializer(portfolios, many=True)

    # Return the serialized data
    return Response(serializer.data)

@api_view(['POST'])
def addComment(request):
    try:
        # Extract portfolioId and comment from request data
        portfolio_id = request.data.get('portfolioId')
        comment = request.data.get('comment')

        # Validate input
        if not portfolio_id or not comment:
            return Response(
                {'error': 'portfolioId and comment are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Find the portfolio
        try:
            portfolio = StudentPortfolio.objects.get(id=portfolio_id)
        except StudentPortfolio.DoesNotExist:
            return Response(
                {'error': 'Portfolio not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Update the parent_comment field
        portfolio.parent_comment = comment
        portfolio.save()

        return Response(
            {'message': 'Comment added successfully'},
            status=status.HTTP_200_OK
        )

    except Exception as e:
        return Response(
            {'error': f'Failed to add comment: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )