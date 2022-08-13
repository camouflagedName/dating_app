from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('get_cookie', views.get_cookie),
    path("register", views.register, name="register"),
    path("login", views.login_user, name="login"),
    path("get_user/<int:id>", views.get_user, name="get_user"),
    path("get_random_user/<int:id>", views.get_random_user, name="get_random"),
]
