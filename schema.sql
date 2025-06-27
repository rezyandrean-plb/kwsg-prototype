-- PostgreSQL Schema for KWSG Property Projects
-- Version: PostgreSQL 15
-- Based on actual TypeScript interfaces from the project

-- Drop existing tables and extensions
DROP TABLE IF EXISTS unit_availability CASCADE;
DROP TABLE IF EXISTS moat_data CASCADE;
DROP TABLE IF EXISTS agents CASCADE;
DROP TABLE IF EXISTS similar_projects CASCADE;
DROP TABLE IF EXISTS media_reviews CASCADE;
DROP TABLE IF EXISTS location_points CASCADE;
DROP TABLE IF EXISTS floor_plans CASCADE;
DROP TABLE IF EXISTS unit_types CASCADE;
DROP TABLE IF EXISTS project_facilities CASCADE;
DROP TABLE IF EXISTS project_features CASCADE;
DROP TABLE IF EXISTS project_images CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS facilities CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS developers CASCADE;
DROP TABLE IF EXISTS project_statuses CASCADE;
DROP TABLE IF EXISTS property_types CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS nearby_amenities CASCADE;
DROP TABLE IF EXISTS ai_moat_analysis CASCADE;
DROP TABLE IF EXISTS location_analytics CASCADE;

DROP EXTENSION IF EXISTS "uuid-ossp";

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types based on actual data
CREATE TYPE property_type_enum AS ENUM ('Condominium', 'Apartment', 'Mixed Development', 'Luxury Condominium');
CREATE TYPE tenure_enum AS ENUM ('Freehold', '99-year Leasehold', '999-year Leasehold');
CREATE TYPE status_enum AS ENUM ('Launching Soon', 'Available', 'Sold Out', 'Under Construction', 'Completed');
CREATE TYPE transport_mode_enum AS ENUM ('walking', 'driving', 'transit');

