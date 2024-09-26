from django.shortcuts import render,  get_object_or_404, redirect
from .models import Service
from django.http import JsonResponse
from .form import OrderForm
from .models import Blog, Comment
from .form import CommentForm
from django.views.decorators.http import require_POST
from django.shortcuts import render, redirect
from django.core.mail import EmailMessage, BadHeaderError
from django.http import HttpResponse
from django.conf import settings
import requests

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

def get_subservices(request):
    service = request.GET.get('service')
    subservices = OrderForm.SUBSERVICE_CHOICES.get(service, [])
    return JsonResponse({'subservices': subservices})

def order_form(request):
    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            # Extract necessary data from the form
            payment_method = form.cleaned_data['payment_method']
            
            # Redirect to the appropriate payment view based on the payment method selected
            if payment_method == 'paystack':
                return redirect('paystack_payment_view')  # Redirect to Paystack payment view
            elif payment_method == 'crypto':
                return redirect('crypto_payment_view')  # Redirect to crypto payment view
        
        # If form is invalid, render the form again with errors
        return render(request, 'order_form.html', {'form': form})
    
    # For GET requests, initialize an empty form
    form = OrderForm()
    return render(request, 'order_form.html', {'form': form})
   

# Paystack payment view
def paystack_payment_view(request):
    if request.method == 'POST':
        # Ensure the user is authenticated or use a provided email
        user_email = request.user.email if request.user.is_authenticated else request.POST.get('email')

        paystack_secret_key = settings.PAYSTACK_SECRET_KEY
        headers = {
            'Authorization': f'Bearer {paystack_secret_key}',
            'Content-Type': 'application/json'
        }
        
        # Generate the payment data
        payment_data = {
            'email': user_email,  # User's email
            'amount': 1000 * 100,  # Amount in kobo (Naira is multiplied by 100)
            'callback_url': request.build_absolute_uri('/payment/callback/')  # URL to handle the callback
        }
        
        # Send payment request to Paystack
        response = requests.post('https://api.paystack.co/transaction/initialize', json=payment_data, headers=headers)
        response_data = response.json()
        
        # Redirect to Paystack payment page
        if response_data['status']:
            payment_url = response_data['data']['authorization_url']
            return redirect(payment_url)
        else:
            # Handle the error
            return redirect('payment_error_view')  # Redirect to an error view if payment fails

    return render(request, 'paystack_payment.html')  # Render payment template for GET requests
    
# Crypto payment view
def crypto_payment_view(request):
    if request.method == 'POST':
        coinbase_api_key = settings.COINBASE_API_KEY
        headers = {
            'X-CC-Api-Key': coinbase_api_key,
            'X-CC-Version': '2018-03-22'
        }

        # Get the calculated amount (ensure this is replaced with your calculated amount)
        amount = request.POST.get('amount', '10.00')  # Default amount as an example; replace accordingly
        
        # Generate payment data
        payment_data = {
            'name': 'Order Payment',
            'description': 'Order payment via cryptocurrency',
            'pricing_type': 'fixed_price',
            'local_price': {
                'amount': amount,  # Use the calculated amount
                'currency': 'USD'
            },
            'redirect_url': request.build_absolute_uri('/payment/success/'),
            'cancel_url': request.build_absolute_uri('/payment/cancel/')
        }

        # Send request to Coinbase Commerce API
        response = requests.post('https://api.commerce.coinbase.com/charges', json=payment_data, headers=headers)
        response_data = response.json()
        
        if response.status_code == 201:
            # Redirect to the Coinbase checkout page
            payment_url = response_data['data']['hosted_url']
            return redirect(payment_url)
        else:
            # Handle error
            return redirect('payment_error_view')  # Redirect to error view if request fails

    return render(request, 'crypto_payment.html')  # Render payment template for GET requests
    
def payment_error_view(request):
    return render(request, 'payment_error.html')

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