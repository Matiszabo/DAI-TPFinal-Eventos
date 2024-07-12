export default class EventLocation{
    id;
    id_location;
    name;
    full_address;
    max_capacity;
    latitude;
    longitude;
    id_creator_user;

    constructor(id, idl, n, fa, max, lat, long, idcu){
        this.id = id;
        this.id_location = idl;
        this.name = n;
        this.full_address = fa;
        this.max_capacity = max;
        this.latitude = lat;
        this.longitude = long;
        this.id_creator_user = idcu;
    }
}