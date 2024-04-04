import {MapperValue} from "./MapperValue.model";

export class ContextDto{
name! : String;
filter!: string;
useCase! : String;
mapperValues!: MapperValue[] ;
contextDto : any;
idDashboard:any;
dataCollection:any
}