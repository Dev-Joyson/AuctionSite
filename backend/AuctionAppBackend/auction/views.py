from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Auction
from .serializers import ProductSerializer, AuctionSerializer
from django.shortcuts import get_object_or_404

class ProductListCreateView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AuctionListCreateView(APIView):
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
    


class DashboardView(APIView):
    def get(self, request):
        product_count = Product.objects.count()
        auction_count = Auction.objects.count()
        active_auctions = Auction.objects.filter(status='active').count()
        held_auctions = Auction.objects.filter(status='held').count()
        finished_auctions = Auction.objects.filter(status='finished').count()

        data = {
            'product_count': product_count,
            'auction_count': auction_count,
            'active_auctions': active_auctions,
            'held_auctions': held_auctions,
            'finished_auctions': finished_auctions,
        }
        return Response(data)
    

class ProductDetailView(APIView):
    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
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


