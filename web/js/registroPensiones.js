$(document).ready(function() {

    fnCargarAnioAcademico();
    fnCancelarNivel();
    fnIngresarNivel();
    habilitarGrado(0);

});

function fnCargarNiveles()
{

    $.ajax({
        url: "registroPensionesServletController",
        data: {
            action: "obtenerNivel",
            anioAcademico: $('#cboAñoAcademico option:selected').text().trim()
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                limparselect();
                if (data == '') {
                    $('#divNiveles').append('No se encontraron datos ...');
                }
                else {
                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {
                        var idNivel = arregloAlumnos[i].split("-")[0];
                        var Descripcion = arregloAlumnos[i].split("-")[1];
                        var Pension = arregloAlumnos[i].split("-")[2];
                        $('#divNiveles').append(
                                '<div class="form-group">\n\
                                                <div class="control-label col-sm-4">\n\
                                                    <label>' + Descripcion + '</label>\n\
                                                </div>\n\
                                                <div class="col-sm-5 form-inline">\n\
                                                    <input class="form-control" type="text" value="' + Pension + '" id="txt' + Descripcion + '"/>\n\
                                                    <button class="" type="button" id="btn' + Descripcion + '">Mas detalle</button>\n\
                                                    <span class="hide" id = "lbl' + idNivel + '">' + idNivel + '</span>\n\
                                                </div>\n\
                                                <div class="col-sm-3 radio-inline">\n\
                                                    <input type="radio" name = pension id="rd' + Descripcion + '" value="' + Descripcion + '"/>\n\
                                                </div>\n\
                                            </div>\n\
                                            <div class="form-group  form-inline" id="div' + Descripcion + '">\n\
                                                <div class="col-sm-offset-4 col-sm-8">\n\
                                                    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#pensionGrado" id="btnGrado' + Descripcion + '">GRADO</button>\n\
                                                    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#pensionAlumno" id="btnAlumno' + Descripcion + '">ALUMNO</button>\n\
                                                </div>\n\
                                             </div>\n\
                                  </div>'
                                );
                        $('#div' + Descripcion).hide();
                        $('#btn' + Descripcion).hide();

                    }

                    resultadosClickHandlerConsultaAlumno($("input:radio[name=pension]").val());
                    clickNivel();

                }

                $('#divNiveles input').keypress(function(e) {
                    var verified = (e.which == 8 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9.]/);
                    if (verified) {
                        e.preventDefault();
                    }
                });

            });
    function limparselect() {
        $('#divNiveles').find("*").remove();
    }
}

function clickNivel() { // evento click para el radio butoon
    $("#divNiveles input[name='pension']:radio").click(function() {
        var nIdNivel
        if ($(this).is(':checked')) {

            if ($(this).val().trim() == "INICIAL") {
                nIdNivel = 1;
            }
            else if ($(this).val().trim() == "PRIMARIA") {
                nIdNivel = 2;
            }
            else if ($(this).val().trim() == "SECUNDARIA") {
                nIdNivel = 3;
            } else {
                nIdNivel = 0;
            }

            habilitarGrado(nIdNivel);

            $("#btnGrado" + $(this).val().trim()).click(function(e) {
                fnObtenerGrado($(this).val().trim()); //obtiene las pensiones por grado a ingresar
                e.preventDefault();
            });

            $("#btnBuscar" + $(this).val().trim()).on("click", function(e) {
                fnObtenerAlumno($(this).val().trim(), nIdNivel);
                e.preventDefault();
            })

        }
        $('#btnNivel').css("display", "none");
    });
}


function fnObtenerGrado(Descripcion) {

    $.ajax({
        url: 'registroPensionesServletController',
        data: {
            action: "rowclick",
            descripcionNivel: Descripcion.trim(),
            anioAcademico: $('#cboAñoAcademico option:selected').text().trim()
        }
    })
            .done(function(data, status, jqXhr) {
                pegadados = data.split(":");
                limparselect();
                if (data == '')
                    $('#divGrado').append('Grado no encontrado');
                else {
                    for (var i = 0; i < pegadados.length - 1; i++) {
                        var codigoGrado = pegadados[i].split("-")[0];
                        var descripcionGrado = pegadados[i].split("-")[1];
                        var pension = pegadados[i].split("-")[2];
                        $('#divGrado').append('\n\
                                         <div class="form-group">\n\
                                            <label class="control-label col-sm-2">' + descripcionGrado + '</label>\n\
                                            <div class="col-sm-10 form-inline">\n\
                                                <input class="form-control" type="text" value="' + pension + '" id="txt' + codigoGrado + '"/>\n\
                                            </div>\n\
                                        </div>\n\
                                        <button class="hide btn btn-default" type="button" id="btn' + codigoGrado + '">Ingresar</button>\n\
                                        <span class="hide" id = "lbl' + codigoGrado + '">' + codigoGrado + '</span>\n\
                                         ');
                    }
                }

                $('#divGrado input').keypress(function(e) {
                    var verified = (e.which == 8 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9.]/);
                    if (verified) {
                        e.preventDefault();
                    }
                });

            });

    function limparselect() {
        $('#divGrado').find("*").remove();
    }
