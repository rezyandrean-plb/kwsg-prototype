-- =====================================================
-- PostgreSQL Database Queries for KWSG Project System
-- =====================================================

-- 1. Get complete project details by slug
-- This query fetches all project information including related data
SELECT 
    p.*,
    d.name as developer_name,
    pt.name as property_type,
    ps.name as status,
    a.name as agent_name,
    a.phone as agent_phone,
    a.email as agent_email,
    a.whatsapp as agent_whatsapp,
    a.image_url as agent_image,
    a.company as agent_company,
    a.license as agent_license,
    a.experience as agent_experience,
    a.languages as agent_languages,
    a.specialties as agent_specialties
FROM projects p
LEFT JOIN developers d ON p.developer_id = d.id
LEFT JOIN property_types pt ON p.property_type_id = pt.id
LEFT JOIN project_statuses ps ON p.status_id = ps.id
LEFT JOIN agents a ON p.agent_id = a.id
WHERE p.slug = '10-evelyn';

-- 2. Get project images ordered by display order
SELECT 
    pi.image_url,
    pi.display_order
FROM project_images pi
JOIN projects p ON pi.project_id = p.id
WHERE p.slug = '10-evelyn'
ORDER BY pi.display_order;

-- 3. Get project features
SELECT 
    f.name as feature_name
FROM project_features pf
JOIN projects p ON pf.project_id = p.id
JOIN features f ON pf.feature_id = f.id
WHERE p.slug = '10-evelyn'
ORDER BY f.name;

-- 4. Get project facilities
SELECT 
    f.name as facility_name
FROM project_facilities pf
JOIN projects p ON pf.project_id = p.id
JOIN facilities f ON pf.facility_id = f.id
WHERE p.slug = '10-evelyn'
ORDER BY f.name;

-- 5. Get unit types and pricing
SELECT 
    ut.type,
    ut.size,
    ut.price
FROM unit_types ut
JOIN projects p ON ut.project_id = p.id
WHERE p.slug = '10-evelyn'
ORDER BY 
    CASE 
        WHEN ut.type LIKE '%1%' THEN 1
        WHEN ut.type LIKE '%2%' THEN 2
        WHEN ut.type LIKE '%3%' THEN 3
        WHEN ut.type LIKE '%4%' THEN 4
        WHEN ut.type LIKE '%5%' THEN 5
        ELSE 6
    END;

-- 6. Get detailed unit availability data
SELECT 
    ua.unit_type,
    ua.subtype,
    ua.size,
    ua.price,
    ua.total_units,
    ua.available_units,
    ua.status_percentage,
    ROUND((ua.available_units::DECIMAL / ua.total_units * 100), 1) as availability_percentage
FROM unit_availability ua
JOIN projects p ON ua.project_id = p.id
WHERE p.slug = '10-evelyn'
ORDER BY 
    CASE 
        WHEN ua.unit_type LIKE '%1%' THEN 1
        WHEN ua.unit_type LIKE '%2%' THEN 2
        WHEN ua.unit_type LIKE '%3%' THEN 3
        WHEN ua.unit_type LIKE '%4%' THEN 4
        WHEN ua.unit_type LIKE '%5%' THEN 5
        ELSE 6
    END;

-- 7. Get floor plans with unit type information
SELECT 
    fp.plan_code,
    fp.plan_label,
    fp.size,
    fp.bedrooms,
    fp.bathrooms,
    fp.image_url,
    ut.type as unit_type
FROM floor_plans fp
JOIN projects p ON fp.project_id = p.id
JOIN unit_types ut ON fp.unit_type_id = ut.id
WHERE p.slug = '10-evelyn'
ORDER BY fp.plan_code;

-- 8. Get location analytics (MRT, schools, amenities, parks)
SELECT 
    lp.name,
    lp.distance,
    lp.type,
    CASE lp.type
        WHEN 'mrt' THEN '🚇'
        WHEN 'school' THEN '🏫'
        WHEN 'amenity' THEN '🏪'
        WHEN 'park' THEN '🌳'
        ELSE '📍'
    END as icon
