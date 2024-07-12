export default class Location{
    id;
    name;
    id_province;
    latitude;
    longitude;

    constructor(n, idP, lat, long){
        this.id = undefined;
        this.name = n;
        this.id_province = idP;
        this.latitude = lat;
        this.longitude = long;
    }
}