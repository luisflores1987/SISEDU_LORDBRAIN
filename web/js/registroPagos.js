$(document).ready(function() {
    $(".classRegAlumno").attr("disabled", "disabled");
    $(".classRegAlumnoBoton").attr("disabled", "disabled");
    $("#divDatosPersonales").hide();
    $("#ckbCancelado").hide();
    $('#tblRecibo').hide();
    $('#btnIngresarPago').hide();
    $('#btnCancelar').hide();
    fnGetDateActual();
    $('#spFechaActual').css('color', '#2A0F0F');
    $('#logoTitulo').css('')

    $("#imgIconAlumnoRegistroPago").click(function() {
        $("#tblAlumnosRegistroPagos tr").remove();
        $("input[value='2']").prop('checked', true);
        $("input[id=txtAlumno]").val("");
    });

    $("#btnBuscarPagosAlumno").on("click", function(e) {
        buscarPagoBuscarPagosAlumno();
        e.preventDefault();
    });

    $("#imgIconNewAlumno").on("click", function() {
        $(".classRegAlumno").removeAttr("disabled");
        $(".classRegAlumnoBoton").removeAttr("disabled");
        $(".classRegAlumno").css("background", "#FFFFAA");
        $("#txtDniPagos").focus();
    })

    $("#btnCancelarRegistroPago").on("click", function(e) {
        cancelarBuscarPagosAlumno();
        e.preventDefault();
    })

    $("#btnBuscarRegistroPago").on("click", function(e) {
        buscarAlumnoRegistroPago();
        e.preventDefault();
    })
    $("#btnExportarBuscarPagosAlumno").click(function(e) {
        window.open('data:application/vnd.ms-excel,' + escape(($('#tblTablaConsulta').html())));        // se coloca el metodo escape para evitar la codifcacion utf-8, la cual nos cambia la letra ñ
        e.preventDefault();
    });
    habilitarCamposBuscarPagosAlumno();
    $("#lblIdAlumno").hide();
    fnBuscarConsultaPagosAlumno();
    fnLimpiarConsultaPagos();
    //obtener el numero recibo actual disponible
    obtenerNumeroRecibo();
    $('#txtReciboDetalle').prop('readonly', true);
    
});

