from django.contrib import admin
from .models import Product, User, Auction, Bid  # Keep imports grouped


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'starting_price', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'description')
    ordering = ('-created_at',)  # Sort by newest first


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'user_role', 'is_active')
    list_filter = ('user_role', 'is_active')
    search_fields = ('email', 'username', 'nic_number')
    ordering = ('-is_active', 'username')  # Active users appear first


@admin.register(Auction)
class AuctionAdmin(admin.ModelAdmin):
    list_display = ('product', 'start_time', 'end_time', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('product__name',)
    ordering = ('-created_at',)  # Show latest auctions first


@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_product_name', 'bid_amount', 'bid_time')
    list_filter = ('auction__product', 'bid_time')  # Corrected to filter by the product through the auction
    search_fields = ('user__username', 'auction__product__name')  # Searching by product name through auction
    ordering = ('-bid_time',)  # Show most recent bids first

    def get_product_name(self, obj):
        return obj.auction.product.name  # Accessing product name via the related auction
    get_product_name.admin_order_field = 'auction__product__name'  # Allow sorting by product name
    get_product_name.short_description = 'Product'  # Display name in admin
