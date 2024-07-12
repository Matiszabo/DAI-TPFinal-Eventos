export default class Event{
    id;
    name;
    description;
    id_event_category;
    id_event_location;
    start_date;
    duration_in_minutes;
    price;
    enabled_for_enrollment;
    max_assistance;
    id_creator_user;

    constructor(id, name, desc, idcat, idloc, stdt, dmins, prc, enroll, max, idcreate){
        this.id = id;
        this.name = name;
        this.description = desc;
        this.id_event_category = idcat;
        this.id_event_location = idloc;
        this.start_date = stdt;
        this.duration_in_minutes = dmins;
        this.price = prc;
        this.enabled_for_enrollment = enroll;
        this.max_assistance = max;
        this.id_creator_user = idcreate;
    }
}