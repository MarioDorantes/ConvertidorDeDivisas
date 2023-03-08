function convertir(){
    let importe = parseFloat(document.getElementById("txt_importe").value);
    let tipo = document.getElementById("rad_peso_dolar").checked;
    let res = document.getElementById("txt_resultado");
    let txtasa = document.getElementById("txt_tasa");
    console.log(tipo);

    var request = new XMLHttpRequest();
    request.open('GET', "https://openexchangerates.org/api/latest.json?app_id=e77f99c02f404d34a3631b67223d85e5", true);

    request.onload = function() {
        if(request.status >= 200 && request.status < 300) {
            //Convierte la respuesta del WS a un objeto JSON
            var data = JSON.parse(this.response);
            //Imprime en consola el objeto JSON resultante
            console.log(data);
            //Asigna a la variable var_rates solo el arreglo de divisas contenido en la respuesta del WS
            var var_rates = data.rates;
            //Se extrae la tasa de conversión a Pesos Mexicanos de los resultados de WS
            var tasa = parseFloat(var_rates['MXN']);
                //Se valida que el importe y la tasa no sea Nulo y sea mayor a cero
                if(!isNaN(importe) && importe > 0.0 && !isNaN(tasa) && tasa > 0.0){
                    txtasa.value = tasa;
                    //Si es de Pesos a Dolares
                    if(tipo){
                        res.value = (importe / tasa);
                    }
                    //Si es de Dolares a Pesos
                    else {
                        res.value = (importe * tasa);
                    }
                }
        } else {
            alert("No se puede conectar al servidor...");
        }
    }

    request.send();

    return false; //Evita que se ejecute el redirect del FORM
}