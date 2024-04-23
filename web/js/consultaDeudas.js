$(document).ready(function() {

    fnGetDateActual();

    $("#btnBuscarDeudasAlumno").on("click", function(e) {
        buscarAlumnoDeuda();
        e.preventDefault();
    })

    $("#btnExportarBuscarDeudasAlumno").click(function(e) {
        window.open('data:application/vnd.ms-excel,' + escape(($('#divTablaConsultaDeuda').html())));        // se coloca el metodo escape para evitar la codifcacion utf-8, la cual nos cambia la letra ñ
        e.preventDefault();
    });

    fnLimpiarDeudasAlumno();
});

function buscarAlumnoDeuda() {

    $.ajax({
        url: "consultaDeudaServletController",
        data: {
            action: "consultaAlumnoDeuda",
            cboGrado: $('#cboGrado option:selected').val(),
            cboNivel: $('#cboNivel option:selected').val(),
            anioAcademico: $('#cboAñoAcademico option:selected').text().trim()
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                limparselect();
                if (data == '') {
                    $('#tblAlumnosDeudas').append('<tr><td colspan = "14"><label> No se encontraron datos ... </label></td></tr>');
                }
                else {
                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {
                        
                        var nombres = arregloAlumnos[i].split("-")[0];
                        var matricula = arregloAlumnos[i].split("-")[1];
                        var marzo = arregloAlumnos[i].split("-")[2];
                        var abril = arregloAlumnos[i].split("-")[3];
                        var mayo = arregloAlumnos[i].split("-")[4];
                        var junio = arregloAlumnos[i].split("-")[5];
                        var julio = arregloAlumnos[i].split("-")[6];
                        var agosto = arregloAlumnos[i].split("-")[7];
                        var setiembre = arregloAlumnos[i].split("-")[8];
                        var octubre = arregloAlumnos[i].split("-")[9];
                        var noviembre = arregloAlumnos[i].split("-")[10];
                        var diciembre = arregloAlumnos[i].split("-")[11];
                        var vacacional = arregloAlumnos[i].split("-")[12];
                        $('#tblAlumnosDeudas').append('<tr>\n\
                                                <td>' + (i + 1) + '</td>\n\
                                                <td>' + nombres + '</td>\n\\n\
                                                <td>' + vacacional + '</td>\n\
                                                <td>' + matricula + '</td>\n\
                                                <td>' + marzo + '</td>\n\
                                                <td>' + abril + '</td>\n\
                                                <td>' + mayo + '</td>\n\
                                                <td>' + junio + '</td>\n\
                                                <td>' + julio + '</td>\n\
                                                <td>' + agosto + '</td>\n\
                                                <td>' + setiembre + '</td>\n\
                                                <td>' + octubre + '</td>\n\
                                                <td>' + noviembre + '</td>\n\
                                                <td>' + diciembre + '</td>\n\
                                             </tr>'
                                );
                        // if your table has header(th), use this
                        //$('td:nth-child(2),th:nth-child(2)').hide(); 
                    }
                }
                //        resultadosClickHandler();
                //        resultadosClickApoderadoHandler();        
            });
    function limparselect() {
        $('#tblAlumnosDeudas tr').remove();
    }
}



function fnLimpiarDeudasAlumno() {
    $("#btnLimpiarDeudasAlumno").on("click", function(e) {
        $("#tblAlumnosDeudas tr").remove();
        $("#frmConsultaDeudas")[0].reset();
        e.preventDefault();
    });
}
