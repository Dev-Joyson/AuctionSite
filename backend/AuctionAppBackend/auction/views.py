from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Product, Auction
from .serializers import ProductSerializer, AuctionSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authentication import authenticate

# Product Views
class ProductListCreateView(APIView):
    def get(self, request):
        products = Product.objects.all()

        # Filter by category if provided
        category = request.query_params.get('category')
        if category:
            products = products.filter(category=category)

        # Filter by price range if provided
        min_price = request.query_params.get('min_price')
        if min_price:
            products = products.filter(starting_price__gte=min_price)

        max_price = request.query_params.get('max_price')
        if max_price:
            products = products.filter(starting_price__lte=max_price)

        # Sort by creation date if requested
        sort_by = request.query_params.get('sort_by')
        if sort_by in ['created_at', '-created_at']:
            products = products.order_by(sort_by)

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data.setdefault('category', 'others')
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
            serializer.validated_data.setdefault('category', 'others')
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
        status_filter = request.query_params.get('status')
        if status_filter:
            auctions = auctions.filter(status=status_filter)

        # Filter by product if provided
        product_filter = request.query_params.get('product')
        if product_filter:
            auctions = auctions.filter(product_id=product_filter)

        # Sort by creation date if requested
        sort_by = request.query_params.get('sort_by')
        if sort_by in ['created_at', '-created_at']:
            auctions = auctions.order_by(sort_by)

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
    permission_classes = []

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
        user = get_object_or_404(get_user_model(), pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = get_object_or_404(get_user_model(), pk=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        user = get_object_or_404(get_user_model(), pk=pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = get_object_or_404(get_user_model(), pk=pk)
        user.delete()
        return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(email=email, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user_role": user.user_role,
            "message": "Login successful"
        }, status=status.HTTP_200_OK)
    return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    try:
        request.user.auth_token.delete()
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
