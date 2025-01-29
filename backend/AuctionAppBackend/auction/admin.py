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
    list_display = ('user', 'product', 'bid_amount', 'bid_time')
    list_filter = ('product', 'bid_time')
    search_fields = ('user__username', 'product__name')
