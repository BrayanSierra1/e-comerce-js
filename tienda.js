// array carro de compra
const carro = []

const ordenarMenorMayor = () => {
    prendas.sort((a, b) => a.costo - b.costo)
    mostrarListaOrdenada()
};

const ordenarMayorMenor = () => {
    prendas.sort((b, a) => a.costo - b.costo)
    mostrarListaOrdenada()
};

const mostrarListaOrdenada = () => {
    const listadePrendas = prendas.map(prenda => {
        return '- ' + prenda.nombre + ' $' + prenda.costo
    })
    alert('lista de costos:' + '\n\n' + listadePrendas.join('\n'))
    compradePrendas(listadePrendas)
};

const compradePrendas = (listadePrendas) => {
    let prendasNombre = ''
    let prendasCantidad = 0
    let otraPrenda = false

    do {
        prendasNombre = prompt('¿que prendas deseas comprar🤗?' + '\n\n' + listadePrendas.join('\n'))
        prendasCantidad = parseInt(prompt('¿Cuantas prendas quieres comprar🤨?'))

        const prenda = prendas.find(prenda => prenda.nombre.toLowerCase() === prendasNombre.toLowerCase())

        if (prenda) {
            addOfCar(prenda, prenda.id, prendasCantidad)
        } else {
            alert('la prenda no esta en inventario por ahora😣')
        }

        otraPrenda = confirm('¿agregaras algo más?')
    } while (otraPrenda);

    confirmBuy()
}

const addOfCar = (prenda, prendaId, prendaCantidad) => {
    const prendaIgual = carro.find(prenda => prenda.id === prendaId)
    if (!prendaIgual) {
        prenda.cantidad += prendaCantidad
        carro.push(prenda)
    } else {
        prendaIgual.cantidad += prendaCantidad
    }
};

const sacarPrendaCarro = (nombrePrendaAEliminar) => {
    carro.forEach((prenda, index) => {
        if (prenda.nombre.toLowerCase() === nombrePrendaAEliminar.toLowerCase()) {
            if (prenda.cantidad > 1) {
                prenda.cantidad--
            } else {
                carro.splice(index, 1)
            }
        }
    })
    confirmBuy()
};

const confirmBuy = () => {
    const listadePrendas = carro.map(prenda => {
        return '- ' + prenda.nombre + ' | Cantidad: ' + prenda.cantidad
    })

    const isCheckout = confirm('checkout:'
        +'\n\n' + listadePrendas.join('\n')
        +'\n\n si quieres continuar dale "aceptar"🙂 sino "cancelar para eliminar una prenda del carro"🙄'
    )

    if (isCheckout) {
        finalizarBuy(listadePrendas)
    } else {
        const nombrePrendaAEliminar = prompt('ingrese el nombre de la prenda a eliminar 😕')
        sacarPrendaCarro(nombrePrendaAEliminar)
    }
};

const calcularInteres= (porcentaje,valor) => {
    return porcentaje * valor / 100
}

const calcularCuota = (nCuotas, costo) => {
    if (nCuotas===1){
        return costo;
    }
    const valorCuota = costo / nCuotas;
    const valorTotal = calcularInteres(1,valorCuota) + valorCuota;
    return valorTotal;
}

const cuotas = (costoTotal) => {
    const confirmarCuota =confirm('¿deseas pagar a cuotas?')

    if(confirmarCuota){
        const numeroCuotas = prompt("¿a cuantas cuotas te gustaria pagar?, 1, 2, 4 o 6")
        const valorCuota = calcularCuota(Number(numeroCuotas),costoTotal)
    alert ("el valor de la cuota es " + valorCuota)
    }else{
        alert('gracias por tu compra')
    }
}

const finalizarBuy = (listadePrendas) =>{
    const cantidadTotal = carro.reduce((acc, item) => acc + item.cantidad, 0)
    const costoTotal = carro.reduce((acc, item) => acc + (item.cantidad * item.costo), 0)
    alert(
        +'\n\n' + listadePrendas.join('\n')
        +'\n\nTotal de prendas: '+cantidadTotal
        +'\n\nEl Total de tus prendas compradas es: '+costoTotal.toLocaleString()
    )
    cuotas(costoTotal)
};

const comprar = () =>{
    const prendasBaratas = confirm('¿quieres que la lista de compra este ordenada del mas barato al mas caro?')

    if(prendasBaratas){
        ordenarMenorMayor()
    }else{
        ordenarMayorMenor
    }
};

comprar()