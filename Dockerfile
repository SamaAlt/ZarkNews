FROM python:3.9.18-alpine3.18

# Install dependencies
RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

# Set environment variables
ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

# Set working directory
WORKDIR /var/www

# Copy and install requirements
COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

# Copy the rest of the application
COPY . .

# Run database migrations and seed data
RUN flask db upgrade
RUN flask seed all
CMD gunicorn app:app