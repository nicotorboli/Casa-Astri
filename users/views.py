from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .serializers import RegisterSerializer,UserSerializer
from .models import Perfil
from rest_framework.permissions import IsAuthenticated

# Vista de registro de usuario
class RegisterView(APIView):
    def post(self, request):
        # Obtener el username de la petición
        username = request.data.get('username')

        # Verificar si el usuario ya existe
        if User.objects.filter(username=username).exists():
            return Response(
                {'message': 'El usuario ya está registrado. Por favor, inicia sesión.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Si el usuario no existe, proceder con el registro
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {'message': 'Usuario creado exitosamente'},
                status=status.HTTP_201_CREATED
            )

        # Si el serializer no es válido, devolver los errores
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista de login de usuario y generación de JWT
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = User.objects.filter(username=username).first()

        if user and user.check_password(password):
            # Generar token JWT
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
    



class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)