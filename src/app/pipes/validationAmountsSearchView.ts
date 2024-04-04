import Swal from 'sweetalert2';

export class ValidationAmount {
    form(inputAmount: any) {
        let _currency: any;
        let x= 1200;
        console.log('_currencyEN in pipe', _currency = localStorage.getItem('currency'));

        if (_currency === 'en') {
            let sampleRegExMail =
                //  new RegExp('^([0-9 ,]\\d{0,20})+(\\.\\d{0,3})?$');

                new RegExp('^([0-9]+(\.[0-9]{0,3})?\s*)+$'); //added

            console.log('sampleRegExMailValidationAmountEn', sampleRegExMail.test('50,200,765.314'));    // format esp
            console.log('sampleRegExMailinputAmount', sampleRegExMail.test(inputAmount));
            let validation = sampleRegExMail.test(inputAmount);
            if (validation === true) {
                this.toast('success', false, ' Input Amount success');
            } else {
                this.toast('warning', true, 'InValid Input Amount');
            }
            return validation;
        }

        if (_currency === 'es') {
            console.log("im es");
            console.log('inputAmount', inputAmount);
            let sampleRegExMail =
              //  new RegExp('^[0-9 .]*\\.*(\\d*\\,\\d*)[0-9]?$');
                // /new RegExp('^([0-9 .]\\d{0,20})+(\\,\\d{0,3})?$');

                new RegExp('^([0-9]+(\.[0-9]{0,3})?\s*)+$'); //added


            console.log('regExMailValidationAmountEs', sampleRegExMail.test('4124,76'));    // format esp
            console.log('inputAmountEs', sampleRegExMail.test(inputAmount));
            let validation = sampleRegExMail.test(inputAmount);
            if (validation === true) {
                this.toast('success', false, ' Input Amount success');
            } else {
                this.toast('warning', true, ' Input Amount InValid');
            }
            return validation;

        }
    }









    toast(typeIcon: any, timerProgressBar: boolean = false, titleNotif: any) {
        Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            icon: typeIcon,
            timerProgressBar,
            timer: 5000,
            title: titleNotif
        });
    }
}
