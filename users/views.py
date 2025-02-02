from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .serializers import RegisterSerializer,PerfilSerializer
from .models import Perfil

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
    



class PerfilView(generics.RetrieveUpdateAPIView):
    serializer_class = PerfilSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Obtiene o crea un perfil para el usuario autenticado
        perfil, created = Perfil.objects.get_or_create(usuario=self.request.user)
        return perfil