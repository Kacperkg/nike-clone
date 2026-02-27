from django.contrib import admin
from .models import Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "price", "category", "is_featured"]
    list_filter = ["category", "is_featured"]
    search_fields = ["name"]
    inlines = [ProductImageInline]