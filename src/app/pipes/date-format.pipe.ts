import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let _dateEN:any;
        let _dateES:any;
      //  console.log('_dateEN in pipe', _dateEN = localStorage.getItem('dateEn'));
     //   console.log('_dateEN in pipe', _dateES = localStorage.getItem('dateES'));
        if(_dateEN==='EN'){
            return super.transform(value, 'dd/MM/YYYY');
        }
        if(_dateES==='ES'){
            return super.transform(value, 'dd/MM/YYYY');
        }
    }

}
