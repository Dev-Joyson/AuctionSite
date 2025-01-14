from django.urls import path
from .views import AuctionDetailView, AuctionListCreateView, ProductDetailView, ProductListCreateView, UserDetailView, UserListCreateView, register_user

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),  # Endpoint to list and create products
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),  # Endpoint for a single product detail (GET, PUT, PATCH, DELETE),
    path('auctions/', AuctionListCreateView.as_view(), name='auction-list-create'),
    path('auctions/<int:pk>/', AuctionDetailView.as_view(), name='auction-detail'),
    
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    
    path('register/', register_user, name='register-user'),
]
