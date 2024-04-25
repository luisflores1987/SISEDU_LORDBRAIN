$(document).ready(function() {
    fnCargarNivel();
    fnCargarNivelConsultaDeuda();
    fnClickObtenerGradoPorNivel();
    fnClickObtenerGradoPorNivelConsultaDeuda();
    fnGetDateActual();
});

function fnCargarNivel() {
    $.ajax({
        url: "registroPersonaServletController",
        data: {
            action: "obtenerNivel"
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                limparselect();
                if (data == '') {
                    $('#cboNivel').append('<option value = 0></option>');
                    $('#cboNivelPagos').append('<option value = 0></option>');
                }
                else {
                    $('#cboNivel').append('<option value = 0></option> ');
                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {
                        var idNivel = arregloAlumnos[i].split("-")[0];
                        var Descripcion = arregloAlumnos[i].split("-")[1];
                        $('#cboNivel').append('<option value = ' + idNivel.trim() + '>' + Descripcion + '</option> ');
                        $('#cboNivelPagos').append('<option value = ' + idNivel.trim() + '>' + Descripcion + '</option> ');
                    }
                }
            });
    function limparselect() {
        $('#cboNivel option').remove();
        $('#cboNivelPagos option').remove();
    }
}

function fnObtenerGradoPorNivel(nIdNivel) {
    $.ajax({
        type: 'GET',
        url: 'registroPersonaServletController',
        data: {
            action: "obtenerGradoPorNivel",
            idNivel: nIdNivel.trim()
        },
        statusCode: {
            404: function() {
                console.log('Pagina no encontrada');
            },
            500: function() {
                console.log('Error de servidor');
            }
        }
    })
            .done(function(data, status, jqXhr) {

                pegadados = data.split(":");
                limparselect();
                if (data == '')
                    $('#cboGrado').append('<option value = 0></option>');
                else {
                    $('#cboGrado').append('<option value = 0></option> ');
                    for (var i = 0; i < pegadados.length - 1; i++) {
                        var codigoGrado = pegadados[i].split("-")[0];
                        var descripcionGrado = pegadados[i].split("-")[1];
                        $('#cboGrado').append('<option value ="' + codigoGrado.trim() + '">' + descripcionGrado + '</option>');
                    }
                }
            });

    function limparselect() {
        $('#cboGrado option').remove();
    }
}

function fnClickObtenerGradoPorNivel() {
    $("#cboNivel").on('change', function() {
        fnObtenerGradoPorNivel($(this).val());
    });
}

function fnGetDateActual()
{

    $.ajax({
        url: 'consultaDeudaServletController',
        data: {
            action: 'fecha'
        }
    })
            .done(function(data) {
                if (data == '')
                    $('#spFechaActual').text('');
                else {

                    var fecha = data;
                    $('#spFechaActual').text('FECHA :' + fecha);
                }
            });
}

//para la pantalla de conulta de deuda
function fnCargarNivelConsultaDeuda() {
    $.ajax({
        url: "registroPersonaServletController",
        data: {
            action: "obtenerNivel"
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                limparselect();
                if (data == '') {
                    $('#cboNivelConsultaDeuda').append('<option value = 0></option>');
                }
                else {
                    $('#cboNivelConsultaDeuda').append('<option value = 0></option> ');
                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {
                        var idNivel = arregloAlumnos[i].split("-")[0];
                        var Descripcion = arregloAlumnos[i].split("-")[1];
                        $('#cboNivelConsultaDeuda').append('<option value = ' + idNivel.trim() + '>' + Descripcion + '</option> ');
                    }
                }
            });
    function limparselect() {
        $('#cboNivelConsultaDeuda option').remove();
    }
}

function fnClickObtenerGradoPorNivelConsultaDeuda() {
    $("#cboNivelConsultaDeuda").on('change', function() {
        fnObtenerGradoPorNivel($(this).val());
    });
}

