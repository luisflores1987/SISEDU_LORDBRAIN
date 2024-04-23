<%-- 
    Document   : frmRegistroPagos
    Created on : 26/01/2016, 08:59:48 AM
    Author     : lflores
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<t:headTemplate>
    <jsp:attribute name="extra_css">
    </jsp:attribute>

    <jsp:attribute name="footer">
        <p id="legal">( c ) 2024. All Rights Reserved. Designed by  <a href="https://www.facebook.com/apiservi" target="_blank">APISERVI SAC</a>.</p>
    </jsp:attribute>

    <jsp:body>
        <div id="header"></div>

        <div class="panel panel-default" id ="divDatosPago">
            <div class="panel-heading">
                <div class="panel-title"><h3 class="title">REGISTRO DE PAGO</h3></div>   
            </div>
            <div class="panel-body">
                <div class="panel panel-default">
                    <form role="form">

                        <div class="form-group">
                            <img id="imgIconAlumnoRegistroPago" style="vertical-align: middle;cursor: pointer;" class="img-thumbnail btn-default" data-toggle="modal" data-target="#divDatosPersonales" src="${pageContext.request.contextPath}/images/1454970620_contact-new.png" width="48" height="48"/>
                            <label>BUSCAR ALUMNO</label>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <p class="text-capitalize text-uppercase">NOMBRE</p>
                                    <label id="lblNombre"></label>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <p class="text-capitalize text-uppercase">DNI</p>
                                    <label id="lblDNI"></label>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <p class="text-capitalize text-uppercase">NIVEL</p>
                                    <label id="lblNivel"></label>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6">            
                                    <p class="text-capitalize text-uppercase">GRADO</p>
                                    <label id="lblGrado"></label>
                                </div>                                
                            </div>

                        </div>

                    </form>
                </div>

                <div class="panel panel-default">
                    <div class="panel-body">
                        <label id="lblIdAlumno" disabled="disabled"></label>
                        <div class="otrosrecibopagos">

                            <form role="form" id="tblRecibo">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-lg-4 col-lg">
                                            <div class="form-group">
                                                <span>NÚMERO DE RECIBO</span>
                                                <input type="text" name="Número Recibo" id="txtReciboDetalle" class="form-control" maxlength="7">  
                                            </div>
                                        </div>   
                                    </div>
                                </div> 
                            </form>

                        </div>                        

                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-0 col-xs-12 col-xs-offset-0">
                                    <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style="display:none"></th>
                                                    <th></th>                                    
                                                    <th>MES DE PAGO</th>
                                                    <th>DEUDA</th>
                                                    <th>MORA</th> 
                                                    <th>PAGO</th>                                     
                                                </tr>
                                            </thead>
                                            <tbody id="tblPagos">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form role="form">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-4 col-lg-offset-0 col-lg-offset-4">

                                        <a href="#" id="impresionPDF">
                                            <button id="btnIngresarPago" type="submit" class="btn btn-info btn-default">PAGAR
                                                <img src="${pageContext.request.contextPath}/images/OK.png" alt=""/>
                                            </button> 
                                        </a>
                                        <a href="#">
                                            <button id="btnCancelar" type="submit" class="btn btn-info btn-default" value="1">CANCELAR
                                                <img src="${pageContext.request.contextPath}/images/Cancel.png" alt=""/>
                                            </button>
                                        </a>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div> 


<!-- MODAL BUSQUEDA DE ALUMNOS-->
<div class="modal fade" id="divDatosPersonales" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" id="btnCerrarVentana" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">BUSQUEDA DE ALUMNOS</h4>
            </div>
            <div class="modal-body">
                <form role="form">
                    <div class="form-group">
                        <input type="text" class="form-control" id="txtAlumno" name="txtAlumno" placeholder="Ingresar texto..." required/>
                        <button id="btnBuscarRegistroPago" type="submit" class="btn btn-default">Buscar</button>                
                    </div>
                    <div class="radio-inline">
                        <input type="radio" id ="rbFiltro" name="rbFiltro" value="1" ><label>DNI</label></input>
                    </div>       
                    <div class="radio-inline">
                        <input type="radio" id ="rbFiltro" name="rbFiltro" value="2" checked="checked"><label>Apellidos y Nombres</label></input> 
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>DNI</th>
                                    <th colspan="3">ALUMNO</th>
                                    <th>TIPO</th>                     
                                </tr>
                            </thead>
                            <tbody id="tblAlumnosRegistroPagos">

                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>     
<!--         FIN -BUSQUEDA DE ALUMNOS-->


</jsp:body>
</t:headTemplate>