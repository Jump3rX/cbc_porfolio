from django.urls import path,re_path
from django.views.generic import TemplateView
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #path('/',views.home, name='home'),
    # path('api/add-portfolio',views.addStudentPortfolio),
    # path('api/view-portfolios',views.viewPortfolios),
    # path('api/get-portfolio/',views.getPortfolio),
    # path('api/add-comment',views.addComment),


    path('add-portfolio',views.addStudentPortfolio),
    path('view-portfolios',views.viewPortfolios),
    path('get-portfolio/',views.getPortfolio),
    path('add-comment',views.addComment),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)