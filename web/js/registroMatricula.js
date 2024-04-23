$(document).ready(function() {

    fnCargarAnioAcademicoMatricula();
    habilitarGradoMatricula(0);
    fnIngresarMatriculaNivel();
    fnCancelarNivelMatricula();
});

function fnCargarNivelesMatricula()
{
    $.ajax({
        url: "registroMatriculaServletController",
        data: {
            action: "obtenerNivel",
            anioAcademico: $('#cboAñoAcademico option:selected').text().trim()
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                limparselect();
                if (data == '') {
                    $('#divMatriculaNiveles').append('No se encontraron datos ... ');
                }
                else {
                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {

                        var idNivel = arregloAlumnos[i].split("-")[0];
                        var Descripcion = arregloAlumnos[i].split("-")[1];
                        var Matricula = arregloAlumnos[i].split("-")[2];
                        $('#divMatriculaNiveles').append(
                                '<div class="form-group">\n\
                                                <div class="control-label col-sm-4">\n\
                                                    <label>' + Descripcion + '</label>\n\
                                                </div>\n\
                                                <div class="col-sm-5 form-inline">\n\
                                                    <input class="form-control" type="text" value="' + Matricula + '" id="txtMatricula' + Descripcion + '"/>\n\
                                                    <button class="" type="button" id="btnMatricula' + Descripcion + '">Mas detalle</button>\n\
                                                    <span class="hide" id = "lblMatricula' + idNivel + '">' + idNivel + '</span>\n\
                                                </div>\n\
                                                <div class="col-sm-3 radio-inline">\n\
                                                    <input type="radio" name = "matricula" id="rdMatricula' + Descripcion + '" value="' + Descripcion + '"/>\n\
                                                </div>\n\
                                            </div>\n\
                                            <div class="form-group  form-inline" id="divMatricula' + Descripcion + '">\n\
                                                <div class="col-sm-offset-4 col-sm-8">\n\
                                                    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#pensionGradoMatricula" id="btnMatriculaGrado' + Descripcion + '">GRADO</button>\n\
                                                    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#pensionAlumnoMatricula" id="btnMatriculaAlumno' + Descripcion + '">ALUMNO</button>\n\
                                                </div>\n\
                                             </div>\n\
                                  </div>'
                                );
                        $('#spanCodigo').text(idNivel);
                        $('#divMatricula' + Descripcion).hide();
                        $('#btnMatricula' + Descripcion).hide();
                    }

                    resultadosClickHandlerConsultaAlumnoMatricula($("input:radio[name=matricula]").val());
                    clickMatriculaNivel();
                }

                $('#divMatriculaNiveles input').keypress(function(e) {
                    var verified = (e.which == 8 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9.]/);
                    if (verified) {
                        e.preventDefault();
                    }
                });

            });
    function limparselect() {
        $('#divMatriculaNiveles').find('*').remove();
    }
}

function clickMatriculaNivel() {
    $("#divMatriculaNiveles input[name='matricula']:radio").click(function() {
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

            habilitarGradoMatricula(nIdNivel);

            $("#btnMatriculaGrado" + $(this).val().trim()).click(function(e) {
                fnObtenerGradoMatricula($("#divMatriculaNiveles input:radio[name='matricula']:checked").val()); //obtiene las pensiones por grado a ingresar
                $('#spanDescripcion').text($("#divMatriculaNiveles input:radio[name='matricula']:checked").val().trim());
                e.preventDefault();
            });

            $("#btnMatriculaBuscar" + $(this).val().trim()).on("click", function(e) {
                fnObtenerAlumnoMatricula(nIdNivel);
                e.preventDefault();
            })

        }
        $('#btnMatriculaNivel').css("display", "none");
    });

}

