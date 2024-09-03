from django.shortcuts import render,  get_object_or_404, redirect
from .models import Service
from .form import OrderForm
from .models import Blog, Comment
from .form import CommentForm
from django.views.decorators.http import require_POST
from django.shortcuts import render, redirect
from django.core.mail import EmailMessage, BadHeaderError
from django.http import HttpResponse
from django.conf import settings


# Create your views here.
def home(request):
   services = Service.objects.all()
   return render(request, 'home.html', {'services': services})

def about(request):
    return render(request, 'about.html')

def myservices(request):
    return render(request, 'services.html')

def pricing(request):
    return render(request, 'pricing.html')

def contactus(request):
    if request.method == 'POST':
        email = request.POST['email']
        message = request.POST['message']

        try:
            email_message = EmailMessage(
                subject=email + " " + 'Urban Research Contact Form Submission',
                body=message,
                from_email=settings.EMAIL_HOST_USER,  # Sender's email (to satisfy email server requirements)
                to=[settings.EMAIL_HOST_USER],  # Recipient's email
                headers={'Reply-To': email, 'From': email},  # Display user's email in the From header
            )
            email_message.send(fail_silently=False)
            return redirect('contact_thanks')

        except BadHeaderError:
            return HttpResponse('Invalid header found.')
        except ConnectionRefusedError:
            return HttpResponse('Could not connect to the email server. Please try again later.')
        except Exception as e:
            return HttpResponse(f'An error occurred: {e}')

    return render(request, 'contactus.html')

def contact_thanks(request):
    return render(request, 'contact_thanks.html')

def guarantee(request):
    return render(request, 'guarantee.html')

def privacy_policy(request):
    return render(request, 'privacy_policy.html')

def assignment_assistance(request):
    return render(request, 'assignment_assistance.html')

def academic_essay(request):
    return render(request, 'academic_essay.html')

def academic_coursework(request):
    return render(request, 'academic_coursework.html')

def personalised_writing(request):
    return render(request, 'personalised_writing.html')

def professional_report_assistance(request):
    return render(request, 'professional_report_assistance.html')

def thesis_and_dissertation(request):
    return render(request, 'thesis_and_dissertation.html')
   
def service_details(request, service_id):
   service = Service.objects.get(id=service_id)
   return render(request, 'service_details.html', {'service': service})

def order_form(request):
    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('order_success')  # Redirect to a success page
    else:
        form = OrderForm()

    # This code will run for both GET and POST (if the form is not valid)
    services = Service.objects.all()
    page_range = range(1, 51)  # Create a range from 1 to 50

    return render(request, 'order_form.html', {
        'form': form,
        'services': services,
        'page_range': page_range  # Pass the range to the template context
    })


def order_success(request):
    return render(request, 'order_success.html')

def blog_list(request):
    blogs = Blog.objects.all().order_by('-created_at')
    return render(request, 'blog_list.html', {'blogs': blogs})

def blog_detail(request, blog_id):
    blog = get_object_or_404(Blog, id=blog_id)
    comments = blog.comments.filter(approved=True)
    new_comment = None

    session_key = f'voted_blog_{blog_id}'
    has_voted = request.session.get(session_key, False)

    if request.method == 'POST':
        comment_form = CommentForm(data=request.POST)
        if comment_form.is_valid():
            new_comment = comment_form.save(commit=False)
            new_comment.blog = blog
            new_comment.save()
            return redirect('blog_detail', blog_id=blog_id)
    else:
        comment_form = CommentForm()

    return render(request, 'blog_detail.html', {
        'blog': blog,
        'comments': comments,
        'new_comment': new_comment,
        'comment_form': comment_form,
        'has_voted': has_voted,
    })

@require_POST
def upvote_blog(request, blog_id):
    blog = get_object_or_404(Blog, id=blog_id)
    session_key = f'voted_blog_{blog_id}'
    if not request.session.get(session_key, False):
        blog.upvotes += 1
        blog.save()
        request.session[session_key] = True
    return redirect('blog_detail', blog_id=blog_id)

@require_POST
def downvote_blog(request, blog_id):
    blog = get_object_or_404(Blog, id=blog_id)
    session_key = f'voted_blog_{blog_id}'
    if not request.session.get(session_key, False):
        blog.downvotes += 1
        blog.save()
        request.session[session_key] = True
    return redirect('blog_detail', blog_id=blog_id)