<%-- 
    Document   : frmReporteGrado
    Created on : 14/03/2018, 08:59:30 AM
    Author     : lflores
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:headTemplate>
    <jsp:attribute name="extra_css">
        <style>
            .textoNegrita{
                font-weight: bold; 
            }
        </style>
    </jsp:attribute>
    <jsp:attribute name="footer">
        <p id="legal">( c ) 2024. All Rights Reserved. Designed by  <a href="https://www.facebook.com/apiservi" target="_blank">APISERVI SAC</a>.</p>
    </jsp:attribute> 
    <jsp:body>
        <div id="header"></div>
        <div id="body">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="panel-title">
                        <span class="text-capitalize text-uppercase">REPORTE GERENCIAL</span>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="panel panel-default">
                        <div class="panel-body">

                            <form class="form-horizontal" id="frmConsultaDeudas">
                                <div class="container-fluid">
                                    <div class="row">

                                        <div class="form-group">
                                            <label class="control-label col-sm-1">AÑO ACADEMICO</label> 
                                            <div class="col-sm-11 form-inline">
                                                <select id="cboAñoAcademico" class="form-control">
                                                    <option value="1">2016</option>
                                                    <option value="2">2017</option>
                                                    <option value="3">2018</option>
                                                    <option value="4" selected>2018</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group form-inline">
                                            <div class="col-sm-offset-1 col-sm-11">
                                                <a href="#">
                                                    <button id="btnLimpiarReporteGerencial" class="btn btn-default" type="submit">Limpiar
                                                        <img title="Limpiar" src="${pageContext.request.contextPath}/resources/images/if_clean.png" height="16" width="16"/>
                                                    </button>
                                                </a> 
                                                <a href="#">                                                    
                                                    <button id="btnBuscarReporteGerencial" class="btn btn-default" type="submit">Buscar
                                                        <img title="Buscar" src="${pageContext.request.contextPath}/images/icon_Search.png"  height="16" width="16"/>
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>                      
                            </form>   

                            <div>
                                <div class="form-group">
                                    <span class="lead">Es :</span>
                                    <span class="text-capitalize">Monto Esperado</span>
                                </div>
                                <div class="form-group">                                
                                    <span class="lead">Re :</span>
                                    <span class="text-capitalize">Monto Real</span>
                                </div>
                                <div class="form-group">
                                    <span class="lead">Fa :</span>
                                    <span class="text-capitalize">Monto Faltante</span>
                                </div>
                            </div>


                            <div class="table-responsive scrollBar">
                                <table id="tbl" class="table table-bordered table-condensed">
                                    <thead>
                                        <tr class="active">
                                            <th class="text-center lead">Grados<span>&nbsp&nbsp</span></th>
                                            <th colspan="3" class="text-center lead">Vac</th>                                    
                                            <th colspan="3" class="text-center lead">Mat</th>
                                            <th colspan="3" class="text-center lead">Mar</th>
                                            <th colspan="3" class="text-center lead">Abr</th>
                                            <th colspan="3" class="text-center lead">May</th>
                                            <th colspan="3" class="text-center lead">Jun</th>                                
                                            <th colspan="3" class="text-center lead">Jul</th>                                
                                            <th colspan="3" class="text-center lead">Ago</th>                                
                                            <th colspan="3" class="text-center lead">Set</th>                                                                
                                            <th colspan="3" class="text-center lead">Oct</th>
                                            <th colspan="3" class="text-center lead">Nov</th> 
                                            <th colspan="3" class="text-center lead">Dic</th> 
                                        </tr>
                                    </thead>
                                    <tbody id="tblAlumnosReporteGeneral">

                                    </tbody>
                                </table>
                            </div>

                        </div> <!--FINALIZA EL TEMPLATE                -->
                    </div>
                </div>
            </div>
        </div>    
    </jsp:body>
</t:headTemplate>