FROM location_points lp
JOIN projects p ON lp.project_id = p.id
WHERE p.slug = '10-evelyn'
ORDER BY 
    CASE lp.type
        WHEN 'mrt' THEN 1
        WHEN 'school' THEN 2
        WHEN 'amenity' THEN 3
        WHEN 'park' THEN 4
        ELSE 5
    END,
    lp.name;

-- 9. Get media reviews
SELECT 
    mr.source,
    mr.review_date,
    mr.title,
    mr.excerpt,
    mr.rating,
    CASE 
        WHEN mr.rating >= 4.5 THEN '⭐⭐⭐⭐⭐'
        WHEN mr.rating >= 4.0 THEN '⭐⭐⭐⭐'
        WHEN mr.rating >= 3.5 THEN '⭐⭐⭐'
        WHEN mr.rating >= 3.0 THEN '⭐⭐'
        ELSE '⭐'
    END as rating_stars
FROM media_reviews mr
JOIN projects p ON mr.project_id = p.id
WHERE p.slug = '10-evelyn'
ORDER BY mr.review_date DESC;

-- 10. Get AI MOAT analysis data
SELECT 
    md.project_name,
    md.exit_audience,
    md.district_disparity_effect,
    md.mrt_proximity,
    md.parents_attraction_effect,
    md.quantum_effect,
    md.rental_demand,
    md.region_disparity_effect,
    md.volume_effect,
    md.balas_curve_effect,
    md.landsize_density,
    ROUND((md.exit_audience + md.district_disparity_effect + md.mrt_proximity + 
           md.parents_attraction_effect + md.quantum_effect + md.rental_demand + 
           md.region_disparity_effect + md.volume_effect + md.balas_curve_effect + 
           md.landsize_density) / 10, 2) as overall_moat_score
FROM moat_data md
JOIN projects p ON md.project_id = p.id
WHERE p.slug = '10-evelyn';

-- 11. Get similar projects
SELECT 
    sp2.name,
    sp2.project_name,
    sp2.slug,
    sp2.location,
    sp2.price,
    sp2.price_per_sqft,
    sp2.bedrooms,
    sp2.size,
    sp2.total_units,
    sp2.completion,
    sp2.latitude,
    sp2.longitude,
    d.name as developer_name,
    pt.name as property_type
FROM similar_projects sp
JOIN projects sp1 ON sp.project_id = sp1.id
JOIN projects sp2 ON sp.similar_project_id = sp2.id
LEFT JOIN developers d ON sp2.developer_id = d.id
LEFT JOIN property_types pt ON sp2.property_type_id = pt.id
WHERE sp1.slug = '10-evelyn';

-- 12. Get projects by district
SELECT 
    p.name,
    p.slug,
    p.location,
    p.price,
    p.price_per_sqft,
    p.bedrooms,
    p.size,
    p.total_units,
    p.completion,
    d.name as developer_name,
    pt.name as property_type,
    ps.name as status
FROM projects p
LEFT JOIN developers d ON p.developer_id = d.id
LEFT JOIN property_types pt ON p.property_type_id = pt.id
LEFT JOIN project_statuses ps ON p.status_id = ps.id
WHERE p.district = '11'
ORDER BY p.name;

-- 13. Get projects by price range
SELECT 
    p.name,
    p.slug,
    p.location,
    p.price,
    p.price_per_sqft,
    p.bedrooms,
    p.size,
    p.total_units,
    p.completion,
    d.name as developer_name,
    pt.name as property_type
FROM projects p
LEFT JOIN developers d ON p.developer_id = d.id
LEFT JOIN property_types pt ON p.property_type_id = pt.id
WHERE CAST(REPLACE(REPLACE(p.price_from, ',', ''), '$', '') AS INTEGER) BETWEEN 1000000 AND 3000000
ORDER BY CAST(REPLACE(REPLACE(p.price_from, ',', ''), '$', '') AS INTEGER);

-- 14. Get projects by property type
SELECT 
    p.name,
    p.slug,
    p.location,
    p.price,
    p.price_per_sqft,
    p.bedrooms,
    p.size,
    p.total_units,
    p.completion,
    d.name as developer_name,
    ps.name as status
