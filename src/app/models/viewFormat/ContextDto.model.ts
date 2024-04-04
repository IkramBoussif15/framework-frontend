import { MapperValue } from './MapperValue.model';
export class ContextDto{
    name!: string;
    useCase!: String;
    mapperValues!: MapperValue[];
    contextDto!: ContextDto;
    idDashBoard!: number;

    
}