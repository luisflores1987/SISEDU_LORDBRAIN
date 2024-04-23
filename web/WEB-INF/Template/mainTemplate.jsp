<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<nav class="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="http://colegiolordbrain.edu.pe/" target="_target">LORD BRAIN</a>
            <a id ="logout" href="${pageContext.request.contextPath}/Formularios/LoginServletController">
                <img src="${pageContext.request.contextPath}/resources/images/home_128_128_white.png" height="48" width="48" alt="Home">
            </a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <c:forEach var="menuPadre" items="${listaAccesoMenu}">
                    <c:if test="${menuPadre.nivelMenu == 'PADRE'}">
                        <li class="dropdown">
                            <a href="${pageContext.request.contextPath}${menuPadre.listaMenu.getsFormulario()}" 
                               class="dropdown-toggle" data-toggle="dropdown">
                                ${menuPadre.listaMenu.getsDescripcion()}
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <c:forEach var="menuHijo" items="${listaAccesoMenu}">
                                    <c:if test="${menuHijo.nivelMenu == 'HIJO'}">
                                        <c:if test="${menuPadre.listaMenu.getnIdListaMenu() == menuHijo.listaMenu.getListaMenu().getnIdListaMenu()}">                                            
                                            <li>
                                                <a id="${menuHijo.listaMenu.getListaMenu().getnIdListaMenu()}" href="${pageContext.request.contextPath}${menuHijo.listaMenu.getsFormulario()}">${menuHijo.listaMenu.getsDescripcion()}</a>
                                            </li>                                            
                                        </c:if>
                                    </c:if>
                                </c:forEach>                            
                            </ul>
                        </li>
                    </c:if>
                </c:forEach>

            </ul>
            <c:set value="${sMensaje}" var="cadMensaje" scope="session"/>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#">${"Usuario :".concat("  ").concat(sessionScope.sNombreUsuario)}</a></li>
                <li class="hidden"><a href="#"><label id="txtUsuario">${sessionScope.sNombreUsuario}</label></a></li>                
                <li class="hidden"><a href="#"><label id="lblAcceso">${sessionScope.ntipoAcceso}</label></a></li>
                <li><a id ="logout" href="${pageContext.request.contextPath}/Formularios/LoginServletController?action=logout">
                        <img src="${pageContext.request.contextPath}/images/logout_3232.png" height="24" width="24" alt="logout">&nbsp Salir
                    </a>
                </li>
            </ul>                  
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

