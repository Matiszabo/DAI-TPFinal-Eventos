--Get event details SP

CREATE FUNCTION public.get_event_details(event_id integer) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
    event_details JSON;
BEGIN
    SELECT 
        json_agg(json_build_object(
            'id', e.id,
            'name', e.name,
            'description', e.description,
            'event_category', json_build_object(
                'id', ec.id,
                'name', ec.name
            ),
            'event_location', json_build_object(
                'id', el.id,
                'name', el.name,
                'full_address', el.full_address,
                'max_capacity', el.max_capacity,
                'latitude', el.latitude,
                'longitude', el.longitude,
                'location', json_build_object(
                    'id', l.id,
                    'name', l.name,
                    'latitude', l.latitude,
                    'longitude', l.longitude,
                    'province', json_build_object(
                        'id', pr.id,
                        'name', pr.name,
                        'full_name', pr.full_name,
                        'latitude', pr.latitude,
                        'longitude', pr.longitude,
                        'display_order', pr.display_order
                    )
                )
            ),
            'start_date', e.start_date,
            'duration_in_minutes', e.duration_in_minutes,
            'price', e.price,
            'enabled_for_enrollment', e.enabled_for_enrollment,
            'max_assistance', e.max_assistance,
            'creator_user', json_build_object(
                'id', u.id,
                'username', u.username,
                'first_name', u.first_name,
                'last_name', u.last_name
            ),
            'tags', (
                SELECT json_agg(json_build_object('id', tags.id, 'name', tags.name)) 
                FROM tags 
                JOIN event_tags et ON tags.id = et.id_tag 
                WHERE et.id_event = e.id
            )
        )) INTO event_details
    FROM 
        events e
    INNER JOIN 
        event_categories ec ON e.id_event_category = ec.id
    INNER JOIN 
        event_locations el ON e.id_event_location = el.id
    INNER JOIN 
        locations l ON el.id_location = l.id
    INNER JOIN 
        provinces pr ON l.id_province = pr.id
    INNER JOIN 
        users u ON e.id_creator_user = u.id
    WHERE 
        e.id = event_id;

    RETURN event_details;
END;
$$;


ALTER FUNCTION public.get_event_details(event_id integer) OWNER TO postgres;