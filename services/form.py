from django import forms
from .models import Order, Comment


class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['client_name', 'client_email', 'service', 'description', 'payment_type']
        widgets = {
            'service': forms.Select(attrs={'onchange': 'updatePrice()'}),
        }

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('name', 'email', 'body')