FROM projects p
LEFT JOIN developers d ON p.developer_id = d.id
LEFT JOIN project_statuses ps ON p.status_id = ps.id
WHERE p.property_type_id = (SELECT id FROM property_types WHERE name = 'Condominium')
ORDER BY p.name;

-- 15. Get projects by developer
SELECT 
    p.name,
    p.slug,
    p.location,
    p.price,
    p.price_per_sqft,
    p.bedrooms,
    p.size,
    p.total_units,
    p.completion,
    pt.name as property_type,
    ps.name as status
FROM projects p
LEFT JOIN property_types pt ON p.property_type_id = pt.id
LEFT JOIN project_statuses ps ON p.status_id = ps.id
WHERE p.developer_id = (SELECT id FROM developers WHERE name = 'Amara Holdings')
ORDER BY p.name;

-- 16. Get projects with high MOAT scores
SELECT 
    p.name,
    p.slug,
    p.location,
    p.price,
    md.exit_audience,
    md.mrt_proximity,
    md.rental_demand,
    ROUND((md.exit_audience + md.district_disparity_effect + md.mrt_proximity + 
           md.parents_attraction_effect + md.quantum_effect + md.rental_demand + 
           md.region_disparity_effect + md.volume_effect + md.balas_curve_effect + 
           md.landsize_density) / 10, 2) as overall_moat_score
FROM projects p
JOIN moat_data md ON p.id = md.project_id
WHERE (md.exit_audience + md.district_disparity_effect + md.mrt_proximity + 
       md.parents_attraction_effect + md.quantum_effect + md.rental_demand + 
       md.region_disparity_effect + md.volume_effect + md.balas_curve_effect + 
       md.landsize_density) / 10 >= 4.0
ORDER BY overall_moat_score DESC;

-- 17. Get projects near MRT stations (within 500m)
SELECT 
    p.name,
    p.slug,
    p.location,
    p.price,
    lp.name as nearest_mrt,
    lp.distance,
    p.latitude,
    p.longitude
FROM projects p
JOIN location_points lp ON p.id = lp.project_id
WHERE lp.type = 'mrt' 
AND (lp.distance LIKE '%300m%' OR lp.distance LIKE '%400m%' OR lp.distance LIKE '%500m%')
ORDER BY p.name;

-- 18. Get projects with available units
SELECT 
    p.name,
    p.slug,
    p.location,
    p.price,
    SUM(ua.available_units) as total_available_units,
    COUNT(ua.id) as unit_types_available
FROM projects p
JOIN unit_availability ua ON p.id = ua.project_id
WHERE ua.available_units > 0
GROUP BY p.id, p.name, p.slug, p.location, p.price
HAVING SUM(ua.available_units) > 0
ORDER BY total_available_units DESC;

-- 19. Get projects by completion year
SELECT 
    p.name,
    p.slug,
    p.location,
    p.price,
    p.completion,
    p.total_units,
    d.name as developer_name,
    pt.name as property_type
FROM projects p
LEFT JOIN developers d ON p.developer_id = d.id
LEFT JOIN property_types pt ON p.property_type_id = pt.id
WHERE p.completion = '2025'
ORDER BY p.name;

-- 20. Get comprehensive project summary for dashboard
SELECT 
    p.name,
    p.slug,
    p.location,
    p.price,
    p.price_per_sqft,
    p.bedrooms,
    p.size,
    p.total_units,
    p.completion,
    d.name as developer_name,
    pt.name as property_type,
    ps.name as status,
    COUNT(pi.id) as image_count,
    COUNT(ut.id) as unit_type_count,
    COUNT(lp.id) as location_point_count,
    COUNT(mr.id) as review_count,
    COALESCE(md.overall_score, 0) as moat_score
