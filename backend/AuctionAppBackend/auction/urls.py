from django.urls import path
from .views import DashboardView, ProductDetailView, ProductListCreateView, AuctionListCreateView

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('auctions/', AuctionListCreateView.as_view(), name='auction-list-create'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),

]
