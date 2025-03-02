from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Subscription, db
from marshmallow import Schema, fields, validate, ValidationError

# Initialize Blueprint
subscription_routes = Blueprint('subscriptions', __name__)

# Schema for validating subscription data
class SubscriptionSchema(Schema):
    first_name = fields.String(required=True, validate=validate.Length(min=1, max=100))
    last_name = fields.String(required=True, validate=validate.Length(min=1, max=100))
    email = fields.Email(required=True)
    frequency = fields.String(required=True, validate=validate.OneOf(Subscription.VALID_FREQUENCIES))
    sections = fields.List(fields.String(validate=validate.OneOf(Subscription.VALID_SECTIONS)), required=False)
    tags = fields.List(fields.String(), required=False)

@subscription_routes.route('', methods=['POST'])
def subscribe():
    """
    Create a new subscription.
    """
    schema = SubscriptionSchema()
    try:
        data = schema.load(request.get_json())  # Validate and deserialize input data
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400

    try:
        subscription = Subscription.subscribe(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            frequency=data['frequency'],
            sections=data.get('sections', []),
            tags=data.get('tags', [])
        )
        return jsonify(subscription.to_dict()), 201
    except ValueError as e:
        return jsonify({"errors": [str(e)]}), 400

@subscription_routes.route('/<string:email>', methods=['DELETE'])
def unsubscribe(email):
    """
    Remove a subscription by email.
    """
    try:
        subscription = Subscription.unsubscribe(email)
        return jsonify({"message": "Unsubscribed successfully"}), 200
    except ValueError as e:
        return jsonify({"errors": [str(e)]}), 404


@subscription_routes.route('/stats', methods=['GET'])
def get_subscription_stats():
    """
    Get the number of subscribers for each tag and section.
    """
    # Query the database to get the count of subscribers for each section
    section_counts = db.session.query(
        Subscription.sections,
        db.func.count(Subscription.id)
    ).group_by(Subscription.sections).all()

    # Query the database to get the count of subscribers for each tag
    tag_counts = db.session.query(
        Subscription.tags,
        db.func.count(Subscription.id)
    ).group_by(Subscription.tags).all()

    # Format the results
    sections = {section: count for section, count in section_counts}
    tags = {tag: count for tag, count in tag_counts}

    return jsonify({
        'sections': sections,
        'tags': tags
    }), 200

@subscription_routes.route('/<string:email>', methods=['PUT'])
def update_subscription(email):
    """
    Update subscription preferences.
    """
    subscription = Subscription.query.filter_by(email=email).first()
    if not subscription:
        return jsonify({"errors": ["Subscription not found"]}), 404

    data = request.get_json()
    try:
        if 'sections' in data:
            subscription.set_sections(data['sections'])
        if 'tags' in data:
            subscription.set_tags(data['tags'])
        if 'frequency' in data:
            subscription.set_frequency(data['frequency'])
        db.session.commit()
        return jsonify(subscription.to_dict()), 200
    except ValueError as e:
        return jsonify({"errors": [str(e)]}), 400

@subscription_routes.route('/<string:email>', methods=['GET'])
def get_subscription(email):
    """
    Get a specific subscription by email.
    """
    subscription = Subscription.query.filter_by(email=email).first()
    if not subscription:
        return jsonify({"errors": ["Subscription not found"]}), 404
    return jsonify(subscription.to_dict()), 200