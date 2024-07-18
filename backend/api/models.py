from django.db import models
from django.contrib.auth.models import User

class Workout(models.Model):
    exercise_name = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    calories = models.IntegerField()
    time_worked_out = models.FloatField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workouts")

    def __str__(self):
        return self.exercise_name