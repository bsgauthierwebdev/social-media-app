-- Users Table

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_img TEXT, -- URL or base64 encoded image data
    cover_img TEXT, -- URL or base64 encoded image data
    users_followed TEXT[] DEFAULT '{}', -- Array of strings
    users_following TEXT[] DEFAULT '{}', -- Array of strings
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

-- Posts Table
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes TEXT[] DEFAULT '{}'
    -- title VARCHAR(255) NOT NULL,
);