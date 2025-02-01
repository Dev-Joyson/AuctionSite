from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Product, Auction, Bid
from .serializers import ProductSerializer, AuctionSerializer, UserSerializer, BidSerializer
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authentication import authenticate
from .permissions import IsOwnerOrReadOnly, IsAuthenticatedOrReadOnly
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.shortcuts import get_object_or_404
from .models import User, Product, Auction
from django.db.models import Count

# Product Views
class ProductListCreateView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data.setdefault('category', 'others')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Product
from .serializers import ProductSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Product
from .serializers import ProductSerializer
import logging

# Set up logging
logger = logging.getLogger(__name__)

class ProductDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        try:
            # Retrieve product by primary key and serialize it
            product = get_object_or_404(Product, pk=pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error fetching product {pk}: {e}")
            return Response({"error": "Product not found or an error occurred while fetching the product."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            # Retrieve the product and validate the provided data
            product = get_object_or_404(Product, pk=pk)
            serializer = ProductSerializer(product, data=request.data)

            # Validate the data
            if serializer.is_valid():
                # Set default values for missing fields
                serializer.validated_data.setdefault('category', 'others')
                serializer.validated_data.setdefault('auction_status', 'pending')
                serializer.validated_data.setdefault('end_time', None)  # Set None if not provided

                # Save the product with updated data
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error(f"Error updating product {pk}: {e}")
            return Response({"error": "An error occurred while updating the product. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, pk):
        try:
            # Partial update, update only the fields provided
            product = get_object_or_404(Product, pk=pk)
            serializer = ProductSerializer(product, data=request.data, partial=True)

            # Validate the data
            if serializer.is_valid():
                # Ensure missing auction-related fields are set to defaults
                if 'category' not in request.data:
                    serializer.validated_data.setdefault('category', 'others')
                if 'auction_status' not in request.data:
                    serializer.validated_data.setdefault('auction_status', 'pending')
                if 'end_time' not in request.data:
                    serializer.validated_data.setdefault('end_time', None)

                # Save the updated product
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(f"Error updating product {pk} via PATCH: {e}")
            return Response({"error": "An error occurred while partially updating the product. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            # Delete the product from the database
            product = get_object_or_404(Product, pk=pk)
            product.delete()
            return Response({"message": "Product deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            logger.error(f"Error deleting product {pk}: {e}")
            return Response({"error": "An error occurred while deleting the product. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Auction Views
class AuctionListCreateView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        auctions = Auction.objects.all()
        serializer = AuctionSerializer(auctions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AuctionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuctionDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]  # Update based on your permissions

    def get(self, request, pk):
        # Retrieve the auction by primary key
        auction = get_object_or_404(Auction, pk=pk)
        serializer = AuctionSerializer(auction)
        return Response(serializer.data)

    def patch(self, request, pk):
        # Retrieve the auction by primary key
        auction = get_object_or_404(Auction, pk=pk)

        # Serialize the data and validate
        serializer = AuctionSerializer(auction, data=request.data, partial=True)
        
        if serializer.is_valid():
            # Save the updated auction fields
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Views
class UserListCreateView(APIView):
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if request.user.id != pk:  # ✅ Prevents users from fetching other users' data
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        
        user = get_object_or_404(get_user_model(), pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

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



User = get_user_model()  # ✅ Make sure this works with your custom user model


@api_view(['POST'])
@permission_classes([AllowAny])  # Allow all users to access login
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')


    if not email or not password:
        return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Use Django's built-in authentication (ensures proper checks)
    user = authenticate(username=email, password=password)
    
    if user is None:
        return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

    # ✅ Generate token for authenticated user
    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        "token": token.key,
        "user_id": user.id,
        "user_role": user.user_role if hasattr(user, 'user_role') else "user",  # Adjust for your model
        "message": "Login successful"
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    try:
        # Deletes the user's authentication token
        request.user.auth_token.delete()
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Bid Views
class BidListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = BidSerializer

    def get_queryset(self):
        auction_id = self.kwargs['auction_id']
        return Bid.objects.filter(auction_id=auction_id).order_by('-bid_amount')[:5]


    def perform_create(self, serializer):
        auction = get_object_or_404(Auction, id=self.kwargs['auction_id'])  # ✅ Ensure auction exists
        serializer.save(user=self.request.user, auction=auction)  # ✅ Assign auction before saving


class BidDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = BidSerializer

    def get_queryset(self):
        return Bid.objects.all()


class UserBidsView(APIView):
    permission_classes = [IsAuthenticated]  # Allow only authenticated users

    def get(self, request, user_id):
        # Filter bids by user ID
        bids = Bid.objects.filter(user_id=user_id)
        # Serialize the bids
        serializer = BidSerializer(bids, many=True)
        return Response(serializer.data)



class DashboardStatsView(APIView):
    def get(self, request, *args, **kwargs):
        total_users = User.objects.count()
        total_products = Product.objects.count()
        active_auctions = Auction.objects.filter(status='active').count()
        finished_auctions = Auction.objects.filter(status='finished').count()
        
        # Count products grouped by category
        category_counts = Product.objects.values('category').annotate(count=Count('id')).order_by('category')
        categories = [item['category'] for item in category_counts]
        counts = [item['count'] for item in category_counts]

        return Response({
            "total_users": total_users,
            "total_products": total_products,
            "active_auctions": active_auctions,
            "finished_auctions": finished_auctions,
            "product_categories": categories,
            "product_category_counts": counts,
        })