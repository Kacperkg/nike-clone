from django.db import models


class Product(models.Model):
    CATEGORY_CHOICES = [
        ("men", "Men"),
        ("women", "Women"),
        ("kids", "Kids"),
    ]

    PRODUCT_TYPE_CHOICES = [
        ("shoes", "Shoes"),
        ("clothing", "Clothing"),
        ("accessories", "Accessories"),
    ]

    SUBCATEGORY_CHOICES = [
        # Shoes
        ("lifestyle", "Lifestyle"),
        ("jordan", "Jordan"),
        ("running", "Running"),
        ("football", "Football"),
        ("basketball", "Basketball"),
        ("training-gym", "Training and Gym"),
        ("skateboarding", "Skateboarding"),
        ("custom-shoes", "Custom Shoes"),
        # Clothing
        ("hoodies-sweatshirts", "Hoodies and Sweatshirts"),
        ("trousers-tights", "Trousers and Tights"),
        ("tracksuits", "Tracksuits"),
        ("jackets", "Jackets"),
        ("tops-tshirts", "Tops and T-Shirts"),
        ("shorts", "Shorts"),
    ]

    name = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    product_type = models.CharField(
        max_length=20, choices=PRODUCT_TYPE_CHOICES, default="shoes"
    )
    subcategory = models.CharField(
        max_length=30, choices=SUBCATEGORY_CHOICES, blank=True
    )
    image = models.URLField(max_length=500, help_text="Main product image URL")
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    image = models.URLField(max_length=500)
    alt_text = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return f"{self.product.name} - image"