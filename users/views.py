from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer
from django.contrib.auth.models import User  # Asumiendo que usas el modelo User para los usuarios

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

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = User.objects.filter(username=username).first()

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
# Create your views here.
