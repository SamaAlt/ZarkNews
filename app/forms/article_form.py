# app/forms/article_form.py
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, FileField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileAllowed, FileSize
from app.models import Article
import json
import os

# Custom validators
def validate_tags(form, field):
    try:
        tags = [tag.strip() for tag in field.data.split(',') if tag.strip()]
        if not tags:
            raise ValidationError("At least one tag is required.")
        field.data = json.dumps(tags)  # Convert list to JSON string
    except Exception as e:
        raise ValidationError("Invalid tags format. Use comma-separated values.")

def validate_image(form, field):
    if field.data:
        # Check file extension
        allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp']
        if not any(field.data.filename.lower().endswith(ext) for ext in allowed_extensions):
            raise ValidationError("Invalid file type. Allowed types: jpg, jpeg, png, gif, svg.")
        # Check file size (e.g., 10 MB limit)
        max_size = 10 * 1024 * 1024  
        field.data.seek(0, os.SEEK_END)
        file_size = field.data.tell()
        field.data.seek(0)
        if file_size > max_size:
            raise ValidationError("File size exceeds the maximum allowed size (10 MB).")

# Create Article Form
class CreateArticleForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    display_type = SelectField('Display Type', choices=[(dt, dt) for dt in Article.VALID_DISPLAY_TYPES], validators=[DataRequired()])
    content = TextAreaField('Content', validators=[DataRequired()])
    image = FileField('Image File', validators=[validate_image])
    youtube_embed_url = StringField('YouTube Embed URL')
    location = StringField('Location', validators=[DataRequired()])
    contributors = TextAreaField('Contributors')
    section = SelectField('Section', choices=[(sec, sec) for sec in Article.VALID_SECTIONS], validators=[DataRequired()])
    tags = StringField('Tags', validators=[DataRequired(), validate_tags])

# Update Article Form
class UpdateArticleForm(FlaskForm):
    title = StringField('Title')
    display_type = SelectField('Display Type', choices=[(dt, dt) for dt in Article.VALID_DISPLAY_TYPES])
    content = TextAreaField('Content')
    image = FileField('Image File', validators=[validate_image])
    youtube_embed_url = StringField('YouTube Embed URL')
    location = StringField('Location')
    contributors = TextAreaField('Contributors')
    section = SelectField('Section', choices=[(sec, sec) for sec in Article.VALID_SECTIONS])
    tags = StringField('Tags', validators=[validate_tags])