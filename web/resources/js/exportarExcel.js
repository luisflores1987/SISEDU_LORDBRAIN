$(document).ready(function() {
    fnReporteExcelConsultaDeudas();
    fnReporteExcelConsultaPagos();

});

function fnReporteExcelConsultaPagos() {
    $("#btnExportarExcelBuscarPagosAlumno").click(function() {
        if ($('tr').parent().is('#tblAlumnosPagos')) {
            fnReporteExcelConsultaDeudas();

            //window.open('data:application/vnd.ms-excel,' + escape(($('#divConsolidado').html())));        // se coloca el metodo escape para evitar la codifcacion utf-8, la cual nos cambia la letra ñ
            $.ajax({
                url: 'variosImprimirServletController',
                data: {
                    action: "imprimirConsultaPagos",
                    txtDni: $("#txtDni").val(),
                    txtApNom: $("#txtApNom").val(),
                    cboNivel: $('#cboNivel option:selected').val(),
                    txtRecibo: $("#txtNRecibo").val(),
                    txtFechaInicial: $("#txtFechaConsultaINICIAL").val(),
                    txtFechaFin: $("#txtFechaConsultaFIN").val()
                },
                beforeSend: function() {
                    $('body').addClass('loading'); //Agregamos la clase loading al body.. para que aparezca al cargar.
                },
                error: function() {
                    $('body').removeClass('loading'); //Removemos la clase loading
                }
            })
                    .done(function(data) {
                        var link = document.createElement("a");
                        link.download = "Reporte_Pagos_" + $("#spFechaActual").text() + ".xls";
                        link.href = data;
                        link.click();
                        $('body').removeClass('loading'); //Removemos la clase loading
                    });
        } else {
            jAlert("Tiene que realizar una busqueda", "Mensaje");
        }
    });
}

function fnReporteExcelConsultaDeudas() {
    $("#btnExportarExcelConsultaDeuda").click(function() {
        
        if ($('tr').parent().is('#tblAlumnosDeudas')) {
            //window.open('data:application/vnd.ms-excel,' + escape(($('#divConsolidado').html())));        // se coloca el metodo escape para evitar la codifcacion utf-8, la cual nos cambia la letra ñ
            $.ajax({
                url: 'variosImprimirServletController',
                data: {
                    action: "imprimirConsultaDeudas",
                    anioAcademico: $('#cboAñoAcademico option:selected').text(),
                    idNivel: $('#cboNivel option:selected').val(),
                    idGrado: $('#cboGrado option:selected').val(),
                    desNivel: $('#cboNivel option:selected').text(),
                    desGrado: $('#cboGrado option:selected').text()
                },
                beforeSend: function() {
                    $('body').addClass('loading'); //Agregamos la clase loading al body.. para que aparezca al cargar.
                },
                error: function() {
                    $('body').removeClass('loading'); //Removemos la clase loading
                }
            })
                    .done(function(data) {
                        var link = document.createElement("a");
                        link.download = "Reporte_Deudas_" + $("#spFechaActual").text() + ".xls";
                        link.href = data;
                        link.click();
                        $('body').removeClass('loading'); //Removemos la clase loading
                    });
        } else {
            jAlert("Tiene que realizar una busqueda", "Mensaje");
        }
        
    });
}
