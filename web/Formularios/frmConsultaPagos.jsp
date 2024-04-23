<%-- 
    Document   : frmConsultaPagos
    Created on : 23/02/2016, 10:08:35 AM
    Author     : MAQ
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<t:headTemplate>

    <jsp:attribute name="extra_css">

        <script>
            $.datepicker.regional['es'] = {
                closeText: 'Cerrar',
                prevText: '<Ant',
                nextText: 'Sig>',
                currentText: 'Hoy',
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
                dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
                weekHeader: 'Sm',
                dateFormat: 'dd/mm/yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            };
            $.datepicker.setDefaults($.datepicker.regional['es']);
            $(function() {
                $("#txtFechaConsultaINICIAL").datepicker({
                    changeMonth: true,
                    changeYear: true
                            //                   showOn: "button"
                            //                    buttonImage: "${pageContext.request.contextPath}/images/ico.png",
                            //                    buttonImageOnly: true,
                            //                    showButtonPanel: true                    
                });
                $("#txtFechaConsultaFIN").datepicker({
                    changeMonth: true,
                    changeYear: true,
                    //                    showOn: "button",
                    //                    buttonImage: "${pageContext.request.contextPath}/images/ico.png",
                    //                    buttonImageOnly: true,
                    //                    showButtonPanel: true                    
                });

            });
        </script>
        <style>
            .scrollBar{
                max-height:500px;
                overflow-y:auto;
            }
        </style>

    </jsp:attribute>

    <jsp:attribute name="footer">
        <div class="modal-Loading"></div>
        <p id="legal">( c ) 2024. All Rights Reserved. Designed by  <a href="https://www.facebook.com/apiservi" target="_blank">APISERVI SAC</a>.</p>
    </jsp:attribute>

    <jsp:body>
        <div id="header"></div>
        <div id="body">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="panel-title">
                        <span class="text-capitalize text-uppercase">CONSULTA DE PAGOS</span>
                    </div>
                </div>
                <div class="panel-body">

                    <div class="panel panel-default">
                        <div class="panel-body">

                            <form class="form-horizontal" id="frmConsultaPagos">

                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="form-group">
                                            <label class="control-label col-sm-1">Fecha</label>
                                            <div class="col-sm-11 form-inline">
                                                <input type="text" class="form-control" id="txtFechaConsultaINICIAL" value="" placeholder="DD/MM/YYYY"/>
                                                <input type="text" class="form-control" id="txtFechaConsultaFIN" value="" placeholder="DD/MM/YYYY"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-1">Dni</label>
                                            <div class="col-sm-11 form-inline">
                                                <input type="text" class="form-control" id="txtDni" value="" placeholder="Ingresar número..."/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-1">Alumno</label>                                            
                                            <div class="col-sm-3 col-sm-offset-0">
                                                <input type="text" class="form-control" id="txtApNom" value="" placeholder="Ingresar texto..."/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-1">Nivel</label>
                                            <div class="col-sm-11 form-inline">
                                                <select id="cboNivel" class="form-control" name="NIVEL">
                                                    <option>
                                                    <option>                                                        
                                                        Seleccione
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">                                        
                                            <label class="control-label col-sm-1">Nº Boleta</label>
                                            <div class="col-sm-11 form-inline">
                                                <input type="text" id="txtNRecibo" class="form-control" value="" placeholder="Ingresar número..."/>
                                            </div>
                                        </div>

                                        <div class="form-group form-inline">
                                            <div class="col-sm-offset-1 col-sm-11">
                                                <a href="#">
                                                    <button id="btnLimpiarConsultaPagos" class="btn btn-default" type="submit">Limpiar
                                                        <img title="Limpiar" src="${pageContext.request.contextPath}/resources/images/if_clean.png" height="16" width="16"/>
                                                    </button>
                                                </a> 
                                                <a href="#">                                                    
                                                    <button id="btnBuscarConsultaPagosAlumno" class="btn btn-default" type="submit">Buscar
                                                        <img title="Buscar" src="${pageContext.request.contextPath}/images/icon_Search.png"  height="16" width="16"/>
                                                    </button>
                                                </a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>                              
                        </div>                
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-body">
                            <!-- inicio llenado de tabla-->

                            <div class="container-fluid">
                                <div class="row">
                                    <label class="col-sm-11 col-sm-offset-0 lead" id= "spSumaAlumnosPagos"></label> 
                                    <div class="col-sm-1 col-sm-offset-0">
                                        <button id='btnExportarExcelBuscarPagosAlumno' class='btn btn-default' type='submit'>Exportar Excel
                                            <img title='Exportar Excel' src='../images/icon_excel.png' height='16' width='16'/>
                                        </button>
                                    </div>                                
                                </div>
                            </div>

                            <label class="hide" id="spFechaActual"></label>                                    

                            <div class="table-responsive scrollBar">
                                <table id="tbl" class="table table-condensed">
                                    <thead>
                                        <tr>
                                            <th>N</th>
                                            <th>DNI</th>
                                            <th>ALUMNO</th>
                                            <th>NIV</th>
                                            <th>GRA</th>
                                            <th>RECIBO</th>
                                            <th>MES</th>
                                            <th>PAGO</th>
                                            <th>FECHA</th>
                                            <th>USER</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tblAlumnosPagos">

                                    </tbody>
                                </table>
                            </div>

                            <!-- fin llenado -->
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </jsp:body>        

</t:headTemplate>
