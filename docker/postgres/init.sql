-- Initialize Hangout Database extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Full-text search configuration
CREATE TEXT SEARCH CONFIGURATION hangout_search (COPY = english);
