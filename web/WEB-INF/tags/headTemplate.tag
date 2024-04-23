<%@tag description="Base page" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@attribute name="extra_css" fragment="true" %>
<%@attribute name="footer" fragment="true" %>
<%@attribute name="header" fragment="true" %>

<html>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <head>
        <!--        bootstrap-->
        <script src="<c:url value = '/js/jquery-1.10.2.js'/>"></script>
        <link href="${pageContext.request.contextPath}/resources/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="${pageContext.request.contextPath}/resources/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="//use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
        <!--    fin     bootstrap-->        

        <!--        cargar los menus-->
        <script src="${pageContext.request.contextPath}/js/cargarMenus2.js"></script>
        <script  type = "text/javascript" >
            {
                if (history.forward(1)) {
                    location.replace(history.forward(1))
                }
            }
        </script>
        <!--        fin cargar los menus-->        


        <link href="${pageContext.request.contextPath}/css/jquery-ui.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/css/jquery.alerts.css" rel="stylesheet" type="text/css" media="screen" />   
        <link href="${pageContext.request.contextPath}/css/tooltiptext.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="${pageContext.request.contextPath}/css/loading.css" rel="stylesheet" type="text/css">    


        <script src="${pageContext.request.contextPath}/js/jquery.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/js/jquery.ui.draggable.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/js/jquery.alerts.js" type="text/javascript"></script>
        <script src="${pageContext.request.contextPath}/js/jquery.alertsImpresion.js" type="text/javascript"></script>        
        <script src="<c:url value = '/js/jquery-1.10.2.js'/>"></script>
        <script src="${pageContext.request.contextPath}/js/jquery-ui.js"></script>  
        <script src="${pageContext.request.contextPath}/js/validate.js"></script>    
        <script src="<c:url value = '/resources/js/exportarExcel.js'/>"></script>
        <script src="<c:url value = '/resources/js/datosGenerales.js'/>"></script>

        <!-- personalizados-->

        <script src="${pageContext.request.contextPath}/js/registroAlumnos.js"></script>  
        <script src="${pageContext.request.contextPath}/js/registroPagos.js"></script>   
        <script src="${pageContext.request.contextPath}/js/consultaDeudas.js"></script> 
        <script src="${pageContext.request.contextPath}/js/registroPensiones.js"></script>            
        <script src="${pageContext.request.contextPath}/js/registroMatricula.js"></script>   
        <script src="${pageContext.request.contextPath}/js/obtenerReporte.js"></script>        

        <!-- fin - personalizados-->
        <style>
            body{
                background:url("<c:url value = '/resources/images/siseduFondo.jpg'/>");
                //padding:50px;
                padding-top: 70px; 
            }
        </style> 

        <link href="<c:url value='/resources/css/formatoComponentes.css'/>" rel="stylesheet"/>

        <jsp:invoke fragment="extra_css"/>
        <jsp:invoke fragment="header"/>
        <jsp:doBody/>
        <!-- TEMPLATE DE PANEL 
        
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
                            
                        </div>                
                    </div>
                </div>
            </div>
        </div>        
        
        -->
        <jsp:invoke fragment="footer"/>
</html>