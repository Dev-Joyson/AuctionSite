from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Product, Auction
from .serializers import ProductSerializer, AuctionSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view

# Product Views
class ProductListCreateView(APIView):
    def get(self, request):
        products = Product.objects.all()

        # Filter by category if provided
        category = request.query_params.get('category', None)
        if category:
            products = products.filter(category=category)

        # Filter by price range if provided
        min_price = request.query_params.get('min_price', None)
        if min_price:
            products = products.filter(starting_price__gte=min_price)

        max_price = request.query_params.get('max_price', None)
        if max_price:
            products = products.filter(starting_price__lte=max_price)

        # Sort by creation date if requested
        sort_by = request.query_params.get('sort_by', None)
        if sort_by == 'created_at':
            products = products.order_by('created_at')
        elif sort_by == '-created_at':
            products = products.order_by('-created_at')

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Handle image URL
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            # Set default category if not provided
            if 'category' not in serializer.validated_data:
                serializer.validated_data['category'] = 'others'
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductDetailView(APIView):
    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            # Ensure default category is set if not provided
            if 'category' not in serializer.validated_data:
                serializer.validated_data['category'] = 'others'
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        product.delete()
        return Response({"message": "Product deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


# Auction Views
class AuctionListCreateView(APIView):
    def get(self, request):
        auctions = Auction.objects.all()

        # Filter by status if provided
        status_filter = request.query_params.get('status', None)
        if status_filter:
            auctions = auctions.filter(status=status_filter)

        # Filter by product if provided
        product_filter = request.query_params.get('product', None)
        if product_filter:
            auctions = auctions.filter(product_id=product_filter)

        # Sort by creation date if requested
        sort_by = request.query_params.get('sort_by', None)
        if sort_by == 'created_at':
            auctions = auctions.order_by('created_at')
        elif sort_by == '-created_at':
            auctions = auctions.order_by('-created_at')

        serializer = AuctionSerializer(auctions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AuctionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AuctionDetailView(APIView):
    def get(self, request, pk):
        auction = get_object_or_404(Auction, pk=pk)
        serializer = AuctionSerializer(auction)
        return Response(serializer.data)

    def put(self, request, pk):
        auction = get_object_or_404(Auction, pk=pk)
        serializer = AuctionSerializer(auction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        auction = get_object_or_404(Auction, pk=pk)
        serializer = AuctionSerializer(auction, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        auction = get_object_or_404(Auction, pk=pk)
        auction.delete()
        return Response({"message": "Auction deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


# User Views
class UserListCreateView(APIView):
    def get(self, request):
        users = get_user_model().objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    def get(self, request, pk):
        user = get_user_model().objects.get(pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = get_user_model().objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        user = get_user_model().objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = get_user_model().objects.get(pk=pk)
        user.delete()
        return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)



@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

