from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('commodities', 'Commodities'),
        ('electronics', 'Electronics'),
        ('apparels', 'Apparels'),
        ('vehicles', 'Vehicles'),
        ('property', 'Property'),
        ('art', 'Art'),
        ('others', 'Others'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    starting_price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='others')
    image = models.URLField(default="https://cdn2.iconfinder.com/data/icons/creative-icons-2/64/PACKAGING_DESIGN-1024.png")  # Default image URL
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, username, password, **extra_fields)

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    address = models.CharField(max_length=191)
    nic_number = models.CharField(max_length=15, unique=True)
    profile_image = models.URLField(blank=True)
    user_role = models.CharField(max_length=5, choices=[('Admin', 'Admin'), ('User', 'User')], default='User')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.email

class Auction(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name="auctions")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length=10, choices=[('pending', 'Pending'), ('active', 'Active'), ('finished', 'Finished')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Auction for {self.product.name}"


class Bid(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bids")
    auction = models.ForeignKey('Auction', on_delete=models.CASCADE, related_name="bids",null=True)  # Ensure this field exists
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    bid_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-bid_time']

    def __str__(self):
        return f"{self.user.username} - {self.bid_amount}"