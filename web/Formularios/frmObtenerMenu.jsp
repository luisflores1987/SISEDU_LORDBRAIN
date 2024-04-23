<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<script type="text/javascript"src="${pageContext.request.contextPath}/js/general.js"></script>
<script type="text/javascript"src="${pageContext.request.contextPath}/js/general_Index.js"></script>
<div class="menunav">
    <ul class="nav">
<!--        <li><a href="${pageContext.request.contextPath}/LoginServletController">INICIO</a></li>  -->
        <c:forEach var="menu" items="${listaAccesoMenu}">
            <c:if test="${menu.nivelMenu == 'PADRE'}">
                <li><a href="${pageContext.request.contextPath}${menu.listaMenu.getsFormulario()}">${menu.listaMenu.getsDescripcion()}</a>
                    <ul class="navSubMenu">
                        <div style="border-width: 1px 1px 1px 1px;border-style: solid;border-color: #308BFF;border-radius: 10px;">
                            <c:forEach var="menuHijo" items="${listaAccesoMenu}">                            
                                <c:if test="${menuHijo.nivelMenu == 'HIJO'}">
                                    <c:if test="${menu.listaMenu.getnIdListaMenu() == menuHijo.listaMenu.getListaMenu().getnIdListaMenu()}">
                                        <li><a id="${menuHijo.listaMenu.getListaMenu().getnIdListaMenu()}" href="${pageContext.request.contextPath}${menuHijo.listaMenu.getsFormulario()}">${menuHijo.listaMenu.getsDescripcion()}</a></li>
                                        </c:if>    
                                    </c:if>
                            </c:forEach>
                        </div>
                    </ul>
                </li>
            </c:if>
        </c:forEach>
        <li><a id ="logout" href="${pageContext.request.contextPath}/Formularios/LoginServletController?action=logout">SALIR</a></li>
    </ul>
</div>
<div style="text-align: center;">
    <!--    <table style="width: 100%;height: 100%;">
            <tr>
                <td style="vertical-align: middle;">
                    <label id="empresa" style="color: #000000b3;font-size: 28px;text-shadow: 0 0 10px rgba(0,0,0,0.3); letter-spacing:1px;"></label>
                </td>
            </tr>
            <img src="${pageContext.request.contextPath}/images/logoSiseduGeneralIzq.png" alt=""/>
        </table>-->
</div>   

