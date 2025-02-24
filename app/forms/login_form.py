from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Invalid email or password.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user or not user.check_password(password):
        raise ValidationError('Invalid email or password.')
    if not user.check_password(password):
        raise ValidationError('Email or password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(message="Email is required."), Email(message="Invalid email address."), user_exists])
    password = PasswordField('password', validators=[DataRequired(message="Password is required."), password_matches])