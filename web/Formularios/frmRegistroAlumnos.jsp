<%-- 
    Document   : frmRegistroPersonas
    Created on : 26/01/2016, 08:59:30 AM
    Author     : lflores
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<!DOCTYPE html>
<t:headTemplate>
    <jsp:attribute name="extra_css">
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <%-- Inicio de jquery para calendario --%>  
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
                weekHeader: 'Sm', dateFormat: 'dd/mm/yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            };
            $.datepicker.setDefaults($.datepicker.regional['es']);
            $(function() {
                $("#txtFechaNacimiento").datepicker({
                    changeMonth: true,
                    changeYear: true,
                    showOn: "button",
                    buttonImage: "${pageContext.request.contextPath}/images/ico.png",
                    buttonImageOnly: true,
                    showButtonPanel: true
                });
            });

            $(function() {
                $("#txtFechaRegistro").datepicker({
                    changeMonth: true,
                    changeYear: true,
                    //showOn: "button",
                    //buttonImage: "${pageContext.request.contextPath}/images/ico.png",
                    buttonImageOnly: false,
                    showButtonPanel: true
                });
            });

        </script> 
        <style>
            .ui-datepicker-trigger img{
                height: 24px;
                width: 24px;
            }
        </style>
        <%-- fin de jquery para calendario --%>  

        <%-- Inicio de jquery para calendario--%>
    </jsp:attribute>
    <jsp:attribute name="footer">
        <p id="legal">( c ) 2024. All Rights Reserved. Designed by  <a href="https://www.facebook.com/apiservi" target="_blank">APISERVI SAC</a>.</p>
    </jsp:attribute>
    <jsp:body>
        <div id="header"></div>
        <!-- start page -->
        <div id="page">

            <form role="form">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div id="divbotonera" align ="right">

                            <table id="tblBotonera">
                                <tr>
                                    <td>
                                        <button id="btnIngresar" class="classRegAlumnoBoton btn btn-info btn-sm">
                                            <img src="${pageContext.request.contextPath}/images/OK.png" height="24" width="24" alt=""/>
                                            Ingresar
                                        </button>                                    
                                    </td>
                                    <td style="width: 1%;"/>
                                    <td>
                                        <button id="btnEditar"  class="classRegAlumnoBoton btn btn-info btn-sm">Editar
                                            <img src="${pageContext.request.contextPath}/images/Edit_page.png" alt="" height="24" width="24"/>
                                        </button>                                 
                                    </td>    
                                    <td style="width: 1%;"/>
                                    <td>
                                        <button id="btnCancelar" type="submit" class="classRegAlumnoBoton btn btn-info btn-sm">
                                            <img src="${pageContext.request.contextPath}/images/Cancel.png" height="24" width="24" alt=""/>
                                            Cancelar
                                        </button>  
                                    </td>
                                    <td style="width: 1%;"/>
                                    <td>
                                        <button id="imgIconDeleteAlumno" class="btn btn-info btn-sm" data-toggle="modal" data-target="#modalEliminar">
                                            <img title="Inhabilitar Alumno" height="24" width="24" src="${pageContext.request.contextPath}/images/disabledUserUltimo.png"/>                                    
                                            Inhabilitar Alumno
                                        </button>
                                        <button id="imgIconEnabledAlumno" class="btn btn-info btn-sm">
                                            <img title="Habilitar Alumno" height="24" width="24" src="${pageContext.request.contextPath}/images/EnabledUser.png"/>                                    
                                            Habilitar Alumno
                                        </button>
                                    </td>
                                    <td style="width: 1%;"/>
                                    <td>
                                        <button id="imgIconAlumno" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal">Buscar Alumno
                                            <img title="Buscar Alumno" height="24" width="24" src="${pageContext.request.contextPath}/images/icon_Search.png"/>
                                        </button>
                                    </td>
                                    <td style="width: 1%;"/>
                                    <td>
                                        <button id="imgIconNewAlumno" class="btn btn-info btn-sm">Agregar Alumno
                                            <img title="Agregar Alumno" height="24" width="24" src="${pageContext.request.contextPath}/images/icon_contact-new.png"/>  
                                        </button>
                                    </td>
                                </tr>
                            </table>

                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="panel panel-default">

                            <div class="panel-heading">
                                <h3 class="panel-title">DATOS DE ALUMNOS</h3>                                
                            </div>
                            <div class="panel-body">

                                <div align ="right">
                                    <table style="margin-left: 340px;">
                                        <tr>
                                        <label> ESTADO : </label><span id="spEstadoAlumno" name ="estado"></span>
                                        </tr>
                                    </table>
                                </div>

                                <div class="form-group">
                                    <label for="cboTipoMatricula">TIPO MATRICULA</label>
                                    <select id="cboTipoMatricula" name="Tipo Matricula" class="regAlumnoCbo form-control regSelect" tabindex="0">
                                    </select>
                                </div>

                                <div class="form-group">
                                    <span id="spIdPersona"></span>                                
                                    <label for="txtDni">DNI</label>
                                    <input id="txtDni" name="DNI:" type="text" class="classRegAlumno form-control" value="" tabindex="1" maxlength="8">                                          
                                </div>

                                <div class="form-group">
                                    <label for="txtApPaterno">APELLIDO PATERNO</label>
                                    <input id="txtApPaterno" name="APELLIDO PATERNO:" type="text" class="classRegAlumno form-control" value="" tabindex="2">                                    
                                </div>

                                <div class="form-group">
                                    <label for="txtApMaterno">APELLIDO MATERNO</label>
                                    <input id="txtApMaterno" name="APELLIDO MATERNO:" type="text" class="classRegAlumno form-control" value="" tabindex="3">
                                </div>

                                <div class="form-group">
                                    <label for="txtNombres">NOMBRES</label>
                                    <input id="txtNombres" name="NOMBRES:" type="text" class="classRegAlumno form-control" value="" tabindex="4">
                                </div>                                


                                <label for="txtFechaNacimiento">FECHA DE NACIMIENTO</label>       
                                <div class="form-group">
                                    <input type="text" name="FECHA DE NACIMIENTO:" id="txtFechaNacimiento" class="form-control txtMitad pull-left" tabindex="5">
                                </div>
                                <div style="clear: both;height: 10px;">&nbsp</div>
                                <div class="form-group">
                                    <label class="text-capitalize">SEXO</label>
                                    <div style="clear: both;height: 2px;">&nbsp</div>
                                    <div class="radio-inline">
                                        <label>
                                            <input type="radio" id="rbSexoM" class="radio" name="SEXO" tabindex="6" value="M" checked="checked" tabindex="6"/>MASCULINO
                                        </label>  
                                    </div>
                                    <div class="radio-inline">
                                        <label>
                                            <input type="radio" id="rbSexoF" class="radio" name="SEXO"  tabindex="7" value="F" tabindex="7"/>FEMENINO
                                        </label>  
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="cboNivel">NIVEL</label>                                    
                                    <select id="cboNivel" name="NIVEL" class="regAlumnoCbo form-control regSelect" tabindex="8">
                                    </select>
                                </div>

                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name = "chkRepite" value = "1" tabindex="9"/>¿REPITE EL GRADO?                                                
                                    </label>
                                </div>

                                <div class="form-group">
                                    <label for="cboGrado">GRADO</label>
                                    <select id="cboGrado" name="GRADO" class="regAlumnoCbo form-control regSelect" tabindex="10">
                                        <option selected="selected">
                                            Seleccione
                                        </option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="cboSeccion">SECCIÓN</label>
                                    <select id="cboSeccion" name="SECCION" class="regAlumnoCbo form-control regSelect" tabindex="11">
                                        <option selected="selected">
                                            Seleccione
                                        </option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="txtDireccionActual">DIRECCIÓN ACTUAL</label>
                                    <input type="text" name="Dirección Actual:" id="txtDireccionActual" class="classRegAlumno form-control" tabindex="12">
                                </div>
                                <div>
                                    <label for="cboProcedencia">PROCEDENCIA</label>
                                    <select id="cboProcedencia" name="PROCEDENCIA" class="regAlumnoCbo form-control regSelect" tabindex="13">
                                    </select>
                                    <input type="text" id ="txtOtroProc" class="classRegAlumnoProc form-control" name="Otro" value=""/>                                            
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3>DATOS DE APODERADO</h3>
                            </div>
                            <div class="panel-body">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h3 class="panel-title">PRINCIPAL</h3>                                
                                    </div>  
                                    <div class="panel-body">
                                        <div class="form-group">
                                            <label for="txtNombresAp">NOMBRE COMPLETO</label>
                                            <input id="txtNombresAp" name="NOMBRES APODERADO:" type="text" class="classRegAlumno form-control" value="" tabindex="14">
                                            <label style="font-size: 12px;color:red" id="lblMensajeApoderado" class="hidden-md"></label>
                                        </div>
                                        <div class="form-group">
                                            <label for="cboParentescoAp">PARENTESCO</label>
                                            <select id="cboParentescoAp" name="NIVEL" class="regAlumnoCbo form-control regSelect" tabindex="15">
                                            </select>
                                            <input type="text" id ="txtOtroAp" class="classRegAlumnoAp form-control" name="Otro" value=""/>
                                        </div>                                    

                                        <div class="form-group">
                                            <label for="txtTelefonoAp">TELEFÓNO/CELULAR</label>
                                            <input id="txtTelefonoAp" name="TELEFONO:" type="text" class="classRegAlumno form-control" value="" tabindex="16">
                                        </div>

                                        <div class="form-group">
                                            <label for="cboGradoInstruccionAp">GRADO/INSTRUCCIÓN</label>
                                            <select id="cboGradoInstruccionAp" name="GRADOINSTRUCCION" class="regAlumnoCbo form-control regSelect" tabindex="17">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h3 class="panel-title">ALTERNO</h3>                                
                                    </div>
                                    <div class="panel-body">
                                        <div class="form-group">
                                            <label for="txtNombresAa">NOMBRE COMPLETO</label>
                                            <input id="txtNombresAa" name="NOMBRES APODERADO ALTERNO:" type="text" value="" class="classRegAlumnoAlternativo form-control" tabindex="18">
                                        </div>
                                        <div class="form-group">                                    
                                            <label for="cboParentescoAa">PARENTESCO</label>
                                            <select id="cboParentescoAa" name="PARENTESCO" tabindex="19" class="classRegAlumnoAlternativo regAlumnoCboAA form-control regSelect">
                                            </select>
                                            <input type="text" id ="txtOtroAa"  class="form-control" name="Otro" value=""/>                                                        
                                        </div>
                                        <div class="form-group">
                                            <label for="txtTelefonoAa">TELEFÓNO/CELULAR</label>
                                            <input id="txtTelefonoAa" name="TELEFONO:" class="classRegAlumnoAlternativo form-control" type="text" value="" tabindex="20">                                         
                                        </div>                                                                        
                                        <div class="form-group">
                                            <label for="cboGradoInstruccionAa">GRADO/INSTRUCCIÓN</label>
                                            <select id="cboGradoInstruccionAa" class="classRegAlumnoAlternativo regAlumnoCboAA form-control regSelect" name="GRADOINSTRUCCION" tabindex="21">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="divDocumentos" class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">DOCUMENTOS</h3>
                            </div>
                            <div class="panel-body">                     
                                <ul id="liDocumentos">

                                </ul>
                            </div>
                        </div> 
                    </div>
                </div>
            </form>
        </div>        
        <div class="modal fade" id="myModal" role="dialog">
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
                                <button id="btnBuscar" type="submit" class="btn btn-default">Buscar</button>                
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
                                            <th>AÑO</th>                      
                                        </tr>
                                    </thead>
                                    <tbody id="tblAlumnos">

                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>  
        <!-- end popup -->   

        <!-- start popup Consulta Alumno  -->     
        <div class="modal fade" id="modalEliminar" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" id="btnCerrarVentana" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">INHABILITAR ALUMNO</h4>
                    </div>
                    <div class="modal-body">
                        <form role="form">
                            <div class="form-group">
                                <input type="text" id="txtFechaRegistro" name ="Fecha" value="" class="form-control" placeholder="Ingrese fecha de retiro de alumno ..." required/>
                                <button id="btnInhabilitar" class="btn btn-default">
                                    <img src="${pageContext.request.contextPath}/images/OK.png" alt=""/>
                                    OK
                                </button>                      

                                <button id="btnCancelarInhabilitar" class="btn btn-default">
                                    <img src="${pageContext.request.contextPath}/images/Cancel.png" alt=""/>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>          

        <div id="habilitarAlumno" title="Ingresar fecha " style="background: #1F0303; margin: 0 auto;">
            <table style="width: 95%">
                <tr>
                    <td> 
                        <input style="font-family: ''Trebuchet MS'', Arial, Helvetica, sans-serif;font-size: 13px;color: #333333;background: rgb(255, 255, 170);width: 300px;" type="text" id="txtFechaRegistro" name ="Fecha" value="" placeholder="Ingrese fecha de retiro de alumno ..." required style="height: 10px;"/>
                    </td>
                    <td>
                        <button id="btnhabilitar" style="height: 23px;padding-bottom: 4px;padding-top: 3px;">
                            <img src="${pageContext.request.contextPath}/images/OK.png" alt=""/>
                            OK
                        </button>                      
                    </td>
                    <td>
                        <button id="btnCancelarhabilitar" style="height: 23px;padding-bottom: 4px;padding-top: 3px;">
                            <img src="${pageContext.request.contextPath}/images/Cancel.png" alt=""/>
                            Cancelar
                        </button> 
                    </td>
                </tr>
            </table>
        </div>            
        <script type="text/javascript"src="${pageContext.request.contextPath}/js/general.js"></script>
    </jsp:body>
</t:headTemplate>
