from datetime import timedelta
from django.utils import timezone

from rest_framework import serializers, viewsets, permissions
from django.contrib import admin
from .models import Product, User, Auction, Bid

# SERIALIZERS

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

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.starting_price = validated_data.get('starting_price', instance.starting_price)
        instance.category = validated_data.get('category', instance.category)
        instance.image = validated_data.get('image', instance.image)
        
        # Update auction-related fields if they are provided
        auction = Auction.objects.filter(product=instance).order_by('-start_time').first()
        if auction:
            auction.status = validated_data.get('auction_status', auction.status)
            auction.end_time = validated_data.get('end_time', auction.end_time)
            auction.save()

        instance.save()

        return instance

    def create(self, validated_data):
        # Create the product
        product = Product.objects.create(**validated_data)

        # Optionally create an auction if needed
        Auction.objects.create(
            product=product,
            status='pending',
            start_time=validated_data.get('start_time', timezone.now()),  # Adjust for your start time logic
            end_time=validated_data.get('end_time', timezone.now() + timedelta(days=7))  # Default end time logic
        )
        return product




class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = ['id', 'product', 'start_time', 'end_time', 'status', 'created_at']

    def update(self, instance, validated_data):
        print("Updating auction:", instance)

        # Make sure 'end_time' is valid and can be converted to a DateTime object
        if 'end_time' in validated_data:
            try:
                # Ensure 'end_time' is a valid datetime string and can be parsed
                instance.end_time = validated_data['end_time']
            except ValueError:
                raise serializers.ValidationError("Invalid date format for 'end_time'")

        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance





class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'first_name', 'last_name', 'address', 'nic_number', 'profile_image']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class BidSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Bid
        fields = ['id', 'auction', 'product', 'bid_amount', 'bid_time', 'user', 'username']
        read_only_fields = ['user', 'bid_time']

