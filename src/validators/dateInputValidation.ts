export function yearInputValidation(year: number){
    return '';
}

export function monthInputValidation(month: number ){
    return month > 12 || month < 1 ? "Mês inválido" : '';
}

export function dayInputValidation(day: number){

    return day > 31 || day < 1 ? "Dia inválido" : '';
}