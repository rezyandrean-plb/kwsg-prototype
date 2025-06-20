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

-- Agents table
CREATE TABLE agents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    image_url TEXT,
    company VARCHAR(100) NOT NULL,
    license VARCHAR(50) NOT NULL,
    experience VARCHAR(100) NOT NULL,
    languages TEXT[], -- Array of languages
    specialties TEXT[], -- Array of specialties
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects table (enhanced with additional fields)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    project_name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    type VARCHAR(100) NOT NULL,
    price VARCHAR(50) NOT NULL,
    price_from VARCHAR(50) NOT NULL,
    price_per_sqft VARCHAR(100) NOT NULL,
    bedrooms VARCHAR(50) NOT NULL,
    bathrooms VARCHAR(50) NOT NULL,
    size VARCHAR(100) NOT NULL,
    units VARCHAR(50) NOT NULL,
    developer_id INTEGER REFERENCES developers(id),
    completion VARCHAR(10) NOT NULL,
    description TEXT NOT NULL,
    district VARCHAR(10) NOT NULL,
    tenure VARCHAR(50) NOT NULL,
    property_type_id INTEGER REFERENCES property_types(id),
    status_id INTEGER REFERENCES project_statuses(id),
    total_units VARCHAR(50) NOT NULL,
    total_floors VARCHAR(50) NOT NULL,
    site_area VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    agent_id INTEGER REFERENCES agents(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Images table
CREATE TABLE project_images (
    id SERIAL PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
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

-- Unit Availability table (detailed unit pricing and availability)
CREATE TABLE unit_availability (
    id SERIAL PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    unit_type VARCHAR(100) NOT NULL,
    subtype VARCHAR(100) NOT NULL,
    size VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL,
    total_units INTEGER NOT NULL,
    available_units INTEGER NOT NULL,
    status_percentage INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Floor Plans table (enhanced)
CREATE TABLE floor_plans (
    id SERIAL PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    unit_type_id INTEGER REFERENCES unit_types(id) ON DELETE CASCADE,
    plan_code VARCHAR(20) NOT NULL,
    plan_label VARCHAR(50) NOT NULL,
    size VARCHAR(100) NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
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

-- Moat Data table (AI MOAT analysis)
CREATE TABLE moat_data (
    id SERIAL PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    project_name VARCHAR(200) NOT NULL,
    exit_audience DECIMAL(4,1) NOT NULL,
    district_disparity_effect DECIMAL(4,1) NOT NULL,
    mrt_proximity DECIMAL(4,1) NOT NULL,
    parents_attraction_effect DECIMAL(4,1) NOT NULL,
    quantum_effect DECIMAL(4,1) NOT NULL,
    rental_demand DECIMAL(4,1) NOT NULL,
    region_disparity_effect DECIMAL(4,1) NOT NULL,
    volume_effect DECIMAL(4,1) NOT NULL,
    balas_curve_effect DECIMAL(4,1) NOT NULL,
    landsize_density DECIMAL(4,1) NOT NULL,
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

CREATE TRIGGER update_location_points_updated_at
    BEFORE UPDATE ON location_points
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_reviews_updated_at
    BEFORE UPDATE ON media_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_moat_data_updated_at
    BEFORE UPDATE ON moat_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_location ON projects(location);
CREATE INDEX idx_projects_district ON projects(district);
CREATE INDEX idx_projects_property_type ON projects(property_type_id);
CREATE INDEX idx_projects_status ON projects(status_id);
CREATE INDEX idx_projects_agent ON projects(agent_id);
CREATE INDEX idx_location_points_project ON location_points(project_id);
CREATE INDEX idx_unit_types_project ON unit_types(project_id);
CREATE INDEX idx_unit_availability_project ON unit_availability(project_id);
CREATE INDEX idx_media_reviews_project ON media_reviews(project_id);
CREATE INDEX idx_moat_data_project ON moat_data(project_id);
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
    developer_id,
    completion,
    description,
    district,
    tenure,
    property_type_id,
    status_id,
    total_units,
    total_floors,
    site_area,
    latitude,
    longitude,
    agent_id
) VALUES 
    (
        '123e4567-e89b-12d3-a456-426614174000',
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
        1,
        '2025',
        '10 Evelyn is a prestigious freehold development nestled in the heart of Newton, Singapore''s prime District 11. This exclusive residential project offers a collection of meticulously designed living spaces ranging from 1 to 5 bedrooms, each crafted with premium finishes and thoughtful layouts. Residents will enjoy a sophisticated lifestyle with a comprehensive suite of facilities including a 50-meter lap pool, state-of-the-art fitness center, and beautifully landscaped gardens. The development''s prime location provides unparalleled connectivity, with Newton MRT Station just a 3-minute walk away, and easy access to Orchard Road''s shopping and dining precinct. Families will appreciate the proximity to prestigious educational institutions such as Anglo-Chinese School (Junior) and St. Margaret''s Primary School. The development''s strategic position also offers convenient access to medical facilities, including Mount Elizabeth Hospital, and is surrounded by an array of dining options, shopping centers, and recreational facilities. With its combination of luxury living, prime location, and excellent connectivity, 10 Evelyn represents an exceptional investment opportunity in one of Singapore''s most sought-after residential districts.',
        '11',
        'Freehold',
        1,
        1,
        '56 Units',
        '24 Floors',
        '12,000 sq ft',
        1.2834,
        103.8598,
        1
    ),
    (
        '223e4567-e89b-12d3-a456-426614174001',
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
        5,
        '2025',
        'The Avenir is a luxury residential development in the heart of River Valley, offering sophisticated living spaces with panoramic city views.',
        '9',
        'Freehold',
        4,
        3,
        '376 Units',
        '36 Floors',
        '25,000 sq ft',
        1.3521,
        103.8198,
        2
    ),
    (
        '323e4567-e89b-12d3-a456-426614174002',
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
        4,
        '2024',
        'Midtown Modern is an integrated development in the vibrant Bugis district, offering modern urban living with retail and dining options.',
        '7',
        '99-year Leasehold',
        2,
        4,
        '558 Units',
        '30 Floors',
        '40,000 sq ft',
        1.3521,
        103.8198,
        3
    );

-- Insert project features for 10 Evelyn
INSERT INTO project_features (project_id, feature_id)
SELECT 
    '123e4567-e89b-12d3-a456-426614174000',
    id
FROM features
WHERE name IN ('Freehold', 'Luxury finishes', 'Prime location', 'Full facilities');

-- Insert project facilities for 10 Evelyn
INSERT INTO project_facilities (project_id, facility_id)
SELECT 
    '123e4567-e89b-12d3-a456-426614174000',
    id
FROM facilities
WHERE name IN ('Arrival Lobby', 'Pool Lounge', 'Gym', 'BBQ Pavilion', 'Playground', 'Function Room', 'Garden');

-- Insert project images for 10 Evelyn
INSERT INTO project_images (project_id, image_url, display_order) VALUES
    ('123e4567-e89b-12d3-a456-426614174000', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80', 1),
    ('123e4567-e89b-12d3-a456-426614174000', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80', 2),
    ('123e4567-e89b-12d3-a456-426614174000', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80', 3);

-- Insert unit types for 10 Evelyn
INSERT INTO unit_types (project_id, type, size, price) VALUES
    ('123e4567-e89b-12d3-a456-426614174000', '1 Bedroom', '484 - 527 sq ft', 'From $1.2M'),
    ('123e4567-e89b-12d3-a456-426614174000', '2 Bedroom', '678 - 753 sq ft', 'From $1.8M'),
    ('123e4567-e89b-12d3-a456-426614174000', '3 Bedroom', '1,076 - 1,184 sq ft', 'From $2.8M'),
    ('123e4567-e89b-12d3-a456-426614174000', '4 Bedroom', '1,518 - 1,636 sq ft', 'From $4.2M');

-- Insert unit availability data for 10 Evelyn (from the client mock data)
INSERT INTO unit_availability (project_id, unit_type, subtype, size, price, total_units, available_units, status_percentage) VALUES
    ('123e4567-e89b-12d3-a456-426614174000', '1 Bedroom Units', '1 BEDROOM+STUDY', '560 sqft', '$1,510,000 - $1,721,000', 68, 56, 82),
    ('123e4567-e89b-12d3-a456-426614174000', '2 Bedroom Units', '2 BEDROOM', '646 sqft - 807 sqft', '$1,993,000 - $2,210,000', 170, 2, 1),
    ('123e4567-e89b-12d3-a456-426614174000', '2 Bedroom Units', '2 BEDROOM+STUDY', '700 sqft - 721 sqft', 'Not Applicable', 136, 0, 0),
    ('123e4567-e89b-12d3-a456-426614174000', '3 Bedroom Units', '3 BEDROOM', '872 sqft - 1,141 sqft', '$2,966,000 - $3,120,000', 102, 6, 6),
    ('123e4567-e89b-12d3-a456-426614174000', '3 Bedroom Units', '3 BEDROOM PREMIER', '1,066 sqft - 1,302 sqft', '$3,047,000 - $3,735,000', 136, 33, 24),
    ('123e4567-e89b-12d3-a456-426614174000', '3 Bedroom Units', '3 BEDROOM+STUDY', '1,227 sqft - 1,464 sqft', '$3,452,000 - $4,336,000', 72, 60, 83),
    ('123e4567-e89b-12d3-a456-426614174000', '4 Bedroom Units', '4 BEDROOM', '1,227 sqft - 1,518 sqft', '$3,593,000 - $4,209,000', 68, 10, 15),
    ('123e4567-e89b-12d3-a456-426614174000', '4 Bedroom Units', '4 BEDROOM PREMIER', '1,690 sqft - 2,034 sqft', '$4,759,000 - $5,879,000', 32, 29, 91),
    ('123e4567-e89b-12d3-a456-426614174000', '5 Bedroom Units', '5 BEDROOM', '1,905 sqft - 2,260 sqft', '$5,567,000 - $6,669,000', 32, 29, 91);

-- Insert floor plans for 10 Evelyn
INSERT INTO floor_plans (project_id, unit_type_id, plan_code, plan_label, size, bedrooms, bathrooms, image_url) VALUES
    ('123e4567-e89b-12d3-a456-426614174000', 1, 'A', '1 Bedroom', '484 - 527 sq ft', 1, 1, '/floorplan-dummy.png'),
    ('123e4567-e89b-12d3-a456-426614174000', 2, 'B', '2 Bedroom', '678 - 753 sq ft', 2, 2, '/floorplan-dummy.png'),
    ('123e4567-e89b-12d3-a456-426614174000', 3, 'C', '3 Bedroom', '1,076 - 1,184 sq ft', 3, 2, '/floorplan-dummy.png'),
    ('123e4567-e89b-12d3-a456-426614174000', 4, 'D', '4 Bedroom', '1,518 - 1,636 sq ft', 4, 3, '/floorplan-dummy.png');

-- Insert location points for 10 Evelyn
INSERT INTO location_points (project_id, name, distance, type) VALUES
    ('123e4567-e89b-12d3-a456-426614174000', 'Newton MRT', '300m', 'mrt'),
    ('123e4567-e89b-12d3-a456-426614174000', 'Orchard MRT', '800m', 'mrt'),
    ('123e4567-e89b-12d3-a456-426614174000', 'Anglo-Chinese School (Junior)', '400m', 'school'),
    ('123e4567-e89b-12d3-a456-426614174000', 'St. Margaret''s Primary School', '600m', 'school'),
    ('123e4567-e89b-12d3-a456-426614174000', 'United Square', '250m', 'amenity'),
    ('123e4567-e89b-12d3-a456-426614174000', 'Goldhill Plaza', '400m', 'amenity'),
    ('123e4567-e89b-12d3-a456-426614174000', 'Newton Green', '150m', 'park');

-- Insert media reviews for 10 Evelyn
INSERT INTO media_reviews (project_id, source, review_date, title, excerpt, rating) VALUES
    ('123e4567-e89b-12d3-a456-426614174000', 'The Edge Property', '2024-02-15', '10 Evelyn: A Rare Freehold Gem in Newton', 'The development offers a unique opportunity for investors and homeowners alike...', 4.5),
    ('123e4567-e89b-12d3-a456-426614174000', 'PropertyGuru', '2024-02-10', 'Why 10 Evelyn is the Talk of Newton', 'With its prime location and luxury finishes, 10 Evelyn stands out...', 4.8);

-- Insert moat data for 10 Evelyn
INSERT INTO moat_data (
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
    '123e4567-e89b-12d3-a456-426614174000',
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