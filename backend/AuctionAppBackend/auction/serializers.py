from rest_framework import serializers, viewsets, permissions
from django.contrib import admin
from .models import Product, User, Auction, Bid

# SERIALIZERS

from rest_framework import serializers
from .models import Product, Auction

class ProductSerializer(serializers.ModelSerializer):
    auction_status = serializers.SerializerMethodField()
    end_time = serializers.SerializerMethodField()
    auction_id = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'starting_price', 'category', 'image', 'created_at', 'auction_status', 'end_time', 'auction_id']

    def get_auction_status(self, obj):
        auction = Auction.objects.filter(product=obj).order_by('-start_time').first()
        return auction.status if auction else "No Auction"

    def get_end_time(self, obj):
        auction = Auction.objects.filter(product=obj).order_by('-start_time').first()
        return auction.end_time if auction else "No end time"

    def get_auction_id(self, obj):
        auction = Auction.objects.filter(product=obj).order_by('-start_time').first()
        return auction.id if auction else "No auction"


class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'first_name', 'last_name', 'address', 'nic_number', 'profile_image']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user



class BidSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Bid
        fields = ['id', 'auction', 'bid_amount', 'bid_time', 'user', 'username']
        read_only_fields = ['user', 'bid_time']
