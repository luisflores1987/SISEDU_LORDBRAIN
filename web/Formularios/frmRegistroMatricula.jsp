<%-- 
    Document   : frmRegistroMatricula
    Created on : 16/02/2016, 08:59:48 AM
    Author     : lflores
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
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
                        <span class="text-capitalize text-uppercase">REGISTRO DE MATRICULA</span>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="panel panel-default">
                        <div class="panel-body">

                            <div class="panel panel-default">
                                <div class="panel-body">

                                    <div class="container">
                                        <div class="panel panel-default col-lg-6 col-lg-offset-3">
                                            <div class="panel-heading">
                                                <div class="panel-title center-block">
                                                    <span class="lead">INGRESO DE MATRICULA</span>
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

                                                    <div class="form-group" id="divMatriculaNiveles">

                                                    </div>

                                                    <div class="form-group form-inline">
                                                        <div class="col-sm-offset-4 col-sm-8">
                                                            <button class="btn btn-default" type="button" id="btnMatriculaNivel">INGRESAR
                                                                <img src="${pageContext.request.contextPath}/images/OK.png" alt=""/>
                                                            </button>
                                                            <button class="btn btn-default" type="button" id="btnMatriculaNivelCancelar">CANCELAR
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
            </div>
        </div>           

        <div class="modal fade" id="pensionGradoMatricula" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">INGRESO POR GRADO</h4>                        
                    </div>
                    <div class="modal-body">
                        <span id="spanDescripcion" class="hide"></span>
                        <span id="spanCodigo" class="hide"></span>
                        <form class="form-horizontal">
                            <div class="container">
                                <div id="divMatriculaGrado" class="form-group">                        
                                </div>
                                <div class="form-group">                        
                                    <div class="col-sm-offset-3 col-sm-9">
                                        <button class="btn btn-default" type="button" id="btnMatriculaGrado">INGRESAR</button></td>   
                                    </div>                                
                                </div>
                            </div>                                
                        </form>

                    </div>
                </div>
            </div>
        </div> 

        <div class="modal fade" id="pensionAlumnoMatricula" role="dialog">
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
                                    <input class="form-control" type="text" id="txtMatriculaNombres" placeholder="Ingresar texto..." required />
                                </div>
                                <div class="col-sm-2">
                                    <button class="btn btn-default" id="btnMatriculaBuscarINICIAL">Buscar</button>
                                    <button class="btn btn-default" id="btnMatriculaBuscarPRIMARIA">Buscar</button>
                                    <button class="btn btn-default" id="btnMatriculaBuscarSECUNDARIA">Buscar</button>
                                </div>
                            </div>

                            <div class="table table-responsive">
                                <table class="table table-condensed">
                                    <thead>
                                        <tr>
                                            <th>DNI</th>
                                            <th>ALUMNO</th>
                                            <th>PENSION</th>
                                            <th/>
                                        </tr>
                                    </thead>
                                    <tbody id="tblMatriculaAlumnoPension">

                                    </tbody>
                                </table>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>                                                            


    </jsp:body>

</t:headTemplate>