function fnObtenerGradoMatricula(Descripcion) {
//$("#tblNiveles tr").each(function(i){  
    $.ajax({
        url: 'registroMatriculaServletController',
        data: {
            action: "obtenerGradoPorNivel",
            descripcionNivel: Descripcion.trim(),
            anioAcademico: $('#cboAñoAcademico option:selected').text().trim()
        }
    })

            .done(function(data, status, jqXhr) {
                pegadados = data.split(":");
                limparselect();
                if (data == '')
                    $('#divMatriculaGrado').append('Grado no encontrado');
                else {
                    for (var i = 0; i < pegadados.length - 1; i++) {
                        var codigoGrado = pegadados[i].split("-")[0];
                        var descripcionGrado = pegadados[i].split("-")[1];
                        var matricula = pegadados[i].split("-")[2];

                        $('#divMatriculaGrado').append('\n\
                                         <div class="form-group">\n\
                                            <label class="control-label col-sm-2">' + descripcionGrado + '</label>\n\
                                            <div class="col-sm-10 form-inline">\n\
                                                <input class="form-control" type="text" value="' + matricula + '" id="txtMatricula' + codigoGrado + '"/>\n\
                                            </div>\n\
                                        </div>\n\
                                        <button class="hide btn btn-default" type="button" id="btnMatricula' + codigoGrado + '">Ingresar</button>\n\
                                        <span class="hide" id = "lblMatricula' + codigoGrado + '">' + codigoGrado + '</span>\n\
                                         ');

                    }


                }

                $('#divMatriculaGrado input').keypress(function(e) {
                    var verified = (e.which == 8 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9.]/);
                    if (verified) {
                        e.preventDefault();
                    }
                });
            });

    function limparselect() {
        $('#divMatriculaGrado').find("*").remove();
    }
}

