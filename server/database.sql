-- Users Table

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_img TEXT, -- URL or base64 encoded image data
    cover_img TEXT, -- URL or base64 encoded image data
    subscribers TEXT[], -- Array of strings
    subscribed TEXT[], -- Array of strings
    is_admin BOOLEAN DEAFULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)