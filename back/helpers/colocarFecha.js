
const colocarFecha = (fecha) => {
    return fecha.split('-').reverse().join('/');
}


const colocarHora = (hora) => {
    return hora.slice(0, 5);
}

module.exports = {
    colocarFecha,
    colocarHora
}