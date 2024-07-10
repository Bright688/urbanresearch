from django.urls import path
from services.views import service_details, order_form, home, about, myservices, blog_list, blog_detail, upvote_blog, downvote_blog, contact, order_success, pricing, guarantee, privacy_policy, assignment_assistance, academic_essay, academic_coursework, thesis_and_dissertation, personalised_writing, professional_report

urlpatterns = [
    
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('services/', myservices, name='services'),
    path('contact/', contact, name='contact'),
    path('service/<int:service_id>/', service_details, name='service_details'),
    path('pricing/', pricing, name='pricing'),
    path('guarantee/', guarantee, name='guarantee'),
    path('privacy_policy/', privacy_policy, name='privacy_policy'),
    path('academic_essay/', academic_essay, name='academic_essay'),
    path('assignment_assistance/', assignment_assistance, name='assignment_assistance'),
    path('academic_coursework/', academic_coursework, name='academic_coursework'),
    path('personalised_writing/', personalised_writing, name='personalised_writing'),
    path('thesis_and_dissertation/', thesis_and_dissertation, name='thesis_and_dissertation'),
     path('professional_report/', professional_report, name='professional_report'),
    path('blog/', blog_list, name='blog'),
    path('blog/<int:blog_id>/', blog_detail, name='blog_detail'),
    path('blog/<int:blog_id>/upvote/', upvote_blog, name='upvote_blog'),
    path('blog/<int:blog_id>/downvote/', downvote_blog, name='downvote_blog'),
    path('order/', order_form, name='order_form'),
    path('order/success/', order_success, name='order_success'),  # Success page
   
]