-- Property Types table
CREATE TABLE property_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Statuses table
CREATE TABLE project_statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Developers table
CREATE TABLE developers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Features table
CREATE TABLE features (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Facilities table
CREATE TABLE facilities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Agents table - matches Agent interface
CREATE TABLE agents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    image_url TEXT,
    company VARCHAR(255) NOT NULL,
    license VARCHAR(100) NOT NULL,
    experience VARCHAR(100) NOT NULL,
    languages TEXT[], -- Array of languages
    specialties TEXT[], -- Array of specialties
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects table (enhanced with additional fields)
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    type VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL,
    price_from VARCHAR(50), -- Keep as string to match interface
    price_per_sqft VARCHAR(100),
    bedrooms VARCHAR(50) NOT NULL,
    bathrooms VARCHAR(50) NOT NULL,
    size VARCHAR(100) NOT NULL,
    units VARCHAR(100) NOT NULL,
    developer VARCHAR(255) NOT NULL,
    completion VARCHAR(10) NOT NULL,
    description TEXT NOT NULL,
    features TEXT[], -- Array of features
    district VARCHAR(10) NOT NULL,
    tenure tenure_enum NOT NULL,
    property_type property_type_enum NOT NULL,
    status status_enum NOT NULL,
    total_units VARCHAR(100) NOT NULL,
    total_floors VARCHAR(100) NOT NULL,
    site_area VARCHAR(100) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Images table - matches images array in Project interface
CREATE TABLE project_images (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Features junction table
CREATE TABLE project_features (
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    feature_id INTEGER REFERENCES features(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, feature_id)
);

-- Project Facilities junction table
CREATE TABLE project_facilities (
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    facility_id INTEGER REFERENCES facilities(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, facility_id)
);

-- Unit Types table - matches UnitType interface
CREATE TABLE unit_types (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    size VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Unit Availability table - matches unitAvailabilityData structure
CREATE TABLE unit_availability (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    unit_type VARCHAR(100) NOT NULL,
    subtype VARCHAR(100) NOT NULL,
    size VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL,
    total_units INTEGER NOT NULL,
    available_units INTEGER NOT NULL,
    status_percentage INTEGER CHECK (status_percentage >= 0 AND status_percentage <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Floor Plans table - matches FloorPlan interface
CREATE TABLE floor_plans (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Location analytics table - matches LocationAnalytics interface
CREATE TABLE location_analytics (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL, -- 'mrt', 'schools', 'amenities', 'parks'
    name VARCHAR(255) NOT NULL,
    distance VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Media Reviews table - matches MediaReview interface
CREATE TABLE media_reviews (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    source VARCHAR(255) NOT NULL,
    review_date DATE NOT NULL,
    title VARCHAR(500) NOT NULL,
    excerpt TEXT NOT NULL,
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 5),
    review_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Similar projects table - matches SimilarProject interface
CREATE TABLE similar_projects (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    price_range VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    units VARCHAR(100) NOT NULL,
    units_available VARCHAR(100) NOT NULL,
    property_size_range VARCHAR(100) NOT NULL,
    developer VARCHAR(255) NOT NULL,
    completion VARCHAR(10) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI MOAT analysis table - matches moat object in Project interface
CREATE TABLE ai_moat_analysis (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    exit_audience DECIMAL(3,1) CHECK (exit_audience >= 0 AND exit_audience <= 5),
    district_disparity_effect DECIMAL(3,1) CHECK (district_disparity_effect >= 0 AND district_disparity_effect <= 5),
    mrt_proximity DECIMAL(3,1) CHECK (mrt_proximity >= 0 AND mrt_proximity <= 5),
    parents_attraction_effect DECIMAL(3,1) CHECK (parents_attraction_effect >= 0 AND parents_attraction_effect <= 5),
    quantum_effect DECIMAL(3,1) CHECK (quantum_effect >= 0 AND quantum_effect <= 5),
    rental_demand DECIMAL(3,1) CHECK (rental_demand >= 0 AND rental_demand <= 5),
    region_disparity_effect DECIMAL(3,1) CHECK (region_disparity_effect >= 0 AND region_disparity_effect <= 5),
    volume_effect DECIMAL(3,1) CHECK (volume_effect >= 0 AND volume_effect <= 5),
    balas_curve_effect DECIMAL(3,1) CHECK (balas_curve_effect >= 0 AND balas_curve_effect <= 5),
    landsize_density DECIMAL(3,1) CHECK (landsize_density >= 0 AND landsize_density <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Nearby amenities table - matches GooglePlace interface
CREATE TABLE nearby_amenities (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    place_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    type VARCHAR(100) NOT NULL,
    distance VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    transport_mode transport_mode_enum NOT NULL,
    is_nearest BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact form submissions table
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    project_title VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_property_types_updated_at
    BEFORE UPDATE ON property_types
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_statuses_updated_at
    BEFORE UPDATE ON project_statuses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_developers_updated_at
    BEFORE UPDATE ON developers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_features_updated_at
    BEFORE UPDATE ON features
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_facilities_updated_at
    BEFORE UPDATE ON facilities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at
    BEFORE UPDATE ON agents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_images_updated_at
    BEFORE UPDATE ON project_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_unit_types_updated_at
    BEFORE UPDATE ON unit_types
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_unit_availability_updated_at
    BEFORE UPDATE ON unit_availability
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_floor_plans_updated_at
    BEFORE UPDATE ON floor_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_location_analytics_updated_at
    BEFORE UPDATE ON location_analytics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_reviews_updated_at
    BEFORE UPDATE ON media_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_moat_analysis_updated_at
    BEFORE UPDATE ON ai_moat_analysis
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nearby_amenities_updated_at
    BEFORE UPDATE ON nearby_amenities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_district ON projects(district);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_location ON projects(latitude, longitude);
CREATE INDEX idx_project_images_project_id ON project_images(project_id);
CREATE INDEX idx_unit_types_project_id ON unit_types(project_id);
CREATE INDEX idx_floor_plans_project_id ON floor_plans(project_id);
CREATE INDEX idx_location_analytics_project_id ON location_analytics(project_id);
CREATE INDEX idx_media_reviews_project_id ON media_reviews(project_id);
CREATE INDEX idx_similar_projects_project_id ON similar_projects(project_id);
CREATE INDEX idx_ai_moat_analysis_project_id ON ai_moat_analysis(project_id);
CREATE INDEX idx_nearby_amenities_project_id ON nearby_amenities(project_id);
CREATE INDEX idx_nearby_amenities_type ON nearby_amenities(type);

-- Create full-text search index for projects
CREATE INDEX idx_projects_search ON projects USING gin(to_tsvector('english', title || ' ' || description || ' ' || location));

-- Add comments for documentation
COMMENT ON TABLE projects IS 'Main projects table containing all property development information';
COMMENT ON TABLE project_images IS 'Images associated with each project';
COMMENT ON TABLE unit_types IS 'Different unit types available in each project';
COMMENT ON TABLE floor_plans IS 'Floor plan images for different unit types';
COMMENT ON TABLE location_analytics IS 'Location-based analytics like MRT stations, schools, etc.';
COMMENT ON TABLE media_reviews IS 'Media reviews and ratings for projects';
COMMENT ON TABLE similar_projects IS 'Similar projects for comparison';
COMMENT ON TABLE ai_moat_analysis IS 'AI-powered market opportunity analysis';
COMMENT ON TABLE agents IS 'Property agents information';
COMMENT ON TABLE nearby_amenities IS 'Nearby amenities from Google Places API';
COMMENT ON TABLE contact_submissions IS 'Contact form submissions from users';

-- Insert initial data
INSERT INTO property_types (name) VALUES
    ('Condominium'),
    ('Mixed Development'),
    ('Waterfront Condominium'),
    ('Luxury Condominium'),
    ('Mass Market Condominium');

INSERT INTO project_statuses (name) VALUES
    ('Launching Soon'),
    ('Pre-Launch'),
    ('New Launch'),
    ('Selling Fast'),
    ('Last Few Units');

INSERT INTO developers (name) VALUES
    ('Amara Holdings'),
    ('Far East Organization'),
    ('CapitaLand Development'),
    ('GuocoLand'),
    ('Hong Leong Group'),
    ('CDL & CapitaLand'),
    ('Japura Development'),
    ('Tong Eng Group & Yeap Holdings'),
    ('Allgreen Properties & Kerry Properties'),
    ('CDL & MCL Land'),
    ('Sing Holdings');

INSERT INTO features (name) VALUES
    ('Freehold'),
    ('Luxury finishes'),
    ('Prime location'),
    ('Full facilities'),
    ('Smart home features'),
    ('Eco-friendly design'),
    ('Panoramic views'),
    ('Integrated development'),
    ('Direct MRT access'),
    ('Waterfront living');

INSERT INTO facilities (name) VALUES
    ('Arrival Lobby'),
    ('Pool Lounge'),
    ('Gym'),
    ('BBQ Pavilion'),
    ('Playground'),
    ('Function Room'),
    ('Garden'),
    ('Tennis Court'),
    ('Swimming Pool'),
    ('Children''s Playground'),
    ('Parking Entrance');

INSERT INTO agents (name, role, phone, whatsapp, email, image_url, company, license, experience, languages, specialties) VALUES
    ('Sarah Chen', 'Senior Property Consultant', '+65 9123 4567', '+65 9123 4567', 'sarah.chen@kwsg.com', '/images/agents/sarah-chen.jpg', 'KW Singapore', 'R123456A', '8 years', ARRAY['English', 'Mandarin', 'Cantonese'], ARRAY['Luxury Properties', 'New Launches', 'Investment Properties']),
    ('Michael Tan', 'Property Investment Specialist', '+65 9234 5678', '+65 9234 5678', 'michael.tan@kwsg.com', '/images/agents/michael-tan.jpg', 'KW Singapore', 'R234567B', '12 years', ARRAY['English', 'Mandarin'], ARRAY['Investment Properties', 'Commercial Properties', 'Landed Homes']),
    ('Lisa Wong', 'New Launch Specialist', '+65 9345 6789', '+65 9345 6789', 'lisa.wong@kwsg.com', '/images/agents/lisa-wong.jpg', 'KW Singapore', 'R345678C', '6 years', ARRAY['English', 'Mandarin', 'Hokkien'], ARRAY['New Launches', 'Mass Market Properties', 'First-time Buyers']);

-- Insert project data (10 Evelyn - main project from the client)
INSERT INTO projects (
    id,
    name,
    project_name,
    slug,
    title,
    location,
    address,
    type,
    price,
    price_from,
    price_per_sqft,
    bedrooms,
    bathrooms,
    size,
    units,
    developer,
    completion,
    description,
    district,
    tenure,
    property_type,
    status,
    total_units,
    total_floors,
    site_area,
    latitude,
    longitude,
    features
) VALUES 
    (
        1,
        '10 Evelyn',
        '10 Evelyn',
        '10-evelyn',
        '10 Evelyn',
        'Newton, District 11',
        '10 Evelyn Road, Singapore 308318',
        'Condominium',
        'From $1.2M',
        '1200000',
        '$2,100 - $2,400 psf',
        '1-4',
        '1-3',
        '484 - 1,636 sq ft',
        '56 Units',
        'Amara Holdings',
        '2025',
        '10 Evelyn is a prestigious freehold development nestled in the heart of Newton, Singapore''s prime District 11. This exclusive residential project offers a collection of meticulously designed living spaces ranging from 1 to 5 bedrooms, each crafted with premium finishes and thoughtful layouts. Residents will enjoy a sophisticated lifestyle with a comprehensive suite of facilities including a 50-meter lap pool, state-of-the-art fitness center, and beautifully landscaped gardens. The development''s prime location provides unparalleled connectivity, with Newton MRT Station just a 3-minute walk away, and easy access to Orchard Road''s shopping and dining precinct. Families will appreciate the proximity to prestigious educational institutions such as Anglo-Chinese School (Junior) and St. Margaret''s Primary School. The development''s strategic position also offers convenient access to medical facilities, including Mount Elizabeth Hospital, and is surrounded by an array of dining options, shopping centers, and recreational facilities. With its combination of luxury living, prime location, and excellent connectivity, 10 Evelyn represents an exceptional investment opportunity in one of Singapore''s most sought-after residential districts.',
        '11',
        'Freehold',
        'Condominium',
        'Available',
        '56 Units',
        '24 Floors',
        '12,000 sq ft',
        1.2834,
        103.8598,
        ARRAY['Freehold', 'Luxury finishes', 'Prime location', 'Full facilities']
    ),
    (
        2,
        'The Avenir',
        'The Avenir',
        'the-avenir',
        'The Avenir',
        'River Valley',
        '1 River Valley Road, Singapore 238801',
        'Luxury Condominium',
        'From $2.5M',
        '2500000',
        '$3,200 - $3,500 psf',
        '1-5',
        '1-4',
        '614 - 1,862 sqft',
        '376 Units',
        'GuocoLand',
        '2025',
        'The Avenir is a luxury residential development in the heart of River Valley, offering sophisticated living spaces with panoramic city views.',
        '9',
        'Freehold',
        'Luxury Condominium',
        'Available',
        '376 Units',
        '36 Floors',
        '25,000 sq ft',
        1.3521,
        103.8198,
        ARRAY['Freehold']
    ),
    (
        3,
        'Midtown Modern',
        'Midtown Modern',
        'midtown-modern',
        'Midtown Modern',
        'Bugis',
        '1 Tan Quee Lan Street, Singapore 188098',
        'Mixed Development',
        'From $1.8M',
        '1800000',
        '$2,800 - $3,100 psf',
        '1-4',
        '1-3',
        '678 - 1,862 sqft',
        '558 Units',
        'CDL & MCL Land',
        '2024',
        'Midtown Modern is an integrated development in the vibrant Bugis district, offering modern urban living with retail and dining options.',
        '7',
        '99-year Leasehold',
        'Mixed Development',
        'Available',
        '558 Units',
        '30 Floors',
        '40,000 sq ft',
        1.3521,
        103.8198,
        ARRAY['99-year Leasehold']
    );

-- Insert project features for 10 Evelyn
INSERT INTO project_features (project_id, feature_id)
SELECT 
    1,
    id
FROM features
WHERE name IN ('Freehold', 'Luxury finishes', 'Prime location', 'Full facilities');

-- Insert project facilities for 10 Evelyn
INSERT INTO project_facilities (project_id, facility_id)
SELECT 
    1,
    id
FROM facilities
WHERE name IN ('Arrival Lobby', 'Pool Lounge', 'Gym', 'BBQ Pavilion', 'Playground', 'Function Room', 'Garden');

-- Insert project images for 10 Evelyn
INSERT INTO project_images (project_id, image_url, display_order) VALUES
    (1, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80', 1),
    (1, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80', 2),
    (1, 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80', 3);

-- Insert unit types for 10 Evelyn
INSERT INTO unit_types (project_id, type, size, price) VALUES
    (1, '1 Bedroom', '484 - 527 sq ft', 'From $1.2M'),
    (1, '2 Bedroom', '678 - 753 sq ft', 'From $1.8M'),
    (1, '3 Bedroom', '1,076 - 1,184 sq ft', 'From $2.8M'),
    (1, '4 Bedroom', '1,518 - 1,636 sq ft', 'From $4.2M');

-- Insert unit availability data for 10 Evelyn (from the client mock data)
INSERT INTO unit_availability (project_id, unit_type, subtype, size, price, total_units, available_units, status_percentage) VALUES
    (1, '1 Bedroom Units', '1 BEDROOM+STUDY', '560 sqft', '$1,510,000 - $1,721,000', 68, 56, 82),
    (1, '2 Bedroom Units', '2 BEDROOM', '646 sqft - 807 sqft', '$1,993,000 - $2,210,000', 170, 2, 1),
    (1, '2 Bedroom Units', '2 BEDROOM+STUDY', '700 sqft - 721 sqft', 'Not Applicable', 136, 0, 0),
    (1, '3 Bedroom Units', '3 BEDROOM', '872 sqft - 1,141 sqft', '$2,966,000 - $3,120,000', 102, 6, 6),
    (1, '3 Bedroom Units', '3 BEDROOM PREMIER', '1,066 sqft - 1,302 sqft', '$3,047,000 - $3,735,000', 136, 33, 24),
    (1, '3 Bedroom Units', '3 BEDROOM+STUDY', '1,227 sqft - 1,464 sqft', '$3,452,000 - $4,336,000', 72, 60, 83),
    (1, '4 Bedroom Units', '4 BEDROOM', '1,227 sqft - 1,518 sqft', '$3,593,000 - $4,209,000', 68, 10, 15),
    (1, '4 Bedroom Units', '4 BEDROOM PREMIER', '1,690 sqft - 2,034 sqft', '$4,759,000 - $5,879,000', 32, 29, 91),
    (1, '5 Bedroom Units', '5 BEDROOM', '1,905 sqft - 2,260 sqft', '$5,567,000 - $6,669,000', 32, 29, 91);

-- Insert floor plans for 10 Evelyn
INSERT INTO floor_plans (project_id, type, image_url) VALUES
    (1, 'A', '/floorplan-dummy.png'),
    (1, 'B', '/floorplan-dummy.png'),
    (1, 'C', '/floorplan-dummy.png'),
    (1, 'D', '/floorplan-dummy.png');

-- Insert location points for 10 Evelyn
INSERT INTO location_analytics (project_id, category, name, distance) VALUES
    (1, 'mrt', 'Newton MRT', '300m'),
    (1, 'mrt', 'Orchard MRT', '800m'),
    (1, 'school', 'Anglo-Chinese School (Junior)', '400m'),
    (1, 'school', 'St. Margaret''s Primary School', '600m'),
    (1, 'amenity', 'United Square', '250m'),
    (1, 'amenity', 'Goldhill Plaza', '400m'),
    (1, 'park', 'Newton Green', '150m');

-- Insert media reviews for 10 Evelyn
INSERT INTO media_reviews (project_id, source, review_date, title, excerpt, rating) VALUES
    (1, 'The Edge Property', '2024-02-15', '10 Evelyn: A Rare Freehold Gem in Newton', 'The development offers a unique opportunity for investors and homeowners alike...', 4.5),
    (1, 'PropertyGuru', '2024-02-10', 'Why 10 Evelyn is the Talk of Newton', 'With its prime location and luxury finishes, 10 Evelyn stands out...', 4.8);

-- Insert moat data for 10 Evelyn
INSERT INTO ai_moat_analysis (
    project_id,
    project_name,
    exit_audience,
    district_disparity_effect,
    mrt_proximity,
    parents_attraction_effect,
    quantum_effect,
    rental_demand,
    region_disparity_effect,
    volume_effect,
    balas_curve_effect,
    landsize_density
) VALUES (
    1,
    '10 Evelyn',
    4.2,
    3.8,
    4.5,
    3.9,
    4.1,
    4.3,
    4.0,
    3.7,
    4.4,
    3.6
);

-- Insert similar projects for 10 Evelyn
INSERT INTO similar_projects (
    project_id,
    name,
    location,
    price,
    price_range,
    image_url,
    units,
    units_available,
    property_size_range,
    developer,
    completion,
    slug,
    type,
    latitude,
    longitude
) VALUES
    (
        1,
        'The Avenir',
        'River Valley',
        'From $2.5M',
        '$2,500 - $3,500 psf',
        '/images/projects/the-avenir.jpg',
        '376 Units',
        '376 Units',
        '614 - 1,862 sqft',
        'GuocoLand',
        '2025',
        'the-avenir',
        'Luxury Condominium',
        1.3521,
        103.8198
    ),
    (
        1,
        'Midtown Modern',
        'Bugis',
        'From $1.8M',
        '$2,800 - $3,100 psf',
        '/images/projects/midtown-modern.jpg',
        '558 Units',
        '558 Units',
        '678 - 1,862 sqft',
        'CDL & MCL Land',
        '2024',
        'midtown-modern',
        'Mixed Development',
        1.3521,
        103.8198
    );

-- Insert nearby amenities for 10 Evelyn
INSERT INTO nearby_amenities (
    project_id,
    place_id,
    name,
    address,
    latitude,
    longitude,
    type,
    distance,
    duration,
    transport_mode,
    is_nearest
) VALUES
    (
        1,
        'ChIJN1eUeB5b2dQzF9XQ06eQzI',
        'Newton MRT',
        '10 Evelyn Road, Singapore 308318',
        1.2834,
        103.8598,
        'mrt',
        '300m',
        '3 minutes',
        'walking',
        TRUE
    ),
    (
        1,
        'ChIJN1eUeB5b2dQzF9XQ06eQzI',
        'Orchard MRT',
        '10 Evelyn Road, Singapore 308318',
        1.2834,
        103.8598,
        'mrt',
        '800m',
        '10 minutes',
        'walking',
        FALSE
    ),
    (
        1,
        'ChIJN1eUeB5b2dQzF9XQ06eQzI',
        'Anglo-Chinese School (Junior)',
        '10 Evelyn Road, Singapore 308318',
        1.2834,
        103.8598,
        'school',
        '400m',
        '4 minutes',
        'walking',
        FALSE
    ),
    (
        1,
        'ChIJN1eUeB5b2dQzF9XQ06eQzI',
        'St. Margaret''s Primary School',
        '10 Evelyn Road, Singapore 308318',
        1.2834,
        103.8598,
        'school',
        '600m',
        '6 minutes',
        'walking',
        FALSE
    ),
    (
        1,
        'ChIJN1eUeB5b2dQzF9XQ06eQzI',
        'United Square',
        '10 Evelyn Road, Singapore 308318',
        1.2834,
        103.8598,
        'amenity',
        '250m',
        '2 minutes',
        'walking',
        FALSE
    ),
    (
        1,
        'ChIJN1eUeB5b2dQzF9XQ06eQzI',
        'Goldhill Plaza',
        '10 Evelyn Road, Singapore 308318',
        1.2834,
        103.8598,
        'amenity',
        '400m',
        '4 minutes',
        'walking',
        FALSE
    ),
    (
        1,
        'ChIJN1eUeB5b2dQzF9XQ06eQzI',
        'Newton Green',
        '10 Evelyn Road, Singapore 308318',
        1.2834,
        103.8598,
        'park',
        '150m',
        '1 minute',
        'walking',
        FALSE
    );

-- Insert contact submissions for 10 Evelyn
INSERT INTO contact_submissions (name, email, phone, message, project_title) VALUES
    ('John Doe', 'john.doe@example.com', '+65 9876 5432', 'I am interested in 10 Evelyn. Can you provide more information?', '10 Evelyn');