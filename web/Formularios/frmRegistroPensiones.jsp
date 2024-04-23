<%-- 
    Document   : frmRegistroPensiones
    Created on : 16/02/2016, 08:59:48 AM
    Author     : lflores
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<t:headTemplate>
    <jsp:attribute name="extra_css">        
    </jsp:attribute>
    <jsp:attribute name="footer">

    </jsp:attribute>

    <jsp:body>
        <div id="header"></div>
        <div id="body">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="panel-title">
                        <span class="text-capitalize text-uppercase">REGISTRO DE PENSIONES</span>
                    </div>
                </div>
                <div class="panel-body">

                    <div class="panel panel-default">
                        <div class="panel-body">

                            <div class="container">
                                <div class="panel panel-default col-lg-6 col-lg-offset-3">
                                    <div class="panel-heading">
                                        <div class="panel-title center-block">
                                            <span class="lead">INGRESO DE PENSIONES</span>
                                        </div>
                                    </div>
                                    <div class="panel-body">
                                        <form class="form-horizontal" id="frmRegistroPendiones">
                                            <span id="spanIdAlumno" class="hide"></span>
                                            <div class="form-group">
                                                <label class="control-label col-sm-4">AÑO ACADEMICO</label>
                                                <div class="col-sm-5 form-inline">
                                                    <select id="cboAñoAcademico" class="form-control">
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="form-group" id="divNiveles">

                                            </div>

                                            <div class="form-group form-inline">
                                                <div class="col-sm-offset-4 col-sm-8">
                                                    <button class="btn btn-default" type="button" id="btnNivel">INGRESAR
                                                        <img src="${pageContext.request.contextPath}/images/OK.png" alt=""/>
                                                    </button>
                                                    <button class="btn btn-default" type="button" id="btnNivelCancelar">CANCELAR
                                                        <img src="${pageContext.request.contextPath}/images/Cancel.png" alt=""/>
                                                    </button>                                        
                                                </div>
                                            </div> 

                                        </form>
                                    </div>                                
                                </div>
                            </div>

                        </div>       <!-- fin de template -->   
                    </div>

                </div>
            </div>
        </div> 

        <div class="modal fade" id="pensionGrado" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">INGRESO POR GRADO</h4>                        
                    </div>
                    <div class="modal-body">

                        <form class="form-horizontal">
                            <div class="container">
                                <div id="divGrado" class="form-group">                        
                                </div>
                                <div class="form-group">                        
                                    <div class="col-sm-offset-3 col-sm-9">
                                        <button class="btn btn-default" type="button" id="btnGrado">INGRESAR</button></td>   
                                    </div>                                
                                </div>
                            </div>                                
                        </form>

                    </div>
                </div>
            </div>
        </div>   

        <div class="modal fade" id="pensionAlumno" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" id="btnCerrarVentana" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">BUSQUEDA DE ALUMNOS</h4>
                    </div>
                    <div class="modal-body">

                        <form class="form-horizontal container-fluid">

                            <div class="form-group">
                                <div class="col-sm-10">
                                    <input class="form-control" type="text" id="txtNombres" placeholder="Ingresar texto..." required />
                                </div>
                                <div class="col-sm-2">
                                    <button class="btn btn-default" id="btnBuscarINICIAL">Buscar</button>
                                    <button class="btn btn-default" id="btnBuscarPRIMARIA">Buscar</button>
                                    <button class="btn btn-default" id="btnBuscarSECUNDARIA">Buscar</button>
                                </div>
                            </div>

                            <div class="table table-responsive">
                                <table class="table table-condensed">
                                    <thead>
                                        <tr>
                                            <th>DNI</th>
                                            <th>ALUMNO</th>
                                            <th>PENSION</th>
                                            <th colspan="2"/>
                                        </tr>
                                    </thead>
                                    <tbody id="tblAlumnoPension">

                                    </tbody>
                                </table>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="pensionMesAlumno" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">INGRESO POR ALUMNO</h4>                        
                    </div>
                    <div class="modal-body">

                        <div class="table table-responsive">
                            <table  class="table table-condensed">
                                <thead>
                                    <tr>
                                        <th>MES</th>
                                        <th>PENSIÓN</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="tblPagosMes">

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div> 
    </jsp:body>

</t:headTemplate>
