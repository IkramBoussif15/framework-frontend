export class doubleAmount{
    separator(amount: { toString: () => string; } | null) {
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
    separatorViewEdit(amount: string | null) {
        if(amount!=null){
            let _currency: any;
            let _dotsRemoved: any;
            let _str: any;
            console.log('_currencyEN in pipe', _currency = localStorage.getItem('currency'));
            if(_currency==='es'){
                _dotsRemoved =  amount.replace(/[.]/g, '');
                _str = _dotsRemoved.toString().split(',');
                _str[0] = _str[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                return _str.join(',');
            }
            if(_currency==='en'){
                _dotsRemoved =  amount.replace(/[,]/g, '');
                _str = _dotsRemoved.toString().split('.');
                _str[0] = _str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                console.log('_str[0]', _str[0]);
                return _str.join('.');
            }
        }

    }


    slaAmount(amount: string | null){




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