function buscarAlumnoRegistroPago() {
    $.ajax({
        type: 'GET',
        url: "registroPagoServletController",
        data: {
            action: "consultaDatos",
            txtPaciente: $("#txtAlumno").val(),
            rbFiltro: $("#rbFiltro:checked").val()
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                limparselect();
                if (data == '') {
                    $('#tblAlumnosRegistroPagos').append('<tr><td class="text-left" colspan = "6"><label> No se encontraron datos ... </label></td></tr>');
                }
                else {
                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {
                        var idPersona = arregloAlumnos[i].split("-")[0];
                        var numeroDocumento = arregloAlumnos[i].split("-")[1];
                        var apellidoPaterno = arregloAlumnos[i].split("-")[2];
                        var apellidoMaterno = arregloAlumnos[i].split("-")[3];
                        var nombres = arregloAlumnos[i].split("-")[4];
                        var sTipoMatricula = arregloAlumnos[i].split("-")[6];
                        var sCodigoColor = arregloAlumnos[i].split("-")[7];
                        if (sCodigoColor == 0) {
                            $('#tblAlumnosRegistroPagos').append('<tr data-dismiss="modal" class="danger">\n\
                                                                    <td><label>' + numeroDocumento + '</label></td>\n\
                                                                    <td><label>' + apellidoPaterno + '</label></td>\n\
                                                                    <td><label>' + apellidoMaterno + '</label></td>\n\
                                                                    <td><label>' + nombres + '</label></td>\n\
                                                                    <td><label>' + idPersona + '</label></td>\n\
                                                                    <td><label>' + sTipoMatricula + '</label></td>\n\
                                                            </tr>');
                        } else {
                            $('#tblAlumnosRegistroPagos').append('<tr data-dismiss="modal">\n\
                                                                    <td><label>' + numeroDocumento + '</label></td>\n\
                                                                    <td><label>' + apellidoPaterno + '</label></td>\n\
                                                                    <td><label>' + apellidoMaterno + '</label></td>\n\
                                                                    <td><label>' + nombres + '</label></td>\n\
                                                                    <td><label>' + idPersona + '</label></td>\n\
                                                                    <td><label>' + sTipoMatricula + '</label></td>\n\
                                                            </tr>');
                        }
                        $('#tblAlumnosRegistroPagos tr td:nth-child(5)').hide();
                    }
                }
                resultadosClickHandlerBuscarPagosAlumno();
            });
    function limparselect() {
        $('#tblAlumnosRegistroPagos tr').remove();
    }
}

function resultadosClickHandlerBuscarPagosAlumno() {

    $("#tblAlumnosRegistroPagos tr").each(function(i) {
        $(this).click(function() {
            var idPersona = $('#tblAlumnosRegistroPagos tr td:nth-child(5)').eq(i).text();
            $.ajax({
                url: "registroPagoServletController",
                data: {
                    action: "rowclickAlumno",
                    id: idPersona
                }
            })
                    .done(function(data, status, jqXhr) {
                        arregloAlumnos = data.split(":");
                        limparselect();
                        if (data == '') {
                            $('#tblAlumnosRegistroPagos').append('<tr><td class="text-left" colspan = "4"><label> No se encontraron datos ... </label></td></tr>');
                        }
                        else {
                            for (var i = 0; i < arregloAlumnos.length - 1; i++) {
                                var idPersona = arregloAlumnos[i].split("-")[0];
                                var numeroDocumento = arregloAlumnos[i].split("-")[1];
                                var apellidoPaterno = arregloAlumnos[i].split("-")[2];
                                var apellidoMaterno = arregloAlumnos[i].split("-")[3];
                                var nombres = arregloAlumnos[i].split("-")[4];
                                var nombreCompleto = (arregloAlumnos[i].split("-")[2] + ' ' + arregloAlumnos[i].split("-")[3] + ' ' + arregloAlumnos[i].split("-")[4]);
                                var fechaNacimiento = arregloAlumnos[i].split("-")[5];
                                var sexo = arregloAlumnos[i].split("-")[6];
                                var descripcionNivel = arregloAlumnos[i].split("-")[7];
                                var descripcionGrado = arregloAlumnos[i].split("-")[8];

                                $('#lblNombre').text(nombreCompleto);
                                $('#lblDNI').text(numeroDocumento);
                                $('#lblNivel').text(descripcionNivel);
                                $('#lblGrado').text(descripcionGrado);
                                $('#divDatosPersonales').show();

                                // if your table has header(th),'). use this
                                //$('td:nth-child(2),th:nth-child(2)').hide();                
                            }
                        }
                        buscarPagoBuscarPagosAlumno($('#lblDNI').text().trim());
                    });
            function limparselect() {
                $('#txtNombresFormulario').val("");
                $('#lblNombre').text("");
                $('#lblDNI').text("");
                $('#lblNivel').text("");
                $('#lblGrado').text("");
                $('#btnIngresarPago').hide();
                $('#btnCancelar').hide();
                dlgConsularAlumno.dialog("close");
            }
        });
    });
}

function buscarPagoBuscarPagosAlumno(numeroDocumento) {
    $.ajax({
        type: 'GET',
        url: "registroPagoServletController",
        data: {
            action: "buscarAlumno",
            nDocumento: numeroDocumento
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                limparselect();
                if (data == '') {
                    $('#tblPagos').append('<tr><td colspan = "5"><label> No se encontraron deudas ... </label></td></tr>');
                }
                else {
                    var Total = 0;
                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {
                        var mes = arregloAlumnos[i].split("-")[0];
                        var monto = arregloAlumnos[i].split("-")[1];
                        var mora = arregloAlumnos[i].split("-")[2];
                        var pago = arregloAlumnos[i].split("-")[3];
                        var nIdDeuda = arregloAlumnos[i].split("-")[4];
                        var nIdAlumno = arregloAlumnos[i].split("-")[5];
                        var nIdAlumnoDeuda = arregloAlumnos[i].split("-")[6];
                        var montoOtros = arregloAlumnos[i].split("-")[7];
                        var sBoleta = arregloAlumnos[i].split("-")[8];
                        var sAnioAcademico = arregloAlumnos[i].split("-")[9];
                        var sIndex = arregloAlumnos[i].split("-")[10];
                        var nIdPersona = arregloAlumnos[i].split("-")[11];


                        //var sNumeroRecibo = arregloAlumnos[i].split("-")[9];
                        //var sNombreCompleto =  arregloAlumnos[i].split("-")[5]; 
                        $('#tblPagos').append('<tr>\n\
                                        <td class="text-left" style="display:none"><img id="imgIconAlumno' + nIdAlumnoDeuda + '" src="/SISEDU/images/Reprinter.png" width="24" height="24"/></td>\n\
                                        <td class="text-left"><input type="checkbox" name="chkSeleccion' + nIdAlumnoDeuda + '" id="chkSeleccion' + nIdAlumnoDeuda + '"/></td>\n\
                                        <td class="text-left"><label>' + mes + '</label></td>\n\
                                        <td class="text-right"><label>' + monto + '</label></td>\n\
                                        <td class="text-left" style="text-align: center;" ><input type="text" style="width: 50px;" id="txtMora' + nIdAlumnoDeuda + '"></td>\n\
                                        <td class="text-left" style="text-align: center;" ><input type="text" style="width: 50px;" id="txtPension' + nIdAlumnoDeuda + '"></td>\n\
                                        <td><label>' + nIdDeuda + '</label></td>\n\
                                        <td><label>' + nIdAlumno + '</label></td>\n\
                                        <td><label>' + nIdAlumnoDeuda + '</label></td>\n\
                                        <td><label>' + montoOtros + '</label></td>\n\
                                        <td><label>' + sBoleta + '</label></td>\n\\n\
                                        <td><label>' + sIndex + '</label></td>\n\
                                        </tr>');
                        $('#tblPagos tr td:nth-child(7)').hide();
                        $('#tblPagos tr td:nth-child(8)').hide();
                        $('#tblPagos tr td:nth-child(9)').hide();
                        $('#tblPagos tr td:nth-child(10)').hide();
                        $('#tblPagos tr td:nth-child(11)').hide();
                        $('#tblPagos tr td:nth-child(12)').hide();
                        $('#txtMora' + nIdAlumnoDeuda).hide();
                        $('#txtPension' + nIdAlumnoDeuda).hide();

                        $('#lblIdAlumno').text(nIdPersona);

                        if ($('#tblPagos tr td:nth-child(4)').eq(i).text() == 0) {
                            $('input:checkbox[id="chkSeleccion' + nIdAlumnoDeuda + '"]').attr("disabled", "disabled");
                        } else {

                        }

                        if (sBoleta == "0") {
                            $('#imgIconAlumno' + nIdAlumnoDeuda).css("display", "none");
                        } else {
                            $('#imgIconAlumno' + nIdAlumnoDeuda).val(nIdAlumnoDeuda + ';' + $('#tblPagos tr td:nth-child(8) label').eq(i).text().trim());
                            $('#imgIconAlumno' + nIdAlumnoDeuda).click(function() {
                                fnReimprimirBuscarPagosAlumno($(this).val().split(";")[0], $(this).val().split(";")[1]);
                            });
                        }

                        fnHabilitarTextBoxBuscarPagosAlumno(nIdAlumnoDeuda);
                        fnCancelarBoletasBuscarPagosAlumno(nIdAlumnoDeuda);
                        obtenerNumeroRecibo(); /*se agrega comentario para obtener recibo*/
                    }

                    fnIngresoBoletaBuscarPagosAlumno();

                }

            });
    function limparselect() {
        $('#tblPagos tr').remove();
    }
}

function fnIngresoBoletaBuscarPagosAlumno() {
    $("#btnIngresarPago").on("click", function(e) {
        
        var resultado = ingresarBoletaBuscarPagosAlumno(function(resultado) {
            if(resultado) {
                setTimeout(function() { fnactualizarPagoBuscarPagosAlumno($("#lblDNI").text().trim()); }, 1000);
                setTimeout(function() { actualizarRecibo(); }, 2000);
                setTimeout(function() { obtenerNumeroRecibo(); }, 2005);
            }
        });
        e.preventDefault();
    })
}

function fnHabilitarTextBoxBuscarPagosAlumno(nIdAlumnoDeuda) {

    $('input:checkbox[id="chkSeleccion' + nIdAlumnoDeuda + '"]').on("click", function() {
        if ($('input[type="checkbox"][name="chkSeleccion' + nIdAlumnoDeuda + '"]').is(':checked'))
        {
            $.ajax({
                url: "registroPagoServletController",
                data: {
                    action: "obtenerMonto",
                    idAlumnoDeuda: nIdAlumnoDeuda
                }
            })
                    .done(function(data, status, jqXhr) {
                        var nMonto = data
                        $('#txtMora' + nIdAlumnoDeuda).val(0);
                        $('#txtPension' + nIdAlumnoDeuda).val(nMonto);
                        $('#txtMora' + nIdAlumnoDeuda).show();
                        $('#txtPension' + nIdAlumnoDeuda).show();
                        $('#tblRecibo').show();
                        $('#btnIngresarPago').show();
                        $('#btnCancelar').show();
                    })
        }
        else {
            $('#txtMora' + nIdAlumnoDeuda).hide();
            $('#txtPension' + nIdAlumnoDeuda).hide();
            $('#tblRecibo').hide();
            $('#btnIngresarPago').hide();
            $('#btnCancelar').hide();

            $('input[type="checkbox"]').each(function(i) {
                if (i != 10)
                {
                    if ($('input[type="checkbox"]').eq(i).is(':checked')) {
                        $('#tblRecibo').show();
                        $('#btnIngresarPago').show();
                        $('#btnCancelar').show();
                    }
                }
            })
        }
    });
}

function habilitarCamposBuscarPagosAlumno() {
    $(".classRegPago").removeAttr("disabled");
    $(".classRegPagoBoton").removeAttr("disabled");
    $(".classRegPago").css("background", "#FFFFAA");
    $("#txtRecibo").focus();
}

function ingresarBoletaBuscarPagosAlumno(callback) {
    validarBoletaBuscarPagosAlumno();
    var bPagoSeleccionado = false;
    var nCuota;
    var nTotal = 0;
    var sCadDeuda = '';
    var numeroBoleta = $("#txtReciboDetalle").val();
    var IdAlumno = $("#lblIdAlumno").text();
    if (!validado) {
        return;
    }

    $.ajax({
        url: "registroPagoServletController",
        data: {
            action: "verificarBoleta",
            txtRecibo: $("#txtReciboDetalle").val()
        }
    })
            .done(function(data, status, jqXhr) {
                resultado = data.split(",");
                var descResultado0 = resultado[0];
                var descResultado1 = resultado[1];
                var pago = 0;

                if (descResultado0 == 0)
                {
                    jAlert(descResultado1);
                    callback(false);
                } else
                {
                    $('#tblPagos tr').each(function(i) {
                        if ($('#tblPagos tr td:nth-child(2) input:checkbox').eq(i).is(':checked'))
                        {
                            nCuota = parseInt($('#tblPagos tr td:nth-child(12)').eq(i).text());
                            bPagoSeleccionado = true;
                            return;
                        }
                    })

                    for (var j = 1; j <= nCuota; j++) {

                        if (parseInt($('#tblPagos tr td:nth-child(4)').eq(j - 1).text()) > 0)
                        {
                            pago = parseInt($('#tblPagos tr td:nth-child(4)').eq(j - 1).text())
                            if (j == (nCuota))
                            {
                                sCadDeuda = sCadDeuda + $('#tblPagos tr td:nth-child(3)').eq(j - 1).text() + '.';
                            }
                            else
                            {
                                sCadDeuda = sCadDeuda + $('#tblPagos tr td:nth-child(3)').eq(j - 1).text() + ', ';
                            }
                        }
                        nTotal = nTotal + pago;
                    }


                    if (nTotal > 0)
                    {
                        jAlert('TIENE PAGOS PENDIENTES EN : ' + sCadDeuda);
                        limpiarselectPagoBuscarPagosAlumno();
                        callback(false);
                    }

                    if (bPagoSeleccionado) {
                        jConfirm('Desea guardar los cambios efectuados?', 'Confirmación', function(r) {
                            if (r)
                            {
                                $('#tblPagos tr').each(function(c) {

                                    if ($('#tblPagos tr td:nth-child(2) input:checkbox').eq(c).is(':checked'))
                                    {

                                        $.ajax({
                                            url: "registroPagoServletController",
                                            data: {
                                                action: "ingresarPagos",
                                                txtRecibo: $("#txtReciboDetalle").val(),
                                                txtMonto: $('#tblPagos tr td:nth-child(6) input:text').eq(c).val(),
                                                txtMontoOtros: $('#tblPagos tr td:nth-child(10)').eq(c).text(),
                                                txtMora: $('#tblPagos tr td:nth-child(5) input:text').eq(c).val(),
                                                IdAlumnoDeuda: $("#tblPagos tr td:nth-child(9)").eq(c).text(),
                                                IdAlumno: $("#tblPagos tr td:nth-child(8)").eq(c).text(),
                                                IdDeuda: $("#tblPagos tr td:nth-child(7)").eq(c).text(),
                                                Usuario: $("#txtUsuario").text().trim()
                                            }
                                        })
                                                .done(function(data, status, jqXhr) {
                                                    resultado = data.split(",");
                                                    var descResultado = resultado[0];
                                                    var montoResultado = resultado[1];


                                                    // se ocultan los componentes depspues de haber realizado el pago
//                                                    $('#tblPagos tr td:nth-child(4)').eq(c).text(montoResultado);
//                                                    $('#tblPagos tr td:nth-child(6) input:text').eq(c).val("");
//                                                    $('#tblPagos tr td:nth-child(5) input:text').eq(c).val("");
//                                                    $('#tblPagos tr td:nth-child(5) input:text').eq(c).hide();
//                                                    $('#tblPagos tr td:nth-child(6) input:text').eq(c).hide();
//
//
//                                                    $('#tblRecibo').hide();
//                                                    $('#btnIngresarPago').hide();
//                                                    $('input:checkbox').attr("checked", false);
//                                                    $("#btnCancelar").hide();

                                                    // fin se ocultan los componentes depspues de haber realizado el pago
                                                });


                                    }
                                })

                                fnImprimirBuscarPagosAlumno($('#txtReciboDetalle').val(), $('#lblIdAlumno').text());
                                jAlert('Se genero el pago correctamente');
                                $("#txtReciboDetalle").val("");

                                limpiarselectPagoBuscarPagosAlumno();
                                callback(true);
                            }
                        });
                    }
                    else
                    {
                        jAlert('Debe seleccionar al menos un mes');
                        limpiarselectPagoBuscarPagosAlumno();
                        callback(false);
                    }
                }
            });

}

function validarBoletaBuscarPagosAlumno() {
    validado = true;
    $(".classRegRecibo:not(.opcional)").each(function() {
        if ($(this).val().length < 1) {
            jAlert("El campo " + $(this).attr("name") + " es requerido");
            validado = false;
            return false;
        }
    });
}

function validarBuscarPagosAlumno() {
    validado = true;
    $(".classRegPago:not(.opcional)").each(function() {
        if ($(this).val().length < 1) {
            alert("El campo " + $(this).attr("name") + " es requerido");
            validado = false;
            return false;
        }
    });
}

function buscarAlumnoPagoBuscarPagosAlumno() {

    $.ajax({
        type: 'GET',
        url: "registroPagoServletController",
        data: {
            action: "consultaAlumnoPago",
            txtDniPagos: $("#txtDniPagos").val(),
            txtApNomPagos: $("#txtApNomPagos").val(),
            cboNivelPagos: $('#cboNivelPagos option:selected').val(),
            txtNReciboPagos: $("#txtNReciboPagos").val(),
            txtFechaConsultaINICIALPagos: $("#txtFechaConsultaINICIALPagos").val(),
            txtFechaConsultaFINPagos: $("#txtFechaConsultaFINPagos").val()
        },
        beforeSend: function() {
            $('body').addClass('loading'); //Agregamos la clase loading al body.. para que aparezca al cargar.
        },
        error: function() {
            $('body').removeClass('loading'); //Removemos la clase loading
        }
    })
            .done(function(data, status, jqXhr) {
                var suma = 0.00
                arregloAlumnos = data.split("+");
                limpiarselectPagoBuscarPagosAlumno();
                if (data == '') {
                    $('#tblAlumnosPagos').append('<tr><td colspan = "9" style="width: 594px;"><label> No se encontraron datos ... </label></td></tr>');
                }
                else {
                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {
                        var idBoleta = arregloAlumnos[i].split("*")[0];
                        var alumno = arregloAlumnos[i].split("*")[1];
                        var nivel = arregloAlumnos[i].split("*")[2];
                        var grado = arregloAlumnos[i].split("*")[3];
                        var numeroRecibo = arregloAlumnos[i].split("*")[4];
                        var mes = arregloAlumnos[i].split("*")[5];
                        var mora = arregloAlumnos[i].split("*")[6];
                        var monto = arregloAlumnos[i].split("*")[7];
                        var fechaCreacion = arregloAlumnos[i].split("*")[8];
                        var username = arregloAlumnos[i].split("*")[9];
                        var documento = arregloAlumnos[i].split("*")[10];

                        $('#tblAlumnosPagos').append('<tr>\n\
                                            <td>' + (i + 1) + '</td>\n\
                                            <td>' + documento + '</td>\n\
                                            <td>' + alumno + '</td>\n\
                                            <td>' + nivel + '</td>\n\
                                            <td>' + grado + '</td>\n\
                                            <td>' + numeroRecibo + '</td>\n\
                                            <td>' + mes + '</td>\n\
                                            <td>' + monto + '</td>\n\
                                            <td>' + fechaCreacion + '</td>\n\
                                            <td>' + username + '</td>\n\
                                            <td></td>\n\
                                            </tr>'
                                );
                        suma = suma + parseFloat(monto);
                    }
                    $('#spSumaAlumnosPagos').append('TOTAL : S/. ' + suma.toFixed(2) + '');
//                    $('#divExportarBuscarPagosAlumno').html("\n\
//                                                        <button id='btnExportarBuscarPagosAlumno' class='btn btn-default' type='submit'>Exportar Excel\n\
//                                                            <img title='Exportar Excel' src='../images/icon_excel.png' height='16' width='16'/>\n\
//                                                        </button>"
//                                                        );
                }
                $('body').removeClass('loading'); //Removemos la clase loading
            });
}

function limpiarselectPagoBuscarPagosAlumno() {
    $('#tblAlumnosPagos tr').remove();
    $('#tblCabeceraPagos tr').remove();
    $('#spSumaAlumnosPagos').text("");
    $('#idRegistro').text("");
}


function inhabilitartextBoxConsultaBuscarPagosAlumno() {

    $('#txtFechaConsultaINICIALPagos').attr("disabled", "disabled");
    $('#txtFechaConsultaFINPagos').attr("disabled", "disabled");
    $('#txtDniPagos').attr("disabled", "disabled");
    $('#cboNivelPagos').attr("disabled", "disabled");
    $('#txtApNomPagos').attr("disabled", "disabled");
    $('#txtNReciboPagos').attr("disabled", "disabled");

}

function eventoCheckBoxConsultaBuscarPagosAlumno() {

    $('#ckFECHA').click(function() {
        if (($('#ckFECHA').is(':checked'))) {
            $('#txtFechaConsultaINICIAL').removeAttr("disabled");
            $('#txtFechaConsultaFIN').removeAttr("disabled");
        }
        else
        {
            $('#txtFechaConsultaINICIAL').val("");
            $('#txtFechaConsultaFIN').val("");
            $('#txtFechaConsultaINICIAL').attr("disabled", "disabled");
            $('#txtFechaConsultaFIN').attr("disabled", "disabled");
        }
    })

    $('#ckDNI').click(function() {
        if (($('#ckDNI').is(':checked'))) {
            $('#txtDni').removeAttr("disabled");
        }
        else
        {
            $('#txtDni').val("");
            $('#txtDni').attr("disabled", "disabled");
        }
    })

    $('#ckAPNOM').click(function() {
        if (($('#ckAPNOM').is(':checked'))) {
            $('#txtApNom').removeAttr("disabled");
        }
        else
        {
            $('#txtApNom').val("");
            $('#txtApNom').attr("disabled", "disabled");
        }
    })

    $('#ckNIVEL').click(function() {
        if (($('#ckNIVEL').is(':checked'))) {
            $('#cboNivel').removeAttr("disabled");
        }
        else
        {
            $('#cboNivel').attr("disabled", "disabled");
        }
    })

    $('#ckRECIBO').click(function() {
        if (($('#ckRECIBO').is(':checked'))) {
            $('#txtNRecibo').removeAttr("disabled");
        }
        else
        {
            $('#txtNRecibo').val("");
            $('#txtNRecibo').attr("disabled", "disabled");
        }
    })
}

function fnImprimirBuscarPagosAlumno(recibo, alumno) {
    document.location.href = 'impresionPagoServletController?nIdAlumno=' + recibo + '&sNumeroRecibo=' + alumno;
}

function fnReimprimirBuscarPagosAlumno(idAlumnoDeuda, alumno) {
    document.location.href = 'impresionPagoServletController?action=reimprimir&nIdAlumno=' + idAlumnoDeuda + '&sNumeroRecibo=' + alumno;
}

function cancelarBuscarPagosAlumno() {

    $('#tblPagos tr td:nth-child(2)').each(function(i) {
        $('#chkSeleccion' + i).prop('checked', false);
        $('#txtPension' + i).val('');
        $('#txtMora' + i).hide();
        $('#txtPension' + i).hide();

    });

    $('#txtReciboDetalle').val('');
    $('#tblRecibo').hide();
    $('#btnIngresarPago').hide();
    $('#btnCancelar').hide();
}

function fnCancelarBoletasBuscarPagosAlumno(nIdAlumnoDeuda) {
    $("#btnCancelar").on("click", function(e) {

        $('#tblPagos tr td:nth-child(2)').each(function() {
            $('#chkSeleccion' + nIdAlumnoDeuda).prop('checked', false);
            $('#txtPension' + nIdAlumnoDeuda).val('');
            $('#txtMora' + nIdAlumnoDeuda).hide();
            $('#txtPension' + nIdAlumnoDeuda).hide();

        });

        $('#txtReciboDetalle').val('');
        $('#tblRecibo').hide();
        $('#btnIngresarPago').hide();
        $('#btnCancelar').hide();
        obtenerNumeroRecibo();
        e.preventDefault();
    });
}

function fnactualizarPagoBuscarPagosAlumno(numeroDocumento) {
    $.ajax({
        type: 'GET',
        url: "registroPagoServletController",
        data: {
            action: "buscarAlumno",
            nDocumento: numeroDocumento
        }
    })
            .done(function(data, status, jqXhr) {
                arregloAlumnos = data.split(":");
                limparselect();
                if (data == '') {
                    $('#tblPagos').append('<tr><td colspan = "5"><label> No se encontraron deudas ... </label></td></tr>');
                }
                else {
                    var Total = 0;
                    for (var i = 0; i < arregloAlumnos.length - 1; i++) {
                        var mes = arregloAlumnos[i].split("-")[0];
                        var monto = arregloAlumnos[i].split("-")[1];
                        var mora = arregloAlumnos[i].split("-")[2];
                        var pago = arregloAlumnos[i].split("-")[3];
                        var nIdDeuda = arregloAlumnos[i].split("-")[4];
                        var nIdAlumno = arregloAlumnos[i].split("-")[5];
                        var nIdAlumnoDeuda = arregloAlumnos[i].split("-")[6];
                        var montoOtros = arregloAlumnos[i].split("-")[7];
                        var sBoleta = arregloAlumnos[i].split("-")[8];
                        var sAnioAcademico = arregloAlumnos[i].split("-")[9];
                        var sIndex = arregloAlumnos[i].split("-")[10];
                        var nIdPersona = arregloAlumnos[i].split("-")[11];


                        //var sNumeroRecibo = arregloAlumnos[i].split("-")[9];
                        //var sNombreCompleto =  arregloAlumnos[i].split("-")[5]; 
                        $('#tblPagos').append('<tr>\n\
                                        <td class="text-left" style="display:none"><img id="imgIconAlumno' + nIdAlumnoDeuda + '" src="/SISEDU/images/Reprinter.png" width="24" height="24"/></td>\n\
                                        <td class="text-left"><input type="checkbox" name="chkSeleccion' + nIdAlumnoDeuda + '" id="chkSeleccion' + nIdAlumnoDeuda + '"/></td>\n\
                                        <td class="text-left"><label>' + mes + '</label></td>\n\
                                        <td class="text-right"><label>' + monto + '</label></td>\n\
                                        <td class="text-left" style="text-align: center;" ><input type="text" style="width: 50px;" id="txtMora' + nIdAlumnoDeuda + '"></td>\n\
                                        <td class="text-left" style="text-align: center;" ><input type="text" style="width: 50px;" id="txtPension' + nIdAlumnoDeuda + '"></td>\n\
                                        <td><label>' + nIdDeuda + '</label></td>\n\
                                        <td><label>' + nIdAlumno + '</label></td>\n\
                                        <td><label>' + nIdAlumnoDeuda + '</label></td>\n\
                                        <td><label>' + montoOtros + '</label></td>\n\
                                        <td><label>' + sBoleta + '</label></td>\n\\n\
                                        <td><label>' + sIndex + '</label></td>\n\
                                        </tr>');
                        $('#tblPagos tr td:nth-child(7)').hide();
                        $('#tblPagos tr td:nth-child(8)').hide();
                        $('#tblPagos tr td:nth-child(9)').hide();
                        $('#tblPagos tr td:nth-child(10)').hide();
                        $('#tblPagos tr td:nth-child(11)').hide();
                        $('#tblPagos tr td:nth-child(12)').hide();
                        $('#txtMora' + nIdAlumnoDeuda).hide();
                        $('#txtPension' + nIdAlumnoDeuda).hide();

                        $('#lblIdAlumno').text(nIdPersona);

                        if (sBoleta == "0") {
                            $('#imgIconAlumno' + nIdAlumnoDeuda).css("display", "none");
                        } else {
                            $('#imgIconAlumno' + nIdAlumnoDeuda).val(nIdAlumnoDeuda + ';' + $('#tblPagos tr td:nth-child(8) label').eq(i).text().trim());
                            $('#imgIconAlumno' + nIdAlumnoDeuda).click(function() {
                                fnReimprimirBuscarPagosAlumno($(this).val().split(";")[0], $(this).val().split(";")[1]);
                            });
                        }
                        fnHabilitarTextBoxBuscarPagosAlumno(nIdAlumnoDeuda);
                    }
                    
                    fnIngresoBoletaBuscarPagosAlumno();

                }

            });
    function limparselect() {
        $('#tblPagos tr').remove();
    }
}

function fnBuscarConsultaPagosAlumno() {
    $("#btnBuscarConsultaPagosAlumno").click(function(e) {

        var bValidar = false;
        $("#frmConsultaPagos input[type='text']").each(function(event) {
            if ($(this).val().length > 0) {
                bValidar = true;
            }
        });

        if ($("#cboNivelPagos").val() > 0) {
            bValidar = true;
        }
        ;

        if (bValidar) {
            buscarAlumnoPagoBuscarPagosAlumno();
        } else {
            jAlert("Debe al menos ingresar un campo..");
        }
        e.preventDefault();

    });
}

function fnLimpiarConsultaPagos() {
    $("#btnLimpiarConsultaPagos").on("click", function(e) {
        $("#tblAlumnosPagos tr").remove();
        $("#frmConsultaPagos")[0].reset();
        $("#spSumaAlumnosPagos").text("");
        $("#divExportarBuscarPagosAlumno").find("*").remove();
        e.preventDefault();
    });
}

function obtenerNumeroRecibo(){
            console.log("entro obtenerNumeroRecibo");
$.ajax({
        url: "registroPagoServletController",
        data: {
            action: "obtenerNumeroRecibo"
        }
    })
    .done(function (data, status, jqXhr) { 
        resultado = data.split(",");
        var descResultado0 = resultado[0];
        var descResultado1 = resultado[1];
        
        $('#txtReciboDetalle').val(descResultado1);

    })
    .fail(function (jqXhr, status, error) {
        console.error("Error en la solicitud obtenerNumeroRecibo:", status, error);
    });
}

function actualizarRecibo(){
            console.log("entro actualizarRecibo");
$.ajax({
        url: "registroPagoServletController",
        data: {
            action: "actualizarNumeroRecibo"
        }
    })
    .done(function (data, status, jqXhr) { 
        resultado = data.split(",");
        var descResultado0 = resultado[0];
        var descResultado1 = resultado[1];
        
        $('#txtReciboDetalle').val(descResultado1);

    })
    .fail(function (jqXhr, status, error) {
        console.error("Error en la solicitud obtenerNumeroRecibo:", status, error);
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
    .done(function(data){
        if(data == '')
            $('#spFechaActual').append('');
        else{
            
            var codigoGrado = data; 
            $('#spFechaActual').append('FECHA :' + codigoGrado);
        }        
    });
}

function inhabilitartextBoxConsulta(){
    
    $('#txtFechaConsultaINICIALPagos').attr("disabled", "disabled");
    $('#txtFechaConsultaFINPagos').attr("disabled", "disabled"); 
    $('#txtDniPagos').attr("disabled", "disabled"); 
    $('#cboNivelPagos').attr("disabled", "disabled");  
    $('#txtApNomPagos').attr("disabled", "disabled");
    $('#txtNReciboPagos').attr("disabled", "disabled");   
    
}