-- Drop existing tables and extensions
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

DROP EXTENSION IF EXISTS "uuid-ossp";

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    location VARCHAR(200) NOT NULL,
    district INTEGER NOT NULL,
    price VARCHAR(50) NOT NULL,
    price_range VARCHAR(100) NOT NULL,
    price_per_sqft VARCHAR(100) NOT NULL,
    property_size_range VARCHAR(100) NOT NULL,
    developer_id INTEGER REFERENCES developers(id),
    completion_year VARCHAR(4) NOT NULL,
    tenure VARCHAR(50) NOT NULL,
    property_type_id INTEGER REFERENCES property_types(id),
    status_id INTEGER REFERENCES project_statuses(id),
    total_units VARCHAR(50) NOT NULL,
    total_floors VARCHAR(50) NOT NULL,
    site_area VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Images table
CREATE TABLE project_images (
    id SERIAL PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Features junction table
CREATE TABLE project_features (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    feature_id INTEGER REFERENCES features(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, feature_id)
);

-- Project Facilities junction table
CREATE TABLE project_facilities (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    facility_id INTEGER REFERENCES facilities(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, facility_id)
);

-- Unit Types table
CREATE TABLE unit_types (
    id SERIAL PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    size VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Floor Plans table
CREATE TABLE floor_plans (
    id SERIAL PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    unit_type_id INTEGER REFERENCES unit_types(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Location Points table
CREATE TABLE location_points (
    id SERIAL PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    distance VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'mrt', 'school', 'amenity', 'park'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Media Reviews table
CREATE TABLE media_reviews (
    id SERIAL PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    source VARCHAR(100) NOT NULL,
    review_date DATE NOT NULL,
    title VARCHAR(200) NOT NULL,
    excerpt TEXT NOT NULL,
    rating DECIMAL(3,1) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Similar Projects junction table
CREATE TABLE similar_projects (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    similar_project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, similar_project_id)
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

CREATE TRIGGER update_floor_plans_updated_at
    BEFORE UPDATE ON floor_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_location_points_updated_at
    BEFORE UPDATE ON location_points
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_reviews_updated_at
    BEFORE UPDATE ON media_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_location ON projects(location);
CREATE INDEX idx_projects_district ON projects(district);
CREATE INDEX idx_projects_property_type ON projects(property_type_id);
CREATE INDEX idx_projects_status ON projects(status_id);
CREATE INDEX idx_location_points_project ON location_points(project_id);
CREATE INDEX idx_unit_types_project ON unit_types(project_id);
CREATE INDEX idx_media_reviews_project ON media_reviews(project_id);
CREATE INDEX idx_similar_projects_project ON similar_projects(project_id);
CREATE INDEX idx_similar_projects_similar ON similar_projects(similar_project_id);

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
    ('Hong Leong Holdings');

INSERT INTO features (name) VALUES
    ('Freehold'),
    ('Luxury finishes'),
    ('Prime location'),
    ('Full facilities');

INSERT INTO facilities (name) VALUES
    ('Arrival Lobby'),
    ('Pool Lounge'),
    ('Gym'),
    ('BBQ Pavilion'),
    ('Playground'),
    ('Function Room'),
    ('Garden');

-- Insert project data
INSERT INTO projects (
    id,
    title,
    slug,
    location,
    district,
    price,
    price_range,
    price_per_sqft,
    property_size_range,
    developer_id,
    completion_year,
    tenure,
    property_type_id,
    status_id,
    total_units,
    total_floors,
    site_area,
    description
) VALUES 
    (
        '123e4567-e89b-12d3-a456-426614174000',
        '10 Evelyn',
        '10-evelyn',
        'Newton, District 11',
        11,
        'From $1.2M',
        '$1.2M - $4.2M',
        '$2,100 - $2,400 psf',
        '484 - 1,636 sq ft',
        1,
        '2025',
        'Freehold',
        1,
        1,
        '56 Units',
        '24 Floors',
        '12,000 sq ft',
        'Luxury freehold development in the heart of Newton, offering exclusive living spaces with premium finishes.'
    ),
    (
        '223e4567-e89b-12d3-a456-426614174001',
        'The Landmark',
        'the-landmark',
        'Orchard, District 9',
        9,
        'From $2.5M',
        '$2.5M - $8.5M',
        '$3,200 - $3,500 psf',
        '700 - 2,400 sq ft',
        2,
        '2026',
        'Freehold',
        4,
        2,
        '180 Units',
        '36 Floors',
        '25,000 sq ft',
        'Luxury residential development in the heart of Orchard Road, offering panoramic city views and exclusive amenities.'
    ),
    (
        '323e4567-e89b-12d3-a456-426614174002',
        'Marina Bay Residences',
        'marina-bay-residences',
        'Marina Bay, District 1',
        1,
        'From $3.8M',
        '$3.8M - $12M',
        '$3,500 - $3,800 psf',
        '850 - 3,000 sq ft',
        3,
        '2027',
        '99 Years',
        3,
        3,
        '250 Units',
        '45 Floors',
        '35,000 sq ft',
        'Waterfront living at its finest, with stunning views of Marina Bay and the city skyline.'
    ),
    (
        '423e4567-e89b-12d3-a456-426614174003',
        'The Woodleigh Residences',
        'the-woodleigh-residences',
        'Bidadari, District 13',
        13,
        'From $1.5M',
        '$1.5M - $4.5M',
        '$1,800 - $2,100 psf',
        '600 - 1,800 sq ft',
        4,
        '2025',
        '99 Years',
        2,
        4,
        '300 Units',
        '30 Floors',
        '40,000 sq ft',
        'Integrated development with direct access to Woodleigh MRT station and a vibrant retail mall.'
    );

-- Insert project features
INSERT INTO project_features (project_id, feature_id)
SELECT 
    '123e4567-e89b-12d3-a456-426614174000',
    id
FROM features;

INSERT INTO project_features (project_id, feature_id)
SELECT 
    '223e4567-e89b-12d3-a456-426614174001',
    id
FROM features;

INSERT INTO project_features (project_id, feature_id)
SELECT 
    '323e4567-e89b-12d3-a456-426614174002',
    id
FROM features;

INSERT INTO project_features (project_id, feature_id)
SELECT 
    '423e4567-e89b-12d3-a456-426614174003',
    id
FROM features;

-- Insert project facilities
INSERT INTO project_facilities (project_id, facility_id)
SELECT 
    '123e4567-e89b-12d3-a456-426614174000',
    id
FROM facilities;

INSERT INTO project_facilities (project_id, facility_id)
SELECT 
    '223e4567-e89b-12d3-a456-426614174001',
    id
FROM facilities;

INSERT INTO project_facilities (project_id, facility_id)
SELECT 
    '323e4567-e89b-12d3-a456-426614174002',
    id
FROM facilities;

INSERT INTO project_facilities (project_id, facility_id)
SELECT 
    '423e4567-e89b-12d3-a456-426614174003',
    id
FROM facilities;

-- Insert unit types
INSERT INTO unit_types (project_id, type, size, price) VALUES
    ('123e4567-e89b-12d3-a456-426614174000', '1 Bedroom', '484 - 527 sq ft', 'From $1.2M'),
    ('123e4567-e89b-12d3-a456-426614174000', '2 Bedroom', '678 - 753 sq ft', 'From $1.8M'),
    ('123e4567-e89b-12d3-a456-426614174000', '3 Bedroom', '1,076 - 1,184 sq ft', 'From $2.8M'),
    ('123e4567-e89b-12d3-a456-426614174000', '4 Bedroom', '1,518 - 1,636 sq ft', 'From $4.2M'),
    
    ('223e4567-e89b-12d3-a456-426614174001', '2 Bedroom', '700 - 850 sq ft', 'From $2.5M'),
    ('223e4567-e89b-12d3-a456-426614174001', '3 Bedroom', '1,200 - 1,500 sq ft', 'From $4.2M'),
    ('223e4567-e89b-12d3-a456-426614174001', '4 Bedroom', '1,800 - 2,400 sq ft', 'From $6.5M'),
    ('223e4567-e89b-12d3-a456-426614174001', 'Penthouse', '2,800 - 3,200 sq ft', 'From $8.5M'),
    
    ('323e4567-e89b-12d3-a456-426614174002', '2 Bedroom', '850 - 1,000 sq ft', 'From $3.8M'),
    ('323e4567-e89b-12d3-a456-426614174002', '3 Bedroom', '1,500 - 1,800 sq ft', 'From $5.5M'),
    ('323e4567-e89b-12d3-a456-426614174002', '4 Bedroom', '2,000 - 2,500 sq ft', 'From $8.2M'),
    ('323e4567-e89b-12d3-a456-426614174002', 'Penthouse', '3,000 - 3,500 sq ft', 'From $12M'),
    
    ('423e4567-e89b-12d3-a456-426614174003', '1 Bedroom', '600 - 700 sq ft', 'From $1.5M'),
    ('423e4567-e89b-12d3-a456-426614174003', '2 Bedroom', '850 - 1,000 sq ft', 'From $2.2M'),
    ('423e4567-e89b-12d3-a456-426614174003', '3 Bedroom', '1,200 - 1,500 sq ft', 'From $3.2M'),
    ('423e4567-e89b-12d3-a456-426614174003', '4 Bedroom', '1,800 - 2,000 sq ft', 'From $4.5M');

-- Insert location points
INSERT INTO location_points (project_id, name, distance, type) VALUES
    -- 10 Evelyn
    ('123e4567-e89b-12d3-a456-426614174000', 'Newton MRT', '3 min walk', 'mrt'),
    ('123e4567-e89b-12d3-a456-426614174000', 'Orchard MRT', '10 min walk', 'mrt'),
    ('123e4567-e89b-12d3-a456-426614174000', 'Anglo-Chinese School (Junior)', '5 min walk', 'school'),
    ('123e4567-e89b-12d3-a456-426614174000', 'St. Margaret''s Primary School', '8 min walk', 'school'),
    ('123e4567-e89b-12d3-a456-426614174000', 'United Square', '3 min walk', 'amenity'),
    ('123e4567-e89b-12d3-a456-426614174000', 'Goldhill Plaza', '5 min walk', 'amenity'),
    ('123e4567-e89b-12d3-a456-426614174000', 'Newton Green', '2 min walk', 'park'),
    
    -- The Landmark
    ('223e4567-e89b-12d3-a456-426614174001', 'Orchard MRT', '2 min walk', 'mrt'),
    ('223e4567-e89b-12d3-a456-426614174001', 'Somerset MRT', '5 min walk', 'mrt'),
    ('223e4567-e89b-12d3-a456-426614174001', 'ION Orchard', '1 min walk', 'amenity'),
    ('223e4567-e89b-12d3-a456-426614174001', 'Takashimaya', '3 min walk', 'amenity'),
    ('223e4567-e89b-12d3-a456-426614174001', 'Orchard Central', '2 min walk', 'amenity'),
    ('223e4567-e89b-12d3-a456-426614174001', 'Fort Canning Park', '10 min walk', 'park'),
    
    -- Marina Bay Residences
    ('323e4567-e89b-12d3-a456-426614174002', 'Marina Bay MRT', '3 min walk', 'mrt'),
    ('323e4567-e89b-12d3-a456-426614174002', 'Raffles Place MRT', '8 min walk', 'mrt'),
    ('323e4567-e89b-12d3-a456-426614174002', 'Marina Bay Sands', '5 min walk', 'amenity'),
    ('323e4567-e89b-12d3-a456-426614174002', 'The Shoppes at Marina Bay Sands', '5 min walk', 'amenity'),
    ('323e4567-e89b-12d3-a456-426614174002', 'Gardens by the Bay', '8 min walk', 'park'),
    
    -- The Woodleigh Residences
    ('423e4567-e89b-12d3-a456-426614174003', 'Woodleigh MRT', 'Direct Access', 'mrt'),
    ('423e4567-e89b-12d3-a456-426614174003', 'Potong Pasir MRT', '8 min walk', 'mrt'),
    ('423e4567-e89b-12d3-a456-426614174003', 'Woodleigh Mall', 'Direct Access', 'amenity'),
    ('423e4567-e89b-12d3-a456-426614174003', 'NEX Shopping Mall', '10 min walk', 'amenity'),
    ('423e4567-e89b-12d3-a456-426614174003', 'Bidadari Park', '5 min walk', 'park');

-- Insert media reviews
INSERT INTO media_reviews (project_id, source, review_date, title, excerpt, rating) VALUES
    ('123e4567-e89b-12d3-a456-426614174000', 'The Edge Property', '2024-02-15', '10 Evelyn: A Rare Freehold Gem in Newton', 'The development offers a unique opportunity...', 4.5),
    
    ('223e4567-e89b-12d3-a456-426614174001', 'PropertyGuru', '2024-02-20', 'The Landmark: Luxury Living in Orchard', 'A prestigious address in Singapore''s premier shopping district...', 4.8),
    ('223e4567-e89b-12d3-a456-426614174001', 'EdgeProp', '2024-02-18', 'The Landmark: A New Icon in Orchard', 'Setting new standards for luxury living...', 4.7),
    
    ('323e4567-e89b-12d3-a456-426614174002', 'PropertyGuru', '2024-02-22', 'Marina Bay Residences: Waterfront Luxury', 'Unparalleled views and exclusive waterfront living...', 4.9),
    ('323e4567-e89b-12d3-a456-426614174002', 'EdgeProp', '2024-02-21', 'Marina Bay Residences: The Epitome of Luxury', 'Redefining luxury waterfront living...', 4.8),
    
    ('423e4567-e89b-12d3-a456-426614174003', 'PropertyGuru', '2024-02-25', 'The Woodleigh Residences: Integrated Living', 'Perfect blend of convenience and comfort...', 4.6),
    ('423e4567-e89b-12d3-a456-426614174003', 'EdgeProp', '2024-02-24', 'The Woodleigh Residences: A Smart Investment', 'Excellent location with great potential...', 4.5);

-- Insert similar projects relationships
INSERT INTO similar_projects (project_id, similar_project_id) VALUES
    ('123e4567-e89b-12d3-a456-426614174000', '223e4567-e89b-12d3-a456-426614174001'),
    ('123e4567-e89b-12d3-a456-426614174000', '323e4567-e89b-12d3-a456-426614174002'),
    ('223e4567-e89b-12d3-a456-426614174001', '323e4567-e89b-12d3-a456-426614174002'),
    ('223e4567-e89b-12d3-a456-426614174001', '423e4567-e89b-12d3-a456-426614174003'),
    ('323e4567-e89b-12d3-a456-426614174002', '223e4567-e89b-12d3-a456-426614174001'),
    ('423e4567-e89b-12d3-a456-426614174003', '123e4567-e89b-12d3-a456-426614174000'); 