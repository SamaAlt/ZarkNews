from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[Email(), user_exists])

    # Password field with restrictions
    password = PasswordField(
        'password', 
        validators=[
            DataRequired(), 
            Length(min=8, message="Password must be at least 8 characters long"),
            Regexp(r'^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$', message="Password must contain at least one letter, one uppercase letter, and one number")
        ]
    )