//})
}

function fnObtenerAlumno(Descripcion, idNivel) {
    $.ajax({
        type: 'GET',
        url: "registroPensionesServletController",
        data: {
            action: "consultaDatos",
            txtPaciente: $("#txtNombres").val(),
            nIdNivel: idNivel,
            anioAcademico: $('#cboAñoAcademico option:selected').text().trim()
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                limparselect();
                if (data == '') {
                    $('#tblAlumnoPension').append('<tr><td colspan = "4"><label> No se encontraron datos ... </label></td></tr>');
                }
                else {
                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {
                        var idPersona = arregloAlumnos[i].split("-")[0];
                        var numeroDocumento = arregloAlumnos[i].split("-")[1];
                        var apellidoPaterno = arregloAlumnos[i].split("-")[2];
                        var apellidoMaterno = arregloAlumnos[i].split("-")[3];
                        var nombres = arregloAlumnos[i].split("-")[4];
                        var nombreCompleto = apellidoPaterno + " " + apellidoMaterno + " " + nombres;
                        var pension = arregloAlumnos[i].split("-")[5];
                        $('#tblAlumnoPension').append('<tr>\n\
                                                     <td>' + numeroDocumento + '</td>\n\
                                                     <td>' + nombreCompleto + '</td>\n\
                                                     <td><input class="form-control" type="text" value="' + pension + '" id="txtAlumno' + idPersona + '"/></td>\n\
                                                     <td>' + idPersona + '</td>\n\
                                                     <td><button class="btn btn-default form-inline" type="button" id="btnPersona' + idPersona + '">\n\
                                                            <img title="Exportar Excel" src="../images/icon_excel.png" width="12" height="12"/>Guardar\n\
                                                          </button>\n\
                                                          <button class="btn btn-default form-inline" type="button" data-toggle="modal" data-target="#pensionMesAlumno" id="btnDetallePersona' + idPersona + '">\n\
                                                            <img title="Exportar Excel" src="../images/icon_excel.png" width="12" height="12"/>Mes\n\
                                                        </button></td>\n\
                                                     <td><span id = "lbl' + idPersona + '">' + idPersona + '</span></td>\n\
                                               </tr>');
                        $('#tblAlumnoPension tr td:nth-child(4)').hide();
                        $('#tblAlumnoPension tr td:nth-child(6)').hide();
                        fnPensionAlumno(idPersona);
                    }
                    fnBuscarAlumnoDetalle();
                }
                $('#tblAlumnoPension tr td:nth-child(3) input').keypress(function(e) {
                    var verified = (e.which == 8 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9.]/);
                    if (verified) {
                        e.preventDefault();
                    }
                });
            });
    function limparselect() {
        $('#tblAlumnoPension tr').remove();
    }
}

function fnBuscarAlumnoDetalle() {
    $('#tblAlumnoPension tr').each(function(i) {
        var idPersona = $("#tblAlumnoPension tr td:nth-child(6)").eq(i).text().trim();
        $('#btnDetallePersona' + idPersona).click(function() {
            resultadosClickHandlerConsultaAlumnosGrado(idPersona);
        });
    });
}

