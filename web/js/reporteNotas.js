$(document).ready(function() {
    fnEventoBoton();
    // fnEventoBotonGrado();
    fneventoBotonGrado();
    fnObtenerGrado();
    fnInicializar();
    fnObtenerNivelxGrado();
})

/*BK 

function fnEventoBotonGrado() {
    $('#btnBuscarReporteNotasGrado').on('click', function(e) {
        $.ajax({
            url: "reporteNotasAlumnoServletController",
            data: {
                action: "ReporteNotasAlumno",
                IdBimestre: $('#cboBimestre').val(),
                IdGrado: $('#cboGrado').val()
            }
        })
                .done(function(data) {
                    var arregloAlumno = data.split("+");
                    fnLimpiar();
                    if (data == null) {
                        $('#tblAlumnosReporteNotasGrado').append('<tr><td colspan="6">No tiene registros ...</td></tr>')
                        $('#tblAlumnosReporteNotasGradoPie tr').remove();
                    }
                    else {
                        for (var i = 0; i < arregloAlumno.length - 1; i++)
                        {
                            var nidAlumno = arregloAlumno[i].split("*")[0];
                            var nidBimestre = arregloAlumno[i].split("*")[1];
                            var nNumeroDocumento = arregloAlumno[i].split("*")[2];
                            var sNombreCompleto = arregloAlumno[i].split("*")[3];
                            var sNivel = arregloAlumno[i].split("*")[4];
                            var sGrado = arregloAlumno[i].split("*")[5];
                            $('#tblAlumnosReporteNotasGrado').append('<tr>\n\
                                                        <td>' + nidAlumno + '</td>\n\
                                                        <td>' + nidBimestre + '</td>\n\
                                                        <td><label>' + nNumeroDocumento + '</label></td>\n\
                                                        <td><label>' + sNombreCompleto + '</label></td>\n\
                                                        <td><label>' + sNivel + '</label></td>\n\
                                                        <td><label>' + sGrado + '</label></td>\n\
                                                        </tr>')
                        }
                        $('#tblAlumnosReporteNotasGradoPie').append('<tr>\n\
                                                            <td colspan="4">\n\
                                                                <a href="#" id="impresionPDF">\n\
                                                                    <button id="impresionGrado" type="submit" style="height: 30px;float: right" tabindex="8" class="classRegPagoBoton" value="1">IMPRIMIR REPORTE</button>\n\
                                                                </a>\n\
                                                            </td>\n\
                                                           </tr>')
                        $('#tblAlumnosReporteNotasGrado tr td:nth-child(1)').hide();
                        $('#tblAlumnosReporteNotasGrado tr td:nth-child(2)').hide();
                        fneventoBotonGrado();
                    }
                    function  fnLimpiar() {
                        $('#tblAlumnosReporteNotasGrado tr').remove();
                        $('#tblAlumnosReporteNotasGradoPie tr').remove();
                    }
                });
        e.preventDefault();
    });

}
*/

function fnEventoBoton() {

    $('#btnBuscarReporteNotasAlumno').on('click', function(e) {

        $.ajax({
            url: "reporteNotasAlumnoServletController",
            data: {
                action: "ReporteNotasAlumno",
                nombres: $('#txtPaciente').val(),
                IdBimestre: $('#cboBimestre').val(),
                filtro: $("#rbFiltro:checked").val(),
                IdGrado: null
            }
        })
                .done(function(data) {
                    var arregloAlumno = data.split("+");
                    fnLimpiar();
                    if (data == null) {
                        $('#tblAlumnosReporteNotas').append('<tr><td colspan="3">No tiene registros ...</td></tr>')
                    }
                    else {
                        for (var i = 0; i < arregloAlumno.length - 1; i++)
                        {
                            var nidAlumno = arregloAlumno[i].split("*")[0];
                            var nidBimestre = arregloAlumno[i].split("*")[1];
                            var nNumeroDocumento = arregloAlumno[i].split("*")[2];
                            var sNombreCompleto = arregloAlumno[i].split("*")[3];
                            var sNivel = arregloAlumno[i].split("*")[4];
                            var sGrado = arregloAlumno[i].split("*")[5];
                            var nIdNivel = arregloAlumno[i].split("*")[6];
                            $('#tblAlumnosReporteNotas').append('<tr>\n\
                                                        <td>' + nidAlumno + '</td>\n\
                                                        <td>' + nidBimestre + '</td>\n\
                                                        <td>' + nIdNivel + '</td>\n\
                                                        <td><label>' + nNumeroDocumento + '</label></td>\n\
                                                        <td><label>' + sNombreCompleto + '</label></td>\n\
                                                        <td><label>' + sNivel + '</label></td>\n\
                                                        <td><label>' + sGrado + '</label></td>\n\
                                                        <td class="text-center"><a href="#" id="impresionPDF"><button id="impresion' + nidAlumno + '" type="submit" style="height: 30px;float: right" tabindex="8" class="classRegPagoBoton" value="1">REPORTE</button></a></td>\n\
                                                        </tr>')
                        }
                        $('#tblAlumnosReporteNotas tr td:nth-child(1)').hide();
                        $('#tblAlumnosReporteNotas tr td:nth-child(2)').hide();
                        $('#tblAlumnosReporteNotas tr td:nth-child(3)').hide();
                        fneventoBoton();
                    }
                    function  fnLimpiar() {
                        $('#tblAlumnosReporteNotas tr').remove();
                    }
                });
        e.preventDefault();
    });
}

