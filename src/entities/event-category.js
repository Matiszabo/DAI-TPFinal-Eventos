export default class EventCategory{
    id;
    name;
    display_order;

    constructor(n, disp_order){
        this.id = undefined;
        this.name = n;
        this.display_order = disp_order;
    }
}