from app.models import db, Article, environment, SCHEMA
from datetime import datetime, timedelta
import json


def seed_articles():
    articles = [
        {
            "title": "The Future of Renewable Energy",
            "display_type": "headline",
            "content": "Exploring the advancements in solar and wind energy technologies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "renewable_energy.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/solar_energy",
            "location": "Global",
            "contributors": "John Doe, Jane Smith",
            "author_id": 1,
            "section": "technology",
            "tags": json.dumps(["renewable", "energy", "solar", "wind"]),
            "created_at": datetime.utcnow() - timedelta(days=10)
        },
        {
            "title": "Top 10 Tech Gadgets of 2023",
            "display_type": "list",
            "content": "A curated list of the most innovative gadgets this year.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "tech_gadgets.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/tech_gadgets",
            "location": "USA",
            "contributors": "Alice Johnson",
            "author_id": 2,
            "section": "technology",
            "tags": json.dumps(["gadgets", "tech", "2023"]),
            "created_at": datetime.utcnow() - timedelta(days=9)
        },
        {
            "title": "Global Markets React to New Policies",
            "display_type": "sidebar_1",
            "content": "How recent policy changes are affecting global markets. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "global_markets.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/global_markets",
            "location": "International",
            "contributors": "Bob Brown",
            "author_id": 3,
            "section": "business",
            "tags": json.dumps(["markets", "policies", "global"]),
            "created_at": datetime.utcnow() - timedelta(days=8)
        },
        {
            "title": "The Rise of E-Sports",
            "display_type": "headline",
            "content": "E-Sports is becoming a major player in the sports industry.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "esports.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/esports",
            "location": "Global",
            "contributors": "Charlie Davis",
            "author_id": 4,
            "section": "sports",
            "tags": json.dumps(["esports", "gaming", "sports"]),
            "created_at": datetime.utcnow() - timedelta(days=7)
        },
        {
            "title": "Hollywood's Newest Blockbusters",
            "display_type": "sidebar_2",
            "content": "A look at the most anticipated movies of the year. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "hollywood.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/hollywood",
            "location": "USA",
            "contributors": "Diana Evans",
            "author_id": 1,
            "section": "entertainment",
            "tags": json.dumps(["hollywood", "movies", "blockbusters"]),
            "created_at": datetime.utcnow() - timedelta(days=6)
        },
        {
            "title": "The Impact of AI on Healthcare",
            "display_type": "headline",
            "content": "How AI is revolutionizing the healthcare industry. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "ai_healthcare.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/ai_healthcare",
            "location": "Global",
            "contributors": "Ethan Harris",
            "author_id": 2,
            "section": "technology",
            "tags": json.dumps(["AI", "healthcare", "technology"]),
            "created_at": datetime.utcnow() - timedelta(days=5)
        },
        {
            "title": "The Best Travel Destinations for 2023",
            "display_type": "list",
            "content": "Top destinations to visit this year. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "travel.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/travel",
            "location": "Global",
            "contributors": "Fiona Green",
            "author_id": 3,
            "section": "international",
            "tags": json.dumps(["travel", "destinations", "2023"]),
            "created_at": datetime.utcnow() - timedelta(days=4)
        },
        {
            "title": "The Evolution of Smartphones",
            "display_type": "sidebar_3",
            "content": "A look at how smartphones have evolved over the years. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "smartphones.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/smartphones",
            "location": "Global",
            "contributors": "George White",
            "author_id": 4,
            "section": "technology",
            "tags": json.dumps(["smartphones", "tech", "evolution"]),
            "created_at": datetime.utcnow() - timedelta(days=3)
        },
        {
            "title": "The Future of Work: Remote vs Office",
            "display_type": "headline",
            "content": "Debating the future of work environments. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "future_work.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/future_work",
            "location": "Global",
            "contributors": "Hannah Black",
            "author_id": 1,
            "section": "business",
            "tags": json.dumps(["work", "remote", "office"]),
            "created_at": datetime.utcnow() - timedelta(days=2)
        },
        {
            "title": "The Rise of Plant-Based Diets",
            "display_type": "headline",
            "content": "How plant-based diets are becoming more popular. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "plant_based.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/plant_based",
            "location": "Global",
            "contributors": "Ian Blue",
            "author_id": 2,
            "section": "national",
            "tags": json.dumps(["diet", "plant-based", "health"]),
            "created_at": datetime.utcnow() - timedelta(days=1)
        },
        {
            "title": "The Impact of Climate Change on Agriculture",
            "display_type": "headline",
            "content": "How climate change is affecting farming practices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "climate_agriculture.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/climate_agriculture",
            "location": "Global",
            "contributors": "Jack Red",
            "author_id": 3,
            "section": "national",
            "tags": json.dumps(["climate", "agriculture", "farming"]),
            "created_at": datetime.utcnow() - timedelta(days=15)
        },
        {
            "title": "The Future of Space Exploration",
            "display_type": "headline",
            "content": "What's next for humanity in space? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "space_exploration.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/space_exploration",
            "location": "Global",
            "contributors": "Karen Yellow",
            "author_id": 4,
            "section": "technology",
            "tags": json.dumps(["space", "exploration", "future"]),
            "created_at": datetime.utcnow() - timedelta(days=14)
        },
        {
            "title": "The Role of Big Data in Business",
            "display_type": "sidebar_1",
            "content": "How big data is transforming business strategies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "big_data.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/big_data",
            "location": "Global",
            "contributors": "Leo Green",
            "author_id": 1,
            "section": "business",
            "tags": json.dumps(["big data", "business", "analytics"]),
            "created_at": datetime.utcnow() - timedelta(days=13)
        },
        {
            "title": "The Rise of Virtual Reality",
            "display_type": "headline",
            "content": "How VR is changing the way we experience the world. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "virtual_reality.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/virtual_reality",
            "location": "Global",
            "contributors": "Mia Orange",
            "author_id": 2,
            "section": "technology",
            "tags": json.dumps(["VR", "virtual reality", "tech"]),
            "created_at": datetime.utcnow() - timedelta(days=12)
        },
        {
            "title": "The Future of Electric Vehicles",
            "display_type": "headline",
            "content": "What's next for the EV industry? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "electric_vehicles.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/electric_vehicles",
            "location": "Global",
            "contributors": "Noah Purple",
            "author_id": 3,
            "section": "technology",
            "tags": json.dumps(["EV", "electric vehicles", "future"]),
            "created_at": datetime.utcnow() - timedelta(days=11)
        },
        {
            "title": "The Impact of Social Media on Mental Health",
            "display_type": "headline",
            "content": "How social media is affecting our mental well-being. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "social_media.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/social_media",
            "location": "Global",
            "contributors": "Olivia Pink",
            "author_id": 4,
            "section": "national",
            "tags": json.dumps(["social media", "mental health", "well-being"]),
            "created_at": datetime.utcnow() - timedelta(days=10)
        },
        {
            "title": "The Future of Quantum Computing",
            "display_type": "headline",
            "content": "How quantum computing could revolutionize technology. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "quantum_computing.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/quantum_computing",
            "location": "Global",
            "contributors": "Peter Brown",
            "author_id": 1,
            "section": "technology",
            "tags": json.dumps(["quantum", "computing", "future"]),
            "created_at": datetime.utcnow() - timedelta(days=9)
        },
        {
            "title": "The Rise of Online Education",
            "display_type": "headline",
            "content": "How online learning is transforming education. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "online_education.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/online_education",
            "location": "Global",
            "contributors": "Quinn Gray",
            "author_id": 2,
            "section": "national",
            "tags": json.dumps(["education", "online", "learning"]),
            "created_at": datetime.utcnow() - timedelta(days=8)
        },
        {
            "title": "The Impact of 5G on Mobile Technology",
            "display_type": "headline",
            "content": "How 5G is changing the mobile landscape. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "5g_technology.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/5g_technology",
            "location": "Global",
            "contributors": "Rachel White",
            "author_id": 3,
            "section": "technology",
            "tags": json.dumps(["5G", "mobile", "technology"]),
            "created_at": datetime.utcnow() - timedelta(days=7)
        },
        {
            "title": "The Future of Cybersecurity",
            "display_type": "headline",
            "content": "What's next in the fight against cyber threats? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi.",
            "image_filename": "cybersecurity.jpg",
            "youtube_embed_url": "https://www.youtube.com/embed/cybersecurity",
            "location": "Global",
            "contributors": "Sam Black",
            "author_id": 4,
            "section": "technology",
            "tags": json.dumps(["cybersecurity", "future", "tech"]),
            "created_at": datetime.utcnow() - timedelta(days=6)
        }
    ]

    for article_data in articles:
        article = Article(**article_data)
        db.session.add(article)

    db.session.commit()

def undo_articles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.articles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM articles")

    db.session.commit()