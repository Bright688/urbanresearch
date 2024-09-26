from django.db import models
from django.utils import timezone
from ckeditor_uploader.fields import RichTextUploadingField
from django.contrib.auth.models import User 

# Create your models here.
class Service(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    base_price_per_page = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class SubService(models.Model):
    category = models.ForeignKey(ServiceCategory, related_name='sub_services', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price_per_page = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)  # Optional
    name = models.CharField(max_length=100)
    email = models.EmailField()
    service_category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE)
    sub_service = models.ForeignKey(SubService, on_delete=models.CASCADE)
    num_pages = models.PositiveIntegerField()
    deadline_date = models.DateField()
    deadline_days = models.PositiveIntegerField()
    currency = models.CharField(max_length=3, choices=[
        ('USD', 'USD'),
        ('EUR', 'EUR'),
        ('GBP', 'GBP'),
        ('AUD', 'AUD'),
        ('CAD', 'CAD'),
        ('JPY', 'JPY'),
        ('INR', 'INR'),
        ('NGN', 'NGN'),
    ], default='USD')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=[
        ('creditcard', 'Credit Card'),
        ('crypto', 'Cryptocurrency'),
    ])
    
    terms_accepted = models.BooleanField()

    def save(self, *args, **kwargs):
        # Logic to calculate total_price based on num_pages, service_category, sub_service, and deadline_days
        # This could also include any additional logic for currency conversion, deadline adjustments, etc.
        self.total_price = self.calculate_total_price()
        super().save(*args, **kwargs)

    def calculate_total_price(self):
        # Implement your pricing calculation logic here
        base_price = self.sub_service.price_per_page
        deadline_adjustment = self.get_deadline_adjustment()
        total_price = base_price * self.num_pages * deadline_adjustment
        # Apply currency conversion if necessary
        # total_price *= exchange_rates[self.currency]
        return total_price

    def get_deadline_adjustment(self):
        if self.deadline_days <= 3:
            return 1.7
        elif self.deadline_days <= 6:
            return 1.5
        elif self.deadline_days <= 9:
            return 1.15
        return 1

    def __str__(self):
        return f"Order by {self.name} - {self.service_category.name}"
    
class Blog(models.Model):
    title = models.CharField(max_length=200)
    content = RichTextUploadingField()
    author = models.CharField(max_length=100)
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    blog = models.ForeignKey(Blog, related_name='comments', on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    email = models.EmailField()
    body = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    approved = models.BooleanField(default=True)

    def __str__(self):
        return f'Comment by {self.name} on {self.blog}'