function buscarPago(nIdPersona) {

    $.ajax({
        type: 'GET',
        url: "registroPensionesServletController",
        data: {
            action: "buscarPensionMes",
            idPersona: nIdPersona,
            anioAcademico: $('#cboAñoAcademico option:selected').text().trim()
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                limparselect();
                if (data == '') {
                    $('#tblPagosMes').append('<tr><td colspan = "3"><label> No se encontraron datos ... </label></td></tr>');
                }
                else {

                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {

                        var mes = arregloAlumnos[i].split("-")[0];
                        var monto = arregloAlumnos[i].split("-")[1];
                        var nIdAlumnoDeuda = arregloAlumnos[i].split("-")[2];
                        if (monto == null) {
                        } else {
                            $('#tblPagosMes').append('<tr>\n\
                                            <td><label>' + mes + '</label></td>\n\
                                            <td><input class="form-control" type="text" id="txt' + mes + '" value="' + monto + '"/></td>\n\
                                            <td><button class="btn btn-default" type="button" id="btnMes' + nIdAlumnoDeuda + '">\n\
                                                <img title="Exportar Excel" src="../images/icon_excel.png" width="12" height="12"/>\n\
                                            </button></td>\n\
                                            <td><span id = "lblMes' + nIdAlumnoDeuda + '">' + nIdAlumnoDeuda + '</span></td>\n\
                                         </tr>');

                            $('#tblPagosMes tr td:nth-child(4)').hide();
                            $('#spanIdAlumno').text(nIdPersona);
                        }
                    }
                    fnPensionAlumnoDetalle();
                }

                $('#tblPagosMes tr td input').keypress(function(e) {
                    var verified = (e.which == 8 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9.]/);
                    if (verified) {
                        e.preventDefault();
                    }
                });

            });

    function limparselect() {
        $('#tblPagosMes tr').remove();
    }
}

function ingresarPension(iNivel, iGrado, iAlumno, iPension, iPersonaDeuda) {

    $.ajax({
        url: "registroPensionesServletController",
        data: {
            action: "ingresarDatos", IDNIVEL: iNivel, IDGRADO: iGrado,
            IDPERSONA: iAlumno, PENSION: parseFloat(iPension).toFixed(2), // guardar float con dos decimales.
            IDPERSONADEUDA: iPersonaDeuda,
            anioAcademico: $('#cboAñoAcademico option:selected').text().trim()
        }
    })
            .done(function(data, status, jqXhr) {
                var descResultado = data;
                if (iNivel == 0 && iGrado == 0 && iPersonaDeuda == 0) {
                    jAlertPension(descResultado);
                } else if(iNivel ==0 && iGrado == 0 && iAlumno ==0) {
                    jAlertPensionMesAlumno(descResultado);
                }
                else{
                    jAlert(descResultado);
                }
            });
}

