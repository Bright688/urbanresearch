from django import forms
from .models import Order, Comment
from datetime import date
import requests

class OrderForm(forms.Form):
    SERVICE_CHOICES = [
        ('academic_assistance', 'Academic Assistance'),
        ('personalized_writing_solutions', 'Personalized Writing Solutions'),
        ('thesis_dissertation_support', 'Thesis/Dissertation Support'),
        ('academic_coursework_assistance', 'Academic Coursework Assistance'),
        ('professional_report_assistance', 'Professional Report Assistance'),
        ('academic_essay_assistance', 'Academic Essay Assistance'),
    ]

    SUBSERVICE_CHOICES = {
        'academic_assistance': [
            ('Case_studies', 'Case Studies', 12),
            ('Research_papers', 'Research Papers', 12),
            ('Reports', 'Reports', 12),
            ('Presentations', 'Presentations', 12),
            ('Project_proposals', 'Project Proposals', 12),
            ('Annotated_bibliographies', 'Annotated Bibliographies', 12),
            ('Literature_reviews', 'Literature Reviews', 12),
            ('Data_analysis_assignments', 'Data Analysis Assignments', 14),
            ('Fieldwork_reports', 'Fieldwork Reports', 12),
        ],
        'personalized_writing_solutions': [
            ('Custom_essays', 'Custom Essays', 10),
            ('Personal_statements', 'Personal Statements', 10),
            ('Creative_writing', 'Creative Writing', 10),
            ('Business_plan', 'Business Plan', 12),
            ('Marketing_plans', 'Marketing Plans', 12),
            ('Web_contents', 'Web Contents', 10),
            ('Newsletters', 'Newsletters', 10),
            ('Speeches', 'Speeches', 10),
            ('Technical_documents', 'Technical Documents', 12),      
            ('Grant_proposals', 'Grant Proposals', 12),
        ],
        'thesis_dissertation_support': [
            ('Proposal_development', 'Proposal Development', 10),
            ('Literature_review', 'Literature Review', 12),
            ('Methodology', 'Methodology', 10),
            ('Data_analysis', 'Data Analysis', 10),
            ('Results_chapter', 'Results Chapter', 10),
            ('Discussion', 'Discussion', 10),
            ('Conclusion_and_recommendations', 'Conclusion and Recommendations', 10),
            ('Editing_and_proofreading', 'Editing & Proofreading', 10),
            ('Formatting', 'Formatting', 10),
        ],
        'academic_coursework_assistance': [
            ('Essay_writing', 'Essay Writing', 12),
            ('Research_papers', 'Research Papers', 12),
            ('Case_studies', 'Case Studies', 12),
            ('Lab_reports', 'Lab Reports', 12),
            ('Presentations', 'Presentations', 12),
            ('Book_reviews', 'Book Reviews', 12),
            ('Annotated_bibliographies', 'Annotated Bibliographies', 10),
            ('Course_projects', 'Course Projects', 12),
            ('Group_assignments', 'Group Assignments', 12),
            ('Discussion_posts', 'Discussion Posts', 12),
        ],
        'professional_report_assistance': [
            ('Business_reports', 'Business Reports', 10),
            ('Market_analysis', 'Market Analysis', 10),
            ('Feasibility_studies', 'Feasibility Studies', 10),
            ('Financial_analysis', 'Financial Analysis', 10),
            ('Technical_reports', 'Technical Reports', 10),
        ],
        'academic_essay_assistance': [
            ('Argumentative_essay', 'Argumentative Essay', 10),
            ('Descriptive_essay', 'Descriptive Essay', 10),
            ('Expository_essays', 'Expository Essays', 10),
            ('Narrative_essays', 'Narrative Essays', 10),
            ('Persuasive_essays', 'Persuasive Essays', 10),
            ('Comparative_essays', 'Comparative Essays', 10),
            ('Analytical_essays', 'Analytical Essays', 10),
            ('Cause_and_effect_essays', 'Cause and Effect Essays', 10),
            ('Critical_essays', 'Critical Essays', 10),
            ('Reflective_essays', 'Reflective Essays', 10),
        ],
    }
    
    

    name = forms.CharField(max_length=100, required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'class': 'form-control'}))
    service = forms.ChoiceField(choices=SERVICE_CHOICES, required=True, widget=forms.Select(attrs={'class': 'form-control'}))
    sub_service = forms.ChoiceField(choices=[('', '---------')], required=True, widget=forms.Select(attrs={'class': 'form-control'}))
    num_pages = forms.IntegerField(label='Number of Pages', min_value=1, initial=1, required=True, widget=forms.NumberInput(attrs={'class': 'form-control'}))
    
    deadline_date = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        required=True
    )
    
    deadline_days = forms.IntegerField(
        widget=forms.HiddenInput(),  # Make it a hidden field
        required=False
    )

    deadline_days = forms.IntegerField(
        widget=forms.HiddenInput(),  # Make it a hidden field
        required=False
    )
    
    
    description = forms.CharField(
        label='Description',
        widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
        required=True
    )
    
    file_upload = forms.FileField(
        label='Upload File',
        widget=forms.ClearableFileInput(attrs={'class': 'form-control'}),
        required=False  # Set to False to make the upload optional
    )

    
    PAYMENT_CHOICES = [
        ('paystack', 'Paystack'),
        ('crypto', 'Cryptocurrency'),
    ]
    
    payment_method = forms.ChoiceField(
        choices=PAYMENT_CHOICES, 
        label='Payment Method', 
        widget=forms.Select(attrs={'class': 'form-control'})  # Add Bootstrap class for styling
    )

    currency = forms.ChoiceField(choices=[
        ('USD', 'USD'),
        ('EUR', 'EUR'),
        ('GBP', 'GBP'),
        ('AUD', 'AUD'),
        ('CAD', 'CAD'),
        ('JPY', 'JPY'),
        ('INR', 'INR'),
        ('NGN', 'NGN'),
    ], required=True)
    exchange_rates = forms.CharField(widget=forms.HiddenInput(), required=False)  # Field to receive exchange rates from JavaScript
   
    terms = forms.BooleanField(required=True)
    
    
    '''def calculate_price(self, cleaned_data):
        service = cleaned_data.get('service')
        sub_service = cleaned_data.get('sub_service')
        num_pages = cleaned_data.get('num_pages')
        deadline_date = cleaned_data.get('deadline_date')
        currency = cleaned_data.get('currency')

        base_price = self.get_base_price(service, sub_service)
        days_until_deadline = (deadline_date - date.today()).days

        deadline_adjustment = 1
        if days_until_deadline <= 3:
            deadline_adjustment = 1.7
        elif days_until_deadline <= 6:
            deadline_adjustment = 1.5
        elif days_until_deadline <= 9:
            deadline_adjustment = 1.15

        total_price = base_price * num_pages * deadline_adjustment

        response = requests.get('https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD')
        exchange_rates = response.json().get('conversion_rates', {})
        conversion_rate = exchange_rates.get(currency, 1)

        final_price = total_price * conversion_rate

        return final_price

    def get_base_price(self, service, sub_service):
        for subservice_list in self.SUBSERVICE_CHOICES.values():
            for sub in subservice_list:
                if sub[0] == sub_service:
                    return sub[2]  # Return the base price associated with the sub-service
        return 0'''
    

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('name', 'email', 'body')