function fnObtenerAlumnoMatricula(idNivel) {
    $.ajax({
        type: 'GET',
        url: "registroMatriculaServletController",
        data: {
            action: "consultaDatos",
            txtPaciente: $("#txtMatriculaNombres").val(),
            nIdNivel: idNivel,
            anioAcademico: $('#cboAñoAcademico option:selected').text().trim()
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                limparselect();
                if (data == '') {
                    $('#tblMatriculaAlumnoPension').append('<tr><td class="text-left" colspan = "4"><label> No se encontraron datos ... </label></td></tr>');
                }
                else {
                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {
                        var idPersona = arregloAlumnos[i].split("-")[0];
                        var numeroDocumento = arregloAlumnos[i].split("-")[1];
                        var apellidoPaterno = arregloAlumnos[i].split("-")[2];
                        var apellidoMaterno = arregloAlumnos[i].split("-")[3];
                        var nombres = arregloAlumnos[i].split("-")[4];
                        var nombreCompleto = apellidoPaterno + " " + apellidoMaterno + " " + nombres;
                        var matricula = arregloAlumnos[i].split("-")[5];
                        $('#tblMatriculaAlumnoPension').append('<tr>\n\
                                                     <td>' + numeroDocumento + '</td>\n\
                                                     <td>' + nombreCompleto + '</td>\n\
                                                     <td><input class="form-control" type="text" value="' + matricula + '" id="txtMatriculaAlumno' + idPersona + '"/></td>\n\
                                                     <td>' + idPersona + '</td>\n\
                                                     <td><button class="btn btn-default form-inline" type="button" id="btnMatriculaPersona' + idPersona + '">\n\
                                                            <img title="Exportar Excel" src="../images/icon_excel.png" width="12" height="12"/>Guardar\n\
                                                          </button>\n\
                                                     <td><span id = "lblMatricula' + idPersona + '">' + idPersona + '</span></td>\n\
                                               </tr>');
                        $('#tblMatriculaAlumnoPension tr td:nth-child(4)').hide();
                        $('#tblMatriculaAlumnoPension tr td:nth-child(6)').hide();

                        fnPensionAlumnoMatricula(idPersona);
                    }
                }
                $('#tblAlumnoPension tr td:nth-child(3) input').keypress(function(e) {
                    var verified = (e.which == 8 || e.which == undefined || e.which == 0) ? null : String.fromCharCode(e.which).match(/[^0-9.]/);
                    if (verified) {
                        e.preventDefault();
                    }
                });

            });
    function limparselect() {
        $('#tblMatriculaAlumnoPension tr').remove();
    }
}

function resultadosClickHandlerConsultaAlumnosGrado(idPersona) {
    dlgAlumnoGradopension.dialog("open");
    buscarPago(idPersona);
}


function resultadosClickHandlerConsulta(Descripcion) {
    $('#btnMatriculaGrado' + Descripcion).on("click", function() {
        fnObtenerGradoMatricula(Descripcion.trim());
        dlgGradopension.dialog("open");
    })
}

function resultadosClickHandlerConsultaAlumnoMatricula(Descripcion) {

    $('#btnMatriculaAlumno' + Descripcion).on("click", function() {
        $('#tblMatriculaAlumnoPension tr').remove();
        $('#txtMatriculaNombres').val("");
    })
}





function fnDlbClick() {
    $('#tblAlumnoPension tr td').dblclick(function() {
        var idPersona = $(this).parent().children().eq(5).text();
        resultadosClickHandlerConsultaAlumnosGrado(idPersona)
        //        }
    });
}

function buscarPago(numeroDocumento) {
    $.ajax({
        type: 'GET',
        url: "registroPensionesServletController",
        data: {
            action: "buscarPensionMes",
            idPersona: numeroDocumento,
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

                        if (monto == null)
                        {
                        } else {
                            $('#tblPagosMes').append('<tr>\n\
                                            <td class="text-left"><label>' + mes + '</label></td>\n\
                                            <td><input type="text" id="txt' + mes + '" value="' + monto + '"style="text-align: center;width:70px;"/></td>\n\
                                            <td><button type="button" id="btnMes' + nIdAlumnoDeuda + '" style="height:24px;width:60px;">√</button></td>\n\
                                            <td><span id = "lblMes' + nIdAlumnoDeuda + '">' + nIdAlumnoDeuda + '</span></td>\n\
                                         </tr>');

                            $('#tblPagosMes tr td:nth-child(4)').hide();
                            fnPensionAlumnoDetalle(i, nIdAlumnoDeuda)
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

function ingresarPensionMatricula(iNivel, iGrado, iAlumno, iPension, iPersonaDeuda) {

    $.ajax({
        url: "registroMatriculaServletController",
        data: {
            action: "ingresarDatosMatricula",
            IDNIVEL: iNivel,
            IDGRADO: iGrado,
            IDPERSONA: iAlumno,
            PENSION: iPension,
            IDPERSONADEUDA: iPersonaDeuda,
            anioAcademico: $('#cboAñoAcademico option:selected').text().trim()
        }
    })
            .done(function(data, status, jqXhr) {
                resultado = data.split(",");
                var codResultado = resultado[0];
                var descResultado = resultado[1];
                if (iNivel != 0 && iPension > 0) {
                    jAlertMatriculaNivel(descResultado, "Mensaje");
                } else if (iGrado != 0 && iPension > 0) {
                    jAlertMatriculaGrado(descResultado, "Mensaje");
                } else if (iAlumno != 0 && iPension > 0) {
                    jAlertMatriculaGradoAlumno(descResultado, "Mensaje");
                }
            });
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

function fnPensionAlumnoMatricula(nIdPersona) {
    $('#btnMatriculaPersona' + nIdPersona).on("click", function() {
        ingresarPensionMatricula(0, 0, $('#lblMatricula' + nIdPersona).text(), $('#txtMatriculaAlumno' + nIdPersona).val(), 0);
    });
}

function fnCargarAnioAcademicoMatricula() {

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
                }
                else {
                    for (var i = 0; i < arregloAnioAcademico.length - 1; i++) {
                        var idAnio = arregloAnioAcademico[i].split(",")[0];
                        var sDescripcionAnio = arregloAnioAcademico[i].split(",")[1];

                        $("#cboAñoAcademico").append("<option value=" + idAnio + "><strong>" + sDescripcionAnio + "</strong></option>");
                        idCombo = idAnio;
                    }
                }
                fncolocarSeleccionMatricula(idCombo);
                fnEventoAnioAcademicoMatricula();

            });

    function limpiarSelectAnioAcademico() {
        $("#cboAñoAcademico option").remove();
    }

    function fncolocarSeleccionMatricula(idCombo) {
        $("#cboAñoAcademico [value=" + idCombo + "]").prop("selected", true);
        fnCargarNivelesMatricula();
    }
}

function habilitarGradoMatricula(nParametro) {

    //deshabilitar boton Ingresar
    switch (nParametro) {
        case 1:
            $('#divMatriculaINICIAL').fadeIn(500);
            $('#divMatriculaPRIMARIA').hide(500);
            $('#divMatriculaSECUNDARIA').hide(500);
            $("#btnMatriculaBuscarINICIAL").show();
            $("#btnMatriculaBuscarPRIMARIA").hide();
            $("#btnMatriculaBuscarSECUNDARIA").hide();
            break;
        case 2:
            $('#divMatriculaINICIAL').hide(500);
            $('#divMatriculaPRIMARIA').fadeIn(500);
            $('#divMatriculaSECUNDARIA').hide(500);
            $("#btnMatriculaBuscarINICIAL").hide();
            $("#btnMatriculaBuscarPRIMARIA").show();
            $("#btnMatriculaBuscarSECUNDARIA").hide();
            break;
        case 3:
            $('#divMatriculaINICIAL').hide(500);
            $('#divMatriculaPRIMARIA').hide(500);
            $('#divMatriculaSECUNDARIA').fadeIn(500);
            $("#btnMatriculaBuscarINICIAL").hide();
            $("#btnMatriculaBuscarPRIMARIA").hide();
            $("#btnMatriculaBuscarSECUNDARIA").show();
            break;
        default :
            $("#btnMatriculaBuscarINICIAL").hide();
            $("#btnMatriculaBuscarPRIMARIA").hide();
            $("#btnMatriculaBuscarSECUNDARIA").hide();
    }
}

function fnEventoAnioAcademicoMatricula() {
    $("#cboAñoAcademico").change(function() {
        fnCargarNivelesMatricula();
        $("#divMatriculaNiveles").show();
    });
}

function resultadosClickHandlerConsultaAlumnoMatricula(Descripcion) {
    $('#btnMatriculaAlumno' + Descripcion).on("click", function() {
        $("#tblMatriculaAlumnoPension tr").remove();
        $("#txtMatriculaNombres").val("");
    })
}

function fnIngresarMatriculaNivel() {
    $('#btnMatriculaNivel').on("click", function(t) {

        $('#divMatriculaNiveles input[type=text]').each(function(e) {

            ingresarPensionMatricula(
                    $('#divMatriculaNiveles span').eq(e).text().trim(),
                    0,
                    0,
                    $('#divMatriculaNiveles input[type=text]').eq(e).val().trim(),
                    0
                    );
        })
        $("#divMatriculaNiveles input[name='matricula']:radio").removeAttr("checked");
        t.preventDefault();

    });

    fnIngresarMatriculaGrado();
}

function fnIngresarMatriculaGrado() {
    $('#btnMatriculaGrado').on("click", function(t) {
        console.log("Hola.");
        $('#divMatriculaGrado input').each(function(e) {
            ingresarPensionMatricula(
                    0,
                    $('#divMatriculaGrado span').eq(e).text().trim(),
                    0,
                    $('#divMatriculaGrado input').eq(e).val().trim(),
                    0
                    );
        })
        t.preventDefault();
    });
}

function fnCancelarNivelMatricula() {
    $('#btnMatriculaNivelCancelar').on("click", function() {
        $("#divMatriculaNiveles input[name='matricula']:radio").removeAttr("checked");
        fnCargarNivelesMatricula();
        $("#btnMatriculaNivel").show();
    })

}
