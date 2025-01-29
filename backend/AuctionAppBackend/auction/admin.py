from django.contrib import admin
from .models import Product, User, Auction



@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'starting_price', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'description')


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'user_role', 'is_active')
    list_filter = ('user_role', 'is_active')
    search_fields = ('email', 'username', 'nic_number')


@admin.register(Auction)
class AuctionAdmin(admin.ModelAdmin):
    list_display = ('product', 'start_time', 'end_time', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('product__name',)

from .models import Bid

@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    list_display = ('user', 'auction', 'bid_amount', 'bid_time')  # Ensure these fields exist in the model
    list_filter = ('auction', 'bid_time')  # Filter by valid fields
    search_fields = ('user__username', 'auction__product__name')  # Allow searching by related fields
