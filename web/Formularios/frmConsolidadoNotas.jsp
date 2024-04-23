<%-- any content can be specified here e.g.: --%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.sisedu.model.bean.Area"%>
<%@page import="java.util.List"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%-- 
    Document   : frmConsolidadoNotas
    Created on : 12/04/2016, 01:59:24 PM
    Author     : MAQ
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>

        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <title>SISEDU</title>
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
        <script src="${pageContext.request.contextPath}/js/ingresoNotasProfesor.js"></script>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/tablasRegistroNotas.css">
        <script src="${pageContext.request.contextPath}/js/consolidadoNotas.js"></script>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/loading.css">        
        <!-- fin Personalizados -->        
        <script  type = "text/javascript" >
            {
                if (history.forward(1)) {
                    location.replace(history.forward(1))
                }
            }
        </script> 
        <script>
            function mostrarTablas() {
                $('#mostrarConsolidado').css("display","display");
            }
        </script>
        <%
            List listaArea = request.getAttribute("lstArea") != null ? (ArrayList) request.getAttribute("lstArea") : null;
            int tamanio = listaArea == null ? 0 : listaArea.size();
            String idGrado = request.getAttribute("nIdGrado") == null ? "0" : String.valueOf(request.getAttribute("nIdGrado"));
            String idBimestre = request.getAttribute("nIdBimestre") == null ? "0" : String.valueOf(request.getAttribute("nIdBimestre"));
        %>

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
                                    </label>
                                </h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h2><label class="tipoAcceso" id ="lblAcceso">
                                        ${sessionScope.ntipoAcceso}
                                    </label>
                                </h2>
                            </td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>

        <!-- start page -->
        <div id="page">
            <!-- start content -->
            <!--            <div align="center">
                            <img src="../images/32_32_Warning.png" alt="Icono de Alerta" /> <h3><label style="text-transform:uppercase">Para visualizar el consolidado anual. Seleccioné el grado y en bimestre, la opción TOTAL</label></h3>
                        </div>-->
            <br>
            <br> 

            <form action="obtenerConsolidadoNotasServletController?action=obtenerVisorConsolidadoNotas" method="POST">
                <table>
                    <tr>
                        <td>
                            <label class="desc " id="title4">
                                GRADO
                            </label>
                        </td>
                        <td>
                            <select id="cboGrado" name="IdGrado">
                                <option selected="selected">
                                    Seleccione
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label>BIMESTRE:</label></td>
                        <td>
                            <select  style="width: 100%" id="cboBimestre" name="IdBimestre">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>

                            <!--                            <button type="submit" style="height: 30px;" onclick="mostrarTablas()">Buscar</button>-->
                        </td>
                    </tr>
                </table>
            </form>
            <button id="btnExportarBuscarPagosAlumno" type="submit" style="height: 30px;">Exportar Excel
                <img title="Exportar Excel" src="${pageContext.request.contextPath}/images/icon_excel.png"/>  
            </button>
            <!-- end content -->
            <div style="clear: both;">&nbsp;</div>
        </div>
        <!-- end page -->
        <!-- start footer -->
        <div id="footer">
            ( c ) 2017. All Rights Reserved. Designed by  <a href="https://www.facebook.com/apiservi/" target="_blank">APISERVI SAC</a>.
        </div>
        <!-- end footer --> 
        <div class='modal'></div>
    </body>
</html>
