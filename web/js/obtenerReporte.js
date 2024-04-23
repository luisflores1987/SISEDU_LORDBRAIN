$(document).ready(function() {
    fnLimpiarReporteGeneral();
    fnBuscarReporteGeneral();
})

function fnObtenerReporte() {
    $.ajax({
        url: "obtenerReporteServletController",
        data: {
            action: "obtenerReporteGrado",
            anioAcademico: $('#cboAñoAcademico option:selected').text().trim()
        }
    })

            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                console.log("filas  " + arregloAlumnos.length);
                limparselect();
                if (data == '') {
                    $('#tblAlumnosReporteGeneral').append('<tr><td colspan = "37"><label> No se encontraron datos ... </label></td></tr>');
                }
                else {

                    $('#tblAlumnosReporteGeneral').append('<tr><td></td>\n\
                                                <td class="text-center textoNegrita">Es</td>\n\
                                                <td class="text-center textoNegrita">Re</td>\n\
                                                <td class="text-center textoNegrita">Fa</td>\n\
                                                <td class="text-center textoNegrita">Es</td>\n\
                                                <td class="text-center textoNegrita">Re</td>\n\
                                                <td class="text-center textoNegrita">Fa</td>\n\
                                                <td class="text-center textoNegrita">Es</td>\n\
                                                <td class="text-center textoNegrita">Re</td>\n\
                                                <td class="text-center textoNegrita">Fa</td>\n\
                                                <td class="text-center textoNegrita">Es</td>\n\
                                                <td class="text-center textoNegrita">Re</td>\n\
                                                <td class="text-center textoNegrita">Fa</td>\n\
                                                <td class="text-center textoNegrita">Es</td>\n\
                                                <td class="text-center textoNegrita">Re</td>\n\
                                                <td class="text-center textoNegrita">Fa</td>\n\
                                                <td class="text-center textoNegrita">Es</td>\n\
                                                <td class="text-center textoNegrita">Re</td>\n\
                                                <td class="text-center textoNegrita">Fa</td>\n\
                                                <td class="text-center textoNegrita">Es</td>\n\
                                                <td class="text-center textoNegrita">Re</td>\n\
                                                <td class="text-center textoNegrita">Fa</td>\n\
                                                <td class="text-center textoNegrita">Es</td>\n\
                                                <td class="text-center textoNegrita">Re</td>\n\
                                                <td class="text-center textoNegrita">Fa</td>\n\
                                                <td class="text-center textoNegrita">Es</td>\n\
                                                <td class="text-center textoNegrita">Re</td>\n\
                                                <td class="text-center textoNegrita">Fa</td>\n\
                                                <td class="text-center textoNegrita">Es</td>\n\
                                                <td class="text-center textoNegrita">Re</td>\n\
                                                <td class="text-center textoNegrita">Fa</td>\n\
                                                <td class="text-center textoNegrita">Es</td>\n\
                                                <td class="text-center textoNegrita">Re</td>\n\
                                                <td class="text-center textoNegrita">Fa</td>\n\
                                                <td class="text-center textoNegrita">Es</td>\n\
                                                <td class="text-center textoNegrita">Re</td>\n\
                                                <td class="text-center textoNegrita">Fa</td>\n\
                                           </tr>'
                            );
                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {
                        var grado = arregloAlumnos[i].split("-")[0];
                        var vacaEsperada = arregloAlumnos[i].split("-")[1];
                        var vacaReal = arregloAlumnos[i].split("-")[2];
                        var matriculaEsperada = arregloAlumnos[i].split("-")[3];
                        var matriculaReal = arregloAlumnos[i].split("-")[4];
                        var marzoEsperada = arregloAlumnos[i].split("-")[5];
                        var marzoReal = arregloAlumnos[i].split("-")[6];
                        var abrilEsperada = arregloAlumnos[i].split("-")[7];
                        var abrilReal = arregloAlumnos[i].split("-")[8];
                        var mayoEsperada = arregloAlumnos[i].split("-")[9];
                        var mayoReal = arregloAlumnos[i].split("-")[10];
                        var junioEsperada = arregloAlumnos[i].split("-")[11];
                        var junioReal = arregloAlumnos[i].split("-")[12];
                        var julioEsperada = arregloAlumnos[i].split("-")[13];
                        var julioReal = arregloAlumnos[i].split("-")[14];
                        var agostoEsperada = arregloAlumnos[i].split("-")[15];
                        var agostoReal = arregloAlumnos[i].split("-")[16];
                        var setiembreEsperada = arregloAlumnos[i].split("-")[17];
                        var setiembreReal = arregloAlumnos[i].split("-")[18];
                        var octubreEsperada = arregloAlumnos[i].split("-")[19];
                        var octubreReal = arregloAlumnos[i].split("-")[20];
                        var noviembreEsperada = arregloAlumnos[i].split("-")[21];
                        var noviembreReal = arregloAlumnos[i].split("-")[22];
                        var diciembreEsperada = arregloAlumnos[i].split("-")[23];
                        var diciembreReal = arregloAlumnos[i].split("-")[24];

                        if (grado == "TOTAL")
                        {

                            $('#tblAlumnosReporteGeneral').append('<tr class="active">\n\
                                                    <td class="lead">' + grado + '</td>\n\
                                                    <td>' + vacaEsperada + '</td>\n\
                                                    <td>' + vacaReal + '</td>\n\
                                                    <td>' + parseFloat(vacaEsperada - vacaReal).toFixed(2) + '</td>\n\
                                                    <td>' + matriculaEsperada + '</td>\n\
                                                    <td>' + matriculaReal + '</td>\n\
                                                    <td>' + parseFloat(matriculaEsperada - matriculaReal).toFixed(2) + '</td>\n\
                                                    <td>' + marzoEsperada + '</td>\n\
                                                    <td>' + marzoReal + '</td>\n\
                                                    <td>' + parseFloat(marzoEsperada - marzoReal).toFixed(2) + '</td>\n\
                                                    <td>' + abrilEsperada + '</td>\n\
                                                    <td>' + abrilReal + '</td>\n\
                                                    <td>' + parseFloat(abrilEsperada - abrilReal).toFixed(2) + '</td>\n\
                                                    <td>' + mayoEsperada + '</td>\n\
                                                    <td>' + mayoReal + '</td>\n\
                                                    <td>' + parseFloat(mayoEsperada - mayoReal).toFixed(2) + '</td>\n\
                                                    <td>' + junioEsperada + '</td>\n\
                                                    <td>' + junioReal + '</td>\n\
                                                    <td>' + parseFloat(junioEsperada - junioReal).toFixed(2) + '</td>\n\
                                                    <td>' + julioEsperada + '</td>\n\
                                                    <td >' + julioReal + '</td>\n\
                                                    <td >' + parseFloat(julioEsperada - julioReal).toFixed(2) + '</td>\n\
                                                    <td>' + agostoEsperada + '</td>\n\
                                                    <td>' + agostoReal + '</td>\n\
                                                    <td>' + parseFloat(agostoEsperada - agostoReal).toFixed(2) + '</td>\n\
                                                    <td>' + setiembreEsperada + '</td>\n\
                                                    <td>' + setiembreReal + '</td>\n\
                                                    <td>' + parseFloat(setiembreEsperada - setiembreReal).toFixed(2) + '</td>\n\
                                                    <td>' + octubreEsperada + '</td>\n\
                                                    <td>' + octubreReal + '</td>\n\
                                                    <td>' + parseFloat(octubreEsperada - octubreReal).toFixed(2) + '</td>\n\
                                                    <td>' + noviembreEsperada + '</td>\n\
                                                    <td>' + noviembreReal + '</td>\n\
                                                    <td>' + parseFloat(noviembreEsperada - noviembreReal).toFixed(2) + '</td>\n\
                                                    <td>' + diciembreEsperada + '</td>\n\
                                                    <td>' + diciembreReal + '</td>\n\
                                                    <td>' + parseFloat(diciembreEsperada - diciembreReal).toFixed(2) + '</td>\n\
                                             </tr>'
                                    );

                        }
                        else
                        {
                            $('#tblAlumnosReporteGeneral').append('<tr>\n\
                                                    <td class="lead">' + grado + '</td>\n\
                                                    <td>' + vacaEsperada + '</td>\n\
                                                    <td>' + vacaReal + '</td>\n\
                                                    <td>' + parseFloat(vacaEsperada - vacaReal).toFixed(2) + '</td>\n\
                                                    <td>' + matriculaEsperada + '</td>\n\
                                                    <td>' + matriculaReal + '</td>\n\
                                                    <td>' + parseFloat(matriculaEsperada - matriculaReal).toFixed(2) + '</td>\n\
                                                    <td>' + marzoEsperada + '</td>\n\
                                                    <td>' + marzoReal + '</td>\n\
                                                    <td>' + parseFloat(marzoEsperada - marzoReal).toFixed(2) + '</td>\n\
                                                    <td>' + abrilEsperada + '</td>\n\
                                                    <td>' + abrilReal + '</td>\n\
                                                    <td>' + parseFloat(abrilEsperada - abrilReal).toFixed(2) + '</td>\n\
                                                    <td>' + mayoEsperada + '</td>\n\
                                                    <td>' + mayoReal + '</td>\n\
                                                    <td>' + parseFloat(mayoEsperada - mayoReal).toFixed(2) + '</td>\n\
                                                    <td>' + junioEsperada + '</td>\n\
                                                    <td>' + junioReal + '</td>\n\
                                                    <td>' + parseFloat(junioEsperada - junioReal).toFixed(2) + '</td>\n\
                                                    <td>' + julioEsperada + '</td>\n\
                                                    <td>' + julioReal + '</td>\n\
                                                    <td>' + parseFloat(julioEsperada - julioReal).toFixed(2) + '</td>\n\
                                                    <td>' + agostoEsperada + '</td>\n\
                                                    <td>' + agostoReal + '</td>\n\
                                                    <td>' + parseFloat(agostoEsperada - agostoReal).toFixed(2) + '</td>\n\
                                                    <td>' + setiembreEsperada + '</td>\n\
                                                    <td>' + setiembreReal + '</td>\n\
                                                    <td>' + parseFloat(setiembreEsperada - setiembreReal).toFixed(2) + '</td>\n\
                                                    <td>' + octubreEsperada + '</td>\n\
                                                    <td>' + octubreReal + '</td>\n\
                                                    <td>' + parseFloat(octubreEsperada - octubreReal).toFixed(2) + '</td>\n\
                                                    <td>' + noviembreEsperada + '</td>\n\
                                                    <td>' + noviembreReal + '</td>\n\
                                                    <td>' + parseFloat(noviembreEsperada - noviembreReal).toFixed(2) + '</td>\n\
                                                    <td>' + diciembreEsperada + '</td>\n\
                                                    <td>' + diciembreReal + '</td>\n\
                                                    <td>' + parseFloat(diciembreEsperada - diciembreReal).toFixed(2) + '</td>\n\
                                             </tr>'
                                    );
                            // if your table has header(th), use this
                            //$('td:nth-child(2),th:nth-child(2)').hide(); 
                        }
                    }
                }
            });
    function limparselect() {
        $('#tblAlumnosReporteGeneral tr').remove();
    }

}

function fnBuscarReporteGeneral() {
    $("#btnBuscarReporteGerencial").on("click", function(e) {
        fnObtenerReporte();
        e.preventDefault();
    });
}

function fnLimpiarReporteGeneral() {
    $("#btnLimpiarReporteGerencial").on("click", function(e) {
        $('#tblAlumnosReporteGeneral tr').remove();
        $('#cboAñoAcademico option[value=3]').attr('selected', 'selected');
        e.preventDefault();
    });
}
