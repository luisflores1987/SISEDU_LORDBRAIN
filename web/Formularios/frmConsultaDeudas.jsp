<%-- 
    Document   : frmConsultaPagos
    Created on : 02/03/2016, 10:08:35 AM
    Author     : MAQ
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<t:headTemplate>
    <jsp:attribute name="extra_css">
        <style>
            .scrollBar{
                max-height:500px;
                overflow-y:auto;
            }
        </style>
    </jsp:attribute>  

    <jsp:attribute name="footer">

    </jsp:attribute>

    <jsp:body>
        <div id="header"></div>
        <div id="body">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="panel-title">
                        <span class="text-capitalize text-uppercase">CONSULTA DE DEUDAS</span>
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
                                                    <option value="4" selected>2024</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label col-sm-1">NIVEL</label>
                                            <div class="col-sm-11 form-inline">
                                                <select id="cboNivelConsultaDeuda" name="NIVEL" class="form-control">
                                                </select>
                                            </div>                          
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label col-sm-1">GRADO</label>
                                            <div class="col-sm-11 form-inline">
                                                <select id="cboGrado" name="GRADO" class="form-control">
                                                </select>
                                            </div>                          
                                        </div>  

                                        <div class="form-group form-inline">
                                            <div class="col-sm-offset-1 col-sm-11">
                                                <a href="#">
                                                    <button id="btnLimpiarDeudasAlumno" class="btn btn-default" type="submit">Limpiar
                                                        <img title="Limpiar" src="${pageContext.request.contextPath}/resources/images/if_clean.png" height="16" width="16"/>
                                                    </button>
                                                </a> 
                                                <a href="#">                                                    
                                                    <button id="btnBuscarDeudasAlumno" class="btn btn-default" type="submit">Buscar
                                                        <img title="Buscar" src="${pageContext.request.contextPath}/images/icon_Search.png"  height="16" width="16"/>
                                                    </button>
                                                </a>
                                            </div>
                                        </div>                                        

                                    </div>
                                </div>                      
                            </form>

                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-sm-1 col-sm-offset-11">
                                        <button id='btnExportarExcelConsultaDeuda' class='btn btn-default' type='submit'>Exportar Excel
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
                                            <th>Nombres</th>
                                            <th>Vac</th>                        
                                            <th>Mat</th>
                                            <th>Mar</th>
                                            <th>Abr</th>
                                            <th>May</th>
                                            <th>Jun</th>                                
                                            <th>Jul</th>                                
                                            <th>Ago</th>                                
                                            <th>Set</th>                                                                
                                            <th>Oct</th>
                                            <th>Nov</th> 
                                            <th>Dic</th> 
                                        </tr>
                                    </thead>
                                    <tbody id="tblAlumnosDeudas">

                                    </tbody>
                                </table>
                            </div>


                        </div>              
                        <!-- fin de template -->
                    </div>
                </div>
            </div>
        </div>             


    </div>
</jsp:body>        
</t:headTemplate>
