from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import Subscription
import json

# Custom validators
def validate_frequency(form, field):
    if field.data not in Subscription.VALID_FREQUENCIES:
        raise ValidationError(f"Invalid frequency. Must be one of: {', '.join(Subscription.VALID_FREQUENCIES)}")

def validate_sections(form, field):
    try:
        sections = json.loads(field.data)
        if not isinstance(sections, list):
            raise ValidationError("Sections must be a JSON array.")
        for section in sections:
            if section not in Subscription.VALID_SECTIONS:
                raise ValidationError(f"Invalid section: {section}. Must be one of {Subscription.VALID_SECTIONS}")
    except json.JSONDecodeError:
        raise ValidationError("Invalid JSON format for sections.")

def validate_tags(form, field):
    try:
        tags = json.loads(field.data)
        if not isinstance(tags, list):
            raise ValidationError("Tags must be a JSON array.")
    except json.JSONDecodeError:
        raise ValidationError("Invalid JSON format for tags.")

# Subscribe Form
class SubscribeForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    frequency = SelectField(
        'Frequency',
        choices=[(freq, freq) for freq in Subscription.VALID_FREQUENCIES],
        validators=[validate_frequency]  
    )
    sections = TextAreaField('Sections', validators=[validate_sections])   
    tags = TextAreaField('Tags', validators=[validate_tags])   

# Unsubscribe Form
class UnsubscribeForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])

# Update Preferences Form
class UpdatePreferencesForm(FlaskForm):
    frequency = SelectField(
        'Frequency',
        choices=[(freq, freq) for freq in Subscription.VALID_FREQUENCIES],
        validators=[Optional(), validate_frequency]  
    )
    sections = TextAreaField('Sections', validators=[Optional(), validate_sections])  
    tags = TextAreaField('Tags', validators=[Optional(), validate_tags])  