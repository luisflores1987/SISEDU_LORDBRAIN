<%-- 
    Document   : frmRegistroComportamiento
    Created on : 03/05/2016, 07:27:30 AM
    Author     : MAQ
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>

        <title>SISEDU</title>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="keywords" content="" />
        <meta name="description" content="" />

        <link href="${pageContext.request.contextPath}/css/default.css"  rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/css/menuDesplegable.css"  rel="stylesheet"/>         
        <script src="${pageContext.request.contextPath}/js/jquery.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/js/jquery.ui.draggable.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/js/jquery.alerts.js" type="text/javascript"></script>
        <link href="${pageContext.request.contextPath}/css/jquery.alerts.css" rel="stylesheet" type="text/css" media="screen" />           
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery-ui.css">
        <script src="${pageContext.request.contextPath}/js/jquery-1.10.2.js"></script>
        <script src="${pageContext.request.contextPath}/js/jquery-ui.js"></script>
        <script src="${pageContext.request.contextPath}/js/validate.js"></script>    
        <script src="${pageContext.request.contextPath}/js/cargarMenus2_Anterior.js"></script>
        <script type="text/javascript"src="${pageContext.request.contextPath}/js/general.js"></script>

        <!-- inicio Personalizados -->
        <script src="${pageContext.request.contextPath}/js/ingresoNotasComportamiento.js"></script>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/tablasRegistroNotas.css">
        <!-- fin Personalizados -->        
        <script  type = "text/javascript" >
            {
                if (history.forward(1)) {
                    location.replace(history.forward(1))
                }
            }
        </script>  
        <style type="text/css"> 



            #contenedor{ 
                /*background:#930; */
                padding:10px; 
                overflow:hidden; 
            } 

            #izquierda{ 
                float:left;    /*tambien puede poner float:right, para que se alineé a la derecha 
                padding:10px;  */
                width:300px; 
                margin:10px;
            } 

            #divIngresoRegistros{ 
                float:left;       /*tambien puede poner float:right, para que se alineé a la derecha 
                padding:10px; */
                width:300px; 
                margin:10px;
            } 

        </style>         
    </head>

    <body>
        <div id="header">
            <!--TRAER EL MENU DESDE JQUERY -->
        </div>
        <!--end header -->
        <div id="logo">
            <div id="logoTitulo" align ="left">
                <!--Aqui va el nombre de la page..-->
            </div>
            <div id ="logoUsuario" align="right">
                <table class="tblusuario" border="0">
                    <tbody>
                        <tr>
                            <td>
                                <h2><label class="Usuario bannertext" id ="txtUsuario">
                                        ${sessionScope.sNombreUsuario}
                                    </label></h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h2><label class="tipoAcceso" id ="lblAcceso">
                                        ${sessionScope.ntipoAcceso}
                                    </label></h2>
                            </td>
                        </tr> 
                        <tr>
                            <td>
                                <label class="tipoAcceso" id ="lblIdPersona">
                                    ${sessionScope.nIdUsuario}
                                </label>
                            </td>
                        </tr>                        
                    </tbody>
                </table>

            </div>
        </div>

        <!-- start page -->
        <div id="page">
            <!-- start content -->
            <div id="mostrarAlumnos" title="LISTADO DE ALUMNOS">
                <fieldset>
                    <span id="spIdProfesor" style="display:none"></span>
                    <label style="color: #000;font-weight: bold;">GRADO:&nbsp;&nbsp;&nbsp;</label>
                    <select  style="width: 10%" id="cboGradoNotas" name="Grado">
                    </select>                    
<!--                    <span id="spGradoNota" style="color: #000;text-transform: uppercase;"></span>-->
                    <br>
                    <span id="spIdCurso" style="display:none"></span>
                    <label style="color: #000;font-weight: bold;">CURSO:&nbsp;&nbsp;&nbsp;</label><span id="spCurso" style="color: #000;"></span>
                    <span id="spIdAlumno" style="display:none"></span>
                    <span id="spSeccion" style="display:none"></span>
                </fieldset>     
                <br>
                <br>
                <div class="TITLE-CONSULTAALUMNO">
                    <div id="divNotas">
                        <fieldset>
                            <table>
                                <tr><td><label>SELECCIONE EL BIMESTRE:</label></td></tr>
                                <tr><td><div style="clear: both;">&nbsp;</div></td></tr>
                                <tr>
                                    <td>
                                        <select  style="width: 100%" id="cboBimestre" name="bimestre">
                                        </select>
                                    </td>
                                </tr>
                            </table>
                            <div id="contenedor" style="margin: 0 auto;width: 80%;">
                                <div id="izquierda" style="width: 45%;float:left; ">
                                    <table  class="TABLE-CONSULTAALUMNONOTAS" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th> 
                                                    <label>ALUMNO </label>
                                                </th>                                                
                                            </tr>
                                        </thead>                          
                                        <tbody id="tblAlumnoNotas">
                                        </tbody>
                                    </table>
                                </div>
                                <div id="divIngresoRegistros" style="width: 47%;float:left; ">
                                    <span id ="nombreAlumno" style="font-size: 18px;"></span><span style="display: none;" id="idAlumno"></span>
                                    <table style="width: 100%;">
                                        <tr><td><label style="font-size: 16px;">Nota de Conducta</label></td></tr>
                                        <tr><td colspan="2"><input style="width: 10%;" class = "clsnotasSugerencia" type="text"/></td></tr>
                                        <tr><td><label style="font-size: 16px;">Sugerencias / Recomendaciones</label></td></tr>
                                        <tr><td colspan="2"><textarea id="txtSugerencia" cols="90" rows="5" style="width: 100%;resize: none;" ></textarea></td></tr> 
                                    </table>
                                    <table style="width: 50%;">
                                        <tr><td colspan="2"><label style="font-size: 16px;">Control de Asistencia</label></td></tr>
                                        <tr>
                                            <td style="width: 90%"><label>Tardanzas</label></td>
                                            <td><input style="width: 100%;" class = "clsTardanzas" type="text"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>Inasis. Justificadas</label></td>
                                            <td><input style="width: 100%;" class = "clsJustificadas" type="text"/></td>
                                        </tr>
                                        <tr>
                                            <td><label>Inasis. Injustificadas</label></td>
                                            <td><input style="width: 100%;" class = "clsInjustificadas" type="text"/></td>
                                        </tr>                                        
                                    </table>      
                                    <table style="width: 51%">
                                        <tr><td colspan="2" style="width: 80%;"><label style="font-size: 16px;">Participación PP.FF.</label></td>
                                            <td>
                                                <select id="cboParticipacion" name="cboParticipacion">
                                                    <option value="0"></option>
                                                </select>
                                            </td>
                                        </tr>                                    
                                    </table>                                       
                                    <table style="width: 50%; float:right;">
                                        <tr>
                                            <td colspan="5"></td>
                                            <td colspan="2">
                                                <button id="btnCancelar" type="submit" style="height: 30px;" class="classNotaAlumnoBoton">Cancelar</button>
                                            </td>
                                            <td colspan="2">
                                                <button id="btnIngresar" type="submit" style="height: 30px;" class="classNotaAlumnoBoton">Ingresar</button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>  
            <!-- end content -->
            <!-- start sidebar _right side--> 

            <!-- end sidebar -->
            <div style="clear: both;">&nbsp;</div>
        </div>
        <!-- end page -->
        <!-- start footer -->
        <div id="footer">
            ( c ) 2017. All Rights Reserved. Designed by  <a href="https://www.facebook.com/apiservi/" target="_blank">APISERVI SAC</a>.
        </div>
        <!-- end footer -->  
    </body>
</html>

