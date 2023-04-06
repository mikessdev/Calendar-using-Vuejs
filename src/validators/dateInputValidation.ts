export function yearInputValidation(year: number){
    return year < 1950 ? "Ano inválido" : '';
}

export function monthInputValidation(month: number ){
    return month > 12 || month < 1 ? "Mês inválido" : '';
}

export function dayInputValidation(day: number){

    return day > 31 || day < 1 ? "Dia inválido" : '';
}