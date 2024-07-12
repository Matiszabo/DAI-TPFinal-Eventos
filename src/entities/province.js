class Province{
    id;
    name;
    full_name;
    latitude;
    longitude;
    display_order;

    constructor(n, full_n, lat, long, disp_order){
        this.id = undefined;
        this.name = n;
        this.full_name = full_n;
        this.latitude = lat;
        this.longitude = long;
        this.display_order = disp_order;
    }
}

export default Province;