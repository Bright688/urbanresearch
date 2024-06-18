from django.contrib import admin
from .models import Blog, Comment

# Register your models here.
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'upvotes', 'downvotes')
    search_fields = ('title', 'content')

admin.site.register(Blog, BlogAdmin)
admin.site.register(Comment)