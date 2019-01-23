class ToDo {
    _id:string;
    title: string;
    description: string;
    date: Date;
    status: string;

    ///provides default values if created with no values
    constructor(){
        this.title = ""
        this.description = ""
        this.date = new Date()
        this.status = ""
    }
}

export default ToDo;