from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('commodities', 'Commodities'),
        ('electronics', 'Electronics'),
        ('apparels', 'Apparels'),
        ('vehicles', 'Vehicles'),
        ('property', 'Property'),
        ('art', 'Art'),
        ('others', 'Others'),  # New category
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    starting_price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='others')  # Default set to 'Others'
    created_at = models.DateTimeField(auto_now_add=True)

class Auction(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('held', 'Held'),
        ('finished', 'Finished'),
    ]
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
