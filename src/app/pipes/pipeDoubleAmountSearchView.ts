export class doubleAmount{

    separator(amount) {
        if(amount!=null){
            let _currency: any;
            let _str: any;
            console.log('_currencyEN in pipe', _currency = localStorage.getItem('currency'));
            if(_currency==='en'){
                _str = amount.toString().split('.');
                _str[0] = _str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return _str.join('.');
            }

            if(_currency==='es'){
                _str = amount.toString().split(',');
                _str[0] = _str[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                return _str.join(',');
            }
        }
    }


    separatorViewEdit(amount) {
        if(amount!=null){
            let _currency: any;
            let _dotsRemoved: any;
            let _str: any;
            let amountFormated :any;

            console.log('_currencyEN in pipe', _currency = localStorage.getItem('currency'));
            if(_currency==='es'){
                console.log('amount',amount); 
                // case 1 montant
                amountFormated = amount.replace(/[.]/g, '');

                if(!amount.includes(';')) {
                    _str = amountFormated.toString().split(',');
                    // _str[0] = _str[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

                    console.log("_str.join('.')",_str.join('.'));
                    return _str.join('.');
                }
                else {
                    console.log('amountFormated',amountFormated); 
                //     amountFormated = amount.toString().split(';'); 
                //     console.log('amoutttt',amountFormated); 

                //    let resultF= amountFormated.map(function(element) {
                //         return element.replace(',','.');
                //    });

                //    _str = resultF.join(',');
                //    console.log('_strff',_str); 
                   _str = amountFormated;
                   return _str;
                }
                /*
                _dotsRemoved =  amount.replace(/[.]/g, '');
                _str = _dotsRemoved.toString().split(',');
                _str[0] = _str[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                return _str.join(',');
                */

            }

            if(_currency==='en'){
                console.log('amount',amount); 
                // case 1 montant
                amountFormated = amount.replace(/[,]/g, '');
                if(!amount.includes(';')) {
                    _str = amountFormated.toString().split('.');
                    _str[0] = _str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    console.log('str',_str.join('.')); 
                    return _str.join('.') // envoyer 1123123.1
                }
                else {
                    console.log('amoutttt',amount); 
                    amountFormated = amount.toString().split(';');

                    for(var i=0 ;i<amountFormated.length; i++) {

                         _str = amountFormated.join(',');
                         console.log('strrrr',_str); 
                         return _str;

                    }


                }


                /* ANCIEN
                 console.log('amount',amount); // 1123123.30

                _dotsRemoved =  amount.replace(/[,]/g, '');
                console.log('_dotsRemoved',_dotsRemoved); // 1123123.30

                _str = _dotsRemoved.toString().split('.');
                console.log('_str',_str); // ['1123123','30']

                _str[0] = _str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // partie de millier
                console.log('_str[0]', _str[0]); // 1,123,123

                console.log('str',_str); // ['1,123,123', '30']
                console.log("_str.join('.')",_str.join('.')); //1,123,123.30
                return _str.join('.');
                */
            }
        }

    }


    slaAmount(amount){




        if(amount!=null){
            let _dotsRemoved:any;
            _dotsRemoved =  amount.replace(/[.]/g, '');
            let _currency: any;
            let _str: any;
            console.log('_currencyEN in pipe', _currency = localStorage.getItem('currency'));
            if(_currency==='en'){
                _str = _dotsRemoved.toString().split('.');
                _str[0] = _str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return _str.join('.');
            }

            if(_currency==='es'){
                _str = _dotsRemoved.toString().split(',');
                _str[0] = _str[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                return _str.join(',');
            }
        }
    }
}