function fnReporteNotas(idAlumno, nIdBimestre, idNivel)
{
    document.location.href = 'impresionReporteServletController?IdNivel=' + idNivel + '&nIdAlumno=' + idAlumno + '&nIdBimestre=' + nIdBimestre;
}

function fneventoBoton()
{
    $('#tblAlumnosReporteNotas tr').each(function(i) {
        $('#impresion' + $('#tblAlumnosReporteNotas tr td:nth-child(1)').eq(i).text()).click(function() {
            fnReporteNotas($('#tblAlumnosReporteNotas tr td:nth-child(2)').eq(i).text(), $('#tblAlumnosReporteNotas tr td:nth-child(1)').eq(i).text(), $('#tblAlumnosReporteNotas tr td:nth-child(3)').eq(i).text());
        });
    });
}

function fneventoBotonGrado()
{
    $('#impresionGrado').click(function() {
        console.log('$(#cboBimestre).val()  ' + $('#cboBimestre').val());
        console.log('$(#cboBimestre option:selected).text() : ' + $('#cboBimestre option:selected').text());        
        console.log('$(#cboGrado).val()  ' + $('#cboGrado').val());
        console.log('$(#spNivel).text()  ' + $('#spNivel').text());
        fnReporteNotasGrado($('#cboBimestre').val(), $('#cboGrado').val(), $('#spNivel').text(), $('#cboBimestre option:selected').text(), $('#cboGrado option:selected').text());
    });
}

function fnReporteNotasGrado(nIdBimestre, nIdGrado, idNivel, sBimestre, sGrado)
{
    document.location.href = 'impresionReporteServletController?action=reporteGrado&IdNivel=' + idNivel + '&IdGrado=' + nIdGrado + '&IdBimestre=' + nIdBimestre + '&sBimestre=' + sBimestre + '&sGrado=' + sGrado;
}

function fnObtenerGrado() {
    $.ajax({
        url: 'reporteNotasAlumnoServletController',
        data: {
            action: 'obtenerGrado'
        }
    })

            .done(function(data) {

                pegadados = data.split("+");
                limparselect();
                if (data == '')
                    $('#cboGrado').append('<option>Grado no encontrado</option>');
                else {
                    for (var i = 0; i < pegadados.length - 1; i++) {
                        var codigoGrado = pegadados[i].split("*")[0];
                        var descripcionGrado = pegadados[i].split("*")[1];
                        $('#cboGrado').append('<option value ="' + codigoGrado.trim() + '">' + descripcionGrado + '</option>');
                    }
                }
            });

    function limparselect() {
        $('#cboGrado option').remove();
    }
}

function fnInicializar()
{
    $('#hgReporteAlumno').hide();
    $('#hgReporteGrado').hide();
    $('input[type="radio"][value="2"]').click(function() {
        if ($(this).is(":checked"))
        {
            $('#hgReporteAlumno').show();
            $('#hgReporteGrado').hide();
            fnLimpiarControles(2);
        }
        else
        {
            $('#hgReporteAlumno').hide();
        }
    })

    $('input[type="radio"][value="1"]').click(function() {
        if ($(this).is(":checked"))
        {
            $('#hgReporteAlumno').hide();
            $('#hgReporteGrado').show();
            fnLimpiarControles(1);
        }
        else
        {
            $('#hgReporteGrado').hide();
        }
    });
}

function fnLimpiarControles(filtro)
{
    if (filtro == 1)
    {
        $('#txtPaciente').val("");
        $('#tblAlumnosReporteNotas tr').remove();

    }
    if (filtro == 2)
    {
        $('#tblAlumnosReporteNotasGrado tr').remove();
        $('#tblAlumnosReporteNotasGradoPie tr').remove();
    }
}

function fnObtenerNivelxGrado()
{
    $('#cboGrado').on('click', function() {

        $.ajax({
            url: 'reporteNotasAlumnoServletController',
            data: {
                action: 'obtenerNivelxGrado',
                idGrado: $(this).val()
            }
        })

                .done(function(data) {

                    pegadados = data.split("+");
                    limparselect();
                    if (data == '')
                        $('#spNivel').text('');
                    else {
                        for (var i = 0; i < pegadados.length - 1; i++) {
                            var codigoNivel = pegadados[i].split("*")[0];
                            var descripcionNivel = pegadados[i].split("*")[1];
                            $('#spNivel').text(codigoNivel);
                        }
                    }
                    function limparselect() {
                        $('#spNivel').text('');
                    }
                });

    })
}


