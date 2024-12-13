export interface COURSE {
    _id?:string,
    title:string,
    description:string,
    teacherIds:Array<string>,
    enrollmentIds:Array<string>,
    slug:string,
}