from django.urls import path
from .views import AuctionDetailView, AuctionListCreateView, BidDetailView, BidListCreateView, ProductDetailView, ProductListCreateView, UserDetailView, UserListCreateView, login_user, logout_user, register_user, UserBidsView

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),  # Endpoint to list and create products
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),  # Endpoint for a single product detail (GET, PUT, PATCH, DELETE),
    path('auctions/', AuctionListCreateView.as_view(), name='auction-list-create'),
    path('auctions/<int:pk>/', AuctionDetailView.as_view(), name='auction-detail'),
    
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    
    path('register/', register_user, name='register-user'),
    path('login/', login_user, name='login-user'),
    path('logout/', logout_user, name='logout-user'),
    path('auctions/<int:auction_id>/bids/', BidListCreateView.as_view(), name='bid-list-create'),
    path('bids/<int:pk>/', BidDetailView.as_view(), name='bid-detail'),
    path('users/<int:user_id>/bids/', UserBidsView.as_view(), name='user-bids'),
]
