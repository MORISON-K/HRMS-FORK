from django.db import models
from django.conf import settings
from apps.employees.models import Department, Position, Grade


class JobPosting(models.Model):
    STATUS = [
        ('draft',     'Draft'),
        ('open',      'Open'),
        ('closed',    'Closed'),
        ('cancelled', 'Cancelled'),
    ]
    TYPE = [('full_time','Full Time'),('contract','Contract'),('intern','Internship'),('graduate','Graduate Trainee')]

    title           = models.CharField(max_length=200)
    reference_no    = models.CharField(max_length=30, unique=True)
    department      = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='job_postings')
    position        = models.ForeignKey(Position, null=True, blank=True, on_delete=models.SET_NULL)
    grade           = models.ForeignKey(Grade, null=True, blank=True, on_delete=models.SET_NULL)
    job_type        = models.CharField(max_length=20, choices=TYPE, default='full_time')
    vacancies       = models.PositiveIntegerField(default=1)
    description     = models.TextField()
    requirements    = models.TextField()
    min_salary      = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    max_salary      = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    deadline        = models.DateField()
    status          = models.CharField(max_length=20, choices=STATUS, default='draft')
    posted_by       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    created_at      = models.DateTimeField(auto_now_add=True)
    published_at    = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'job_postings'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.reference_no} — {self.title}'


class JobApplication(models.Model):
    STATUS = [
        ('submitted',    'Submitted'),
        ('under_review', 'Under Review'),
        ('shortlisted',  'Shortlisted'),
        ('interview',    'Interview Stage'),
        ('offered',      'Offer Extended'),
        ('hired',        'Hired'),
        ('rejected',     'Rejected'),
        ('withdrawn',    'Withdrawn'),
    ]

    job             = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name='applications')
    applicant       = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    cover_letter    = models.TextField(blank=True)
    cv              = models.FileField(upload_to='cvs/')
    academic_docs   = models.FileField(upload_to='academic_docs/', null=True, blank=True)
    status          = models.CharField(max_length=20, choices=STATUS, default='submitted')
    score           = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    rejection_reason= models.TextField(blank=True)
    submitted_at    = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'job_applications'
        unique_together = ['job', 'applicant']
        ordering = ['-submitted_at']

    def __str__(self):
        return f'{self.applicant.username} → {self.job.reference_no}'


class Interview(models.Model):
    TYPE     = [('phone','Phone'),('panel','Panel'),('technical','Technical'),('final','Final')]
    OUTCOME  = [('pending','Pending'),('passed','Passed'),('failed','Failed'),('no_show','No Show')]

    application  = models.ForeignKey(JobApplication, on_delete=models.CASCADE, related_name='interviews')
    interview_type = models.CharField(max_length=20, choices=TYPE, default='panel')
    scheduled_at = models.DateTimeField()
    venue        = models.CharField(max_length=200, blank=True)
    link         = models.URLField(blank=True)    # for virtual interviews
    panel        = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='panel_interviews', blank=True)
    outcome      = models.CharField(max_length=20, choices=OUTCOME, default='pending')
    score        = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    notes        = models.TextField(blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'interviews'
        ordering = ['scheduled_at']

    def __str__(self):
        return f'Interview — {self.application} — {self.scheduled_at.date()}'


class JobOffer(models.Model):
    STATUS = [('pending','Pending'),('accepted','Accepted'),('declined','Declined')]

    application   = models.OneToOneField(JobApplication, on_delete=models.CASCADE, related_name='offer')
    offered_salary= models.DecimalField(max_digits=14, decimal_places=2)
    start_date    = models.DateField()
    offer_letter  = models.FileField(upload_to='offer_letters/', null=True, blank=True)
    status        = models.CharField(max_length=20, choices=STATUS, default='pending')
    expires_at    = models.DateField()
    responded_at  = models.DateTimeField(null=True, blank=True)
    created_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'job_offers'