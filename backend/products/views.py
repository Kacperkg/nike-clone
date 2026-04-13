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

        # Price range
        price_min = self.request.query_params.get("price_min")
        if price_min:
            try:
                queryset = queryset.filter(price__gte=float(price_min))
            except ValueError:
                pass
        price_max = self.request.query_params.get("price_max")
        if price_max:
            try:
                queryset = queryset.filter(price__lte=float(price_max))
            except ValueError:
                pass

        # Sorting
        sort_by = self.request.query_params.get("sort_by")
        sort_map = {
            "price_asc": "price",
            "price_desc": "-price",
            "newest": "-created_at",
        }
        if sort_by in sort_map:
            queryset = queryset.order_by(sort_map[sort_by])

        # Max number of results
        limit = self.request.query_params.get("limit")
        if limit:
            try:
                queryset = queryset[:int(limit)]
            except ValueError:
                pass

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    """GET /api/products/<id>/ — single product detail"""
    queryset = Product.objects.prefetch_related("images").all()
    serializer_class = ProductSerializer