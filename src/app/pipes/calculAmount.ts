import Swal from "sweetalert2";

export class calculAmount {

    calculeAmount (list: any, amount:any ){
        const dotsRemoved =  amount.replace(/[.]/g, '');
        console.log('_dotsRemoved 👉️',dotsRemoved); // 👉️ 1234
        const dotsRemovedFloat =  dotsRemoved.replace(/[,]/g, '.');
        console.log('_dotsRemovedFloat 👉️',dotsRemovedFloat);
        const calculeAmpunt = parseFloat(dotsRemovedFloat);
        console.log('_👉️ parseFloat',calculeAmpunt); // 👉️ 1234.5
        const sommation = calculeAmpunt + 1.9
        console.log('_👉️ parseFloat + 1.9',sommation); // 👉️ 1234.5
        const sommationDeConvert = ""+sommation
        console.log('_👉️ sommationDeConvert',sommationDeConvert); // 👉️ 1234.5
        const convertPointVirgule =  sommationDeConvert.replace(/[.]/g, ',');
        console.log('_👉️ convertPointVirgule',convertPointVirgule); // 👉️ 1234.5






        /*
                const str = 'hello 1234 world';

        // 👇️ const replaced: string
                const replaced = str.replace(/\D/g, '');
                console.log(replaced); // 👉️ "1234"

                */
    }


}
