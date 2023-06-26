from django.urls import path
from ecommerce.views import product_views as views


urlpatterns = [
    path('',views.getProducts, name="getproducts"),
    path('create/',views.craeteroduct, name="create-product"),
    path('upload/',views.uploadImage, name="upload-image"),

    path('<str:pk>/reviews/',views.createProductReview, name="create-reviews"),
    path('top/',views.getTopProducts, name="top-products"),
    path('<str:pk>/',views.getProduct, name="getproduct"),

    
    path('update/<str:pk>/',views.updateProduct, name="update-product"),
    path('delete/<str:pk>/',views.deleteProduct, name="delete-product"),
]