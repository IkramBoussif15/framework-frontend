import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})
export class AmountPipe  implements PipeTransform   {

 transform(value: any, digits?: string): string {
      let _str: any;
      let _currency: any;
      console.log('_currencyEN in pipe', _currency = localStorage.getItem('currency'));
      if(_currency==='en'){
        _str = value.toString().split(',');
          _str[0] = _str[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
         const amount=  _str[0].replace(/[.]/g, '')
          console.log('_str[0]',amount)
          const amountAccount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
          console.log('_amountAccount',amountAccount)

          return amountAccount;


      }

  }

}
