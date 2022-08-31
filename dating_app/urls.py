from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.index, name="index"),
    path('get_cookie', views.get_cookie),
    path("register", views.register, name="register"),
    path("login", views.login_user, name="login"),
    
    path("get_user/<int:id>", views.get_user, name="get_user"),
    path("get_selected_user_data/<str:username>/<int:level>", views.get_selected_user_data),
    path("get_selected_user_combo/<str:username>/", views.get_selected_user_combo),
    
    path("get_random_user/<int:id>", views.get_random_user, name="get_random"),
    path("all_users", views.show_all_users),
    path("update_user/<int:id>", views.update_user),
    path("get_user_info/<str:username>", views.get_user_info),
    path("get_user_facts/<str:username>", views.get_user_facts),
    path("get_user_combo/<int:id>", views.get_user_combo),
    
    path('del_user/<int:user_id>', views.del_user),
    
    path("create_combo/<int:id>", views.create_combo),
    path("solve_combo/<int:user_id>/<int:combo_id>", views.solve_combo),
    path("get_completed_combos/<int:user_id>", views.get_completed_combos),
    
    path("send_message/<str:receiver_name>/<int:sender_id>", views.send_message, ),
    path("get_messages/<int:user_id>", views.get_messages),
    
    path("upload_image/<int:user_id>", views.upload_image),
    path("get_image_path/<str:username>", views.get_image_path),
    
    path("show_all_combos", views.show_all_combos)
    
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
