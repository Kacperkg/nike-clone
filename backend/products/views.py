from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer


class ProductListView(generics.ListAPIView):
    """GET /api/products/ — list all products, filterable by category"""
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.prefetch_related("images").all()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        product_type = self.request.query_params.get("type")
        if product_type:
            queryset = queryset.filter(product_type=product_type)
        subcategory = self.request.query_params.get("subcategory")
        if subcategory:
            queryset = queryset.filter(subcategory=subcategory)
        featured = self.request.query_params.get("featured")
        if featured == "true":
            queryset = queryset.filter(is_featured=True)
        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    """GET /api/products/<id>/ — single product detail"""
    queryset = Product.objects.prefetch_related("images").all()
    serializer_class = ProductSerializer