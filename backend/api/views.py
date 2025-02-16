from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, WorkoutSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Workout

class WorkoutListCreate(generics.ListCreateAPIView):
    serializer_class = WorkoutSerializer
    # makes sure the user has a valid JWT token
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Workout.objects.filter(author=user)
    
    def perform_create(self, serializer):
        print(self.request.data)
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class WorkoutDelete(generics.DestroyAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Workout.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all
    serializer_class = UserSerializer
    permission_classes = [AllowAny]