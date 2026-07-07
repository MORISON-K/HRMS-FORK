from django.db import models
from django.conf import settings
from apps.employees.models import Department, Employee


class TrainingProgram(models.Model):
    TYPE   = [("graduate","Graduate Trainee"),("internship","Student Internship")]
    STATUS = [("open","Open"),("closed","Closed"),("completed","Completed")]

    title           = models.CharField(max_length=200)
    program_type    = models.CharField(max_length=20, choices=TYPE)
    department      = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="programs")
    start_date      = models.DateField()
    end_date        = models.DateField()
    capacity        = models.PositiveIntegerField(default=10)
    description     = models.TextField(blank=True)
    requirements    = models.TextField(blank=True)
    status          = models.CharField(max_length=20, choices=STATUS, default="open")
    coordinator     = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="coordinated_programs")
    created_at      = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "training_programs"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.get_program_type_display()})"


class Trainee(models.Model):
    TYPE   = [("graduate","Graduate Trainee"),("intern","Student Intern")]
    STATUS = [("active","Active"),("completed","Completed"),("terminated","Terminated"),("extended","Extended")]

    user             = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="trainee_profile")
    program          = models.ForeignKey(TrainingProgram, on_delete=models.CASCADE, related_name="trainees")
    department       = models.ForeignKey(Department, on_delete=models.CASCADE)
    supervisor       = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, related_name="supervised_trainees")
    trainee_type     = models.CharField(max_length=20, choices=TYPE)
    institution      = models.CharField(max_length=200, blank=True)  # university/school
    course           = models.CharField(max_length=200, blank=True)
    registration_no  = models.CharField(max_length=50, blank=True)   # student reg number
    start_date       = models.DateField()
    end_date         = models.DateField()
    status           = models.CharField(max_length=20, choices=STATUS, default="active")
    stipend          = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    accommodation    = models.BooleanField(default=False)
    created_at       = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "trainees"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.full_name} ({self.get_trainee_type_display()})"


class TraineeAssessment(models.Model):
    PERIOD  = [("monthly","Monthly"),("midterm","Mid-Term"),("final","Final")]
    GRADE   = [("A","Excellent"),("B","Good"),("C","Satisfactory"),("D","Poor")]

    trainee    = models.ForeignKey(Trainee, on_delete=models.CASCADE, related_name="assessments")
    period     = models.CharField(max_length=20, choices=PERIOD)
    score      = models.DecimalField(max_digits=5, decimal_places=2)
    grade      = models.CharField(max_length=1, choices=GRADE)
    comments   = models.TextField(blank=True)
    assessed_by= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    assessed_at= models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "trainee_assessments"
        ordering = ["assessed_at"]


class TraineeCourse(models.Model):
    """Courses/modules a trainee must complete."""
    trainee    = models.ForeignKey(Trainee, on_delete=models.CASCADE, related_name="courses")
    title      = models.CharField(max_length=200)
    completed  = models.BooleanField(default=False)
    score      = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    completed_at = models.DateField(null=True, blank=True)

    class Meta:
        db_table = "trainee_courses"