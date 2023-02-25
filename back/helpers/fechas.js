// todo Mario

const colocarFecha = (fecha) => {
    return fecha.split('-').reverse().join('/');
}


const colocarHora = (hora) => {
    return hora.slice(0, 5);
}

const horaEsMayor = (horaMayor, horaMenor) => { // copara horas con el siguiente formato HH:mm
    let esMayor = false;
    if (horaMayor.slice(0, 2) > horaMenor.slice(0, 2)) {
        esMayor = true;
    }
    else if (horaMayor.slice(0, 2) == horaMenor.slice(0, 2)) {
        if (horaMayor.slice(3) > horaMenor.slice(3)) {
            esMayor = true;
        }
    }

    return esMayor;
}

module.exports = {
    colocarFecha,
    colocarHora,
    horaEsMayor
}