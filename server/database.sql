-- Users Table

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_img TEXT, -- URL or base64 encoded image data
    cover_img TEXT, -- URL or base64 encoded image data
    users_followed TEXT[], -- Array of strings
    users_following TEXT[], -- Array of strings
    is_admin BOOLEAN DEFAULT FALSE,
    about TEXT,
    city VARCHAR(255),
    birthplace VARCHAR(255),
    relationship VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Table

-- Add Administrator
INSERT INTO users (
    username, email, password, is_admin, about, city, birthplace) VALUES (
        'admin', 'admin@test.com', 'abc123', true, 'Administrator for this site', 'Hampstead', 'Jacksonville'
    )
;

-- Add Test User
INSERT INTO users (
    username, email, password, about, city, birthplace) VALUES (
        'Test1', 'test1@test.com', 'abc123', 'Test user for this site', 'Baltimore', 'Baltimore'
    )
;