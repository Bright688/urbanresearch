from django.shortcuts import render,  get_object_or_404, redirect
from .models import Service
from .form import OrderForm
from .models import Blog, Comment
from .form import CommentForm
from django.views.decorators.http import require_POST

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

def contact(request):
    return render(request, 'contact.html')

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
        services = Service.objects.all()
        return render(request, 'order_form.html', {'form': form, 'services': services})

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