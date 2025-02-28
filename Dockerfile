FROM python:3.9.18-alpine3.18

WORKDIR /usr/local/app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN apk add --no-cache gcc musl-dev postgresql-dev postgresql-client && \
    pip install --no-cache-dir -r requirements.txt && \
    apk del gcc musl-dev

# Copy application files
COPY . .

# Set environment variables
ENV FLASK_APP=app
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 5000

# Run database migrations at runtime
CMD flask db upgrade && flask seed all && gunicorn -w 4 -b 0.0.0.0:5000 app:app


#docker-compose down
#docker-compose up --build