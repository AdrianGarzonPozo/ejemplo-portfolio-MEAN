
var params = process.argv.slice(2); //El 1 es el archivo que ejecuta node

var nm1 = parseFloat(params[0])
var nm2 = parseFloat(params[1])

console.log(params)
console.log(nm1)
console.log(nm2)

var plantilla=`La suma es: ${nm1+nm2}
La resta es: ${nm1-nm2}
La multiplicación es: ${nm1*nm2}
La división es: ${nm1/nm2}
`

console.log(plantilla)