FROM projects p
LEFT JOIN developers d ON p.developer_id = d.id
LEFT JOIN property_types pt ON p.property_type_id = pt.id
LEFT JOIN project_statuses ps ON p.status_id = ps.id
LEFT JOIN project_images pi ON p.id = pi.project_id
LEFT JOIN unit_types ut ON p.id = ut.project_id
LEFT JOIN location_points lp ON p.id = lp.project_id
LEFT JOIN media_reviews mr ON p.id = mr.project_id
LEFT JOIN (
    SELECT 
        project_id,
        ROUND((exit_audience + district_disparity_effect + mrt_proximity + 
               parents_attraction_effect + quantum_effect + rental_demand + 
               region_disparity_effect + volume_effect + balas_curve_effect + 
               landsize_density) / 10, 2) as overall_score
    FROM moat_data
) md ON p.id = md.project_id
GROUP BY p.id, p.name, p.slug, p.location, p.price, p.price_per_sqft, p.bedrooms, 
         p.size, p.total_units, p.completion, d.name, pt.name, ps.name, md.overall_score
ORDER BY p.name;

-- 21. Get agent details with their assigned projects
SELECT 
    a.name as agent_name,
    a.role,
    a.phone,
    a.email,
    a.whatsapp,
    a.company,
    a.license,
    a.experience,
    a.languages,
    a.specialties,
    COUNT(p.id) as assigned_projects,
    STRING_AGG(p.name, ', ') as project_names
FROM agents a
LEFT JOIN projects p ON a.id = p.agent_id
GROUP BY a.id, a.name, a.role, a.phone, a.email, a.whatsapp, a.company, a.license, a.experience, a.languages, a.specialties
ORDER BY a.name;

-- 22. Get facility usage across projects
SELECT 
    f.name as facility_name,
    COUNT(pf.project_id) as project_count,
    STRING_AGG(p.name, ', ') as projects_with_facility
FROM facilities f
LEFT JOIN project_facilities pf ON f.id = pf.facility_id
LEFT JOIN projects p ON pf.project_id = p.id
GROUP BY f.id, f.name
ORDER BY project_count DESC;

-- 23. Get feature usage across projects
SELECT 
    f.name as feature_name,
    COUNT(pf.project_id) as project_count,
    STRING_AGG(p.name, ', ') as projects_with_feature
FROM facilities f
LEFT JOIN project_features pf ON f.id = pf.feature_id
LEFT JOIN projects p ON pf.project_id = p.id
GROUP BY f.id, f.name
ORDER BY project_count DESC;

-- 24. Get developer portfolio
SELECT 
    d.name as developer_name,
    COUNT(p.id) as project_count,
    STRING_AGG(p.name, ', ') as projects,
    AVG(CAST(REPLACE(REPLACE(p.price_from, ',', ''), '$', '') AS INTEGER)) as avg_price_from,
    SUM(CAST(REPLACE(p.total_units, ' Units', '') AS INTEGER)) as total_units_developed
FROM developers d
LEFT JOIN projects p ON d.id = p.developer_id
GROUP BY d.id, d.name
ORDER BY project_count DESC;

-- 25. Get projects with complete data (all related tables populated)
SELECT 
    p.name,
    p.slug,
    CASE 
        WHEN pi_count > 0 AND ut_count > 0 AND lp_count > 0 AND mr_count > 0 AND md_count > 0 THEN 'Complete'
        WHEN pi_count > 0 AND ut_count > 0 AND lp_count > 0 THEN 'Partial'
        ELSE 'Basic'
    END as data_completeness,
    pi_count as image_count,
    ut_count as unit_type_count,
    lp_count as location_point_count,
    mr_count as review_count,
    md_count as moat_data_count
FROM projects p
LEFT JOIN (
    SELECT project_id, COUNT(*) as pi_count FROM project_images GROUP BY project_id
) pi ON p.id = pi.project_id
LEFT JOIN (
    SELECT project_id, COUNT(*) as ut_count FROM unit_types GROUP BY project_id
) ut ON p.id = ut.project_id
LEFT JOIN (
    SELECT project_id, COUNT(*) as lp_count FROM location_points GROUP BY project_id
) lp ON p.id = lp.project_id
LEFT JOIN (
    SELECT project_id, COUNT(*) as mr_count FROM media_reviews GROUP BY project_id
) mr ON p.id = mr.project_id
LEFT JOIN (
    SELECT project_id, COUNT(*) as md_count FROM moat_data GROUP BY project_id
) md ON p.id = md.project_id
ORDER BY data_completeness DESC, p.name; 