function fnCargarAnioAcademico() {

    $.ajax({
        type: "GET",
        url: "registroMatriculaServletController",
        data: {
            action: "cargarAnioAcademico"
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAnioAcademico = data.split(";");
                limpiarSelectAnioAcademico();
                var idCombo = 0;
                if (data == "") {
                    $("#cboAñoAcademico option").append("<option><label> No se encontraron datos ...</label></option>");
                } else {
                    for (var i = 0; i < arregloAnioAcademico.length - 1; i++) {
                        var idAnio = arregloAnioAcademico[i].split(",")[0];
                        var sDescripcionAnio = arregloAnioAcademico[i].split(",")[1];
                        $("#cboAñoAcademico").append("<option value=" + idAnio + "><strong>" + sDescripcionAnio + "</strong></option>");
                        idCombo = idAnio;
                    }
                }
                fnColocarSeleccion(idCombo);
                fnEventoAnioAcademico();

            });
    function limpiarSelectAnioAcademico() {
        $("#cboAñoAcademico option").remove();
    }

    function fnColocarSeleccion(idCombo) {
        $("#cboAñoAcademico [value=" + idCombo + "]").prop("selected", true);
        fnCargarNiveles();
    }
}

function fnPensionAlumno(nIdPersona) {
    $('#btnPersona' + nIdPersona).on("click", function() {
        ingresarPension(0, 0, $('#lbl' + nIdPersona).text(), $('#txtAlumno' + nIdPersona).val(), 0);
    });
}

function fnPensionAlumnoDetalle() {

    $('#tblPagosMes tr').each(function(i) {

        var nIdPersonaDeuda = $('#tblPagosMes tr td:nth-child(4)').eq(i).text();

        $('#btnMes' + nIdPersonaDeuda).on("click", function() {
            ingresarPension(
                    0,
                    0,
                    0,
                    $('#tblPagosMes tr td:nth-child(2) input').eq(i).val(),
                    nIdPersonaDeuda
                    );
        });

    });
}

function resultadosClickHandlerConsultaAlumnosGrado(idPersona) {
    buscarPago(idPersona);
}


function resultadosClickHandlerConsultaAlumno(Descripcion) {
    
    $('#btnAlumno' + Descripcion).on("click", function() {
        $("#tblAlumnoPension tr").remove();
        $("#txtNombres").val("");
    })
}

function validar() {
    validado = true;
    $(".classRegPago:not(.opcional)").each(function() {
        if ($(this).val().length < 1) {
            alert("El campo " + $(this).attr("name") + " es requerido");
            validado = false;
            return false;
        }
    });
}

function habilitarGrado(nParametro) {

    //deshabilitar boton Ingresar
    switch (nParametro) {
        case 1:
            $('#divINICIAL').fadeIn(500);
            $('#divPRIMARIA').hide(500);
            $('#divSECUNDARIA').hide(500);
            $("#btnBuscarINICIAL").show();
            $("#btnBuscarPRIMARIA").hide();
            $("#btnBuscarSECUNDARIA").hide();
            break;
        case 2:
            $('#divINICIAL').hide(500);
            $('#divPRIMARIA').fadeIn(500);
            $('#divSECUNDARIA').hide(500);
            $("#btnBuscarINICIAL").hide();
            $("#btnBuscarPRIMARIA").show();
            $("#btnBuscarSECUNDARIA").hide();
            break;
        case 3:
            $('#divINICIAL').hide(500);
            $('#divPRIMARIA').hide(500);
            $('#divSECUNDARIA').fadeIn(500);
            $("#btnBuscarINICIAL").hide();
            $("#btnBuscarPRIMARIA").hide();
            $("#btnBuscarSECUNDARIA").show();
            break;
        default :
            $("#btnBuscarINICIAL").hide();
            $("#btnBuscarPRIMARIA").hide();
            $("#btnBuscarSECUNDARIA").hide();
    }
}

function fnCancelarNivel() {
    $('#btnNivelCancelar').on("click", function() {
        $("#divNiveles input[name='pension']:radio").removeAttr("checked");
        fnCargarNiveles();
        $("#btnNivel").show();
    })

}

function fnIngresarNivel() {
    $('#btnNivel').on("click", function(t) {
        $('#divNiveles input[type=text]').each(function(e) {

            ingresarPension(
                    $('#divNiveles span').eq(e).text().trim(),
                    0,
                    0,
                    $('#divNiveles input[type=text]').eq(e).val().trim(),
                    0
                    );
        })
        $("#divNiveles input[name='pension']:radio").removeAttr("checked");
        fnCargarNiveles();
        t.preventDefault();
    })

    $('#btnGrado').on("click", function(t) {
        $('#divGrado input').each(function(e) {
            ingresarPension(
                    0,
                    $('#divGrado ').eq(e).text(),
                    0,
                    $('#divGrado input').eq(e).val(),
                    0
                    );
        })
        if ($("#divNiveles input[name='pension']:radio").is(":checked")) {
            fnObtenerGrado($(this).val().trim());
        }
        t.preventDefault();
    })
}

function fnEventoAnioAcademico() {
    $('#cboAñoAcademico').change(function() {
        fnCargarNiveles();
        $("#divNiveles").show();
    });
}

function fnRecargarMesPago(nIdPersona) {
    $.ajax({
        url: "registroPensionesServletController",
        data: {
            action: "buscarPensionMes",
            idPersona: nIdPersona,
            anioAcademico: $('#cboAñoAcademico option:selected').text().trim()
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                limparselect();
                if (data == '') {
                    $('#tblPagosMes').append('<tr><td colspan = "3"><label> No se encontraron datos ... </label></td></tr>');
                }
                else {

                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {

                        var mes = arregloAlumnos[i].split("-")[0];
                        var monto = arregloAlumnos[i].split("-")[1];
                        var nIdAlumnoDeuda = arregloAlumnos[i].split("-")[2];
                        if (monto == null) {
                        } else {
                            $('#tblPagosMes').append('<tr>\n\
                                            <td><label>' + mes + '</label></td>\n\
                                            <td><input class="form-control" type="text" id="txt' + mes + '" value="' + monto + '"/></td>\n\
                                            <td><button class="btn btn-default" type="button" id="btnMes' + nIdAlumnoDeuda + '">\n\
                                                <img title="Exportar Excel" src="../images/icon_excel.png" width="12" height="12"/>\n\
                                            </button></td>\n\
                                            <td><span id = "lblMes' + nIdAlumnoDeuda + '">' + nIdAlumnoDeuda + '</span></td>\n\
                                         </tr>');

                            $('#tblPagosMes tr td:nth-child(4)').hide();

                        }
                    }
                }

                $('#tblPagosMes tr td input').keypress(function(e) {
                    var verified = (e.which == 8 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9.]/);
                    if (verified) {
                        e.preventDefault();
                    }
                });

            });

    function limparselect() {
        $('#tblPagosMes tr').remove();
    }
}

