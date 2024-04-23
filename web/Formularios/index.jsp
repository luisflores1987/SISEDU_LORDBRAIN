<%-- 
    Document   : indexAlterno
    Created on : 28/12/2016, 04:35:05 PM
    Author     : MAQ
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>


    <head>
        <!------ Include the above in your HEAD tag ---------->    
        <script src="${pageContext.request.contextPath}/js/jquery-1.10.2.js"></script>
        <link href="${pageContext.request.contextPath}/resources/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <script src="${pageContext.request.contextPath}/resources/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="//use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">        
        <style>
            body{
                //background:url('https://www.wallpaperup.com/uploads/wallpapers/2013/02/08/37483/25884176faa59256617047fe3d2c59d2.jpg');
                background:url("<c:url value = '/resources/images/siseduFondo.jpg'/>");
                padding:50px;
            }

            #login-dp{
                min-width: 250px;
                padding: 14px 14px 0;
                overflow:hidden;
                background-color:rgba(255,255,255,.8);
            }
            #login-dp .help-block{
                font-size:12px    
            }
            #login-dp .bottom{
                background-color:rgba(255,255,255,.8);
                border-top:1px solid #ddd;
                clear:both;
                padding:14px;
            }
            #login-dp .social-buttons{
                margin:12px 0    
            }
            #login-dp .social-buttons a{
                width: 49%;
            }
            #login-dp .form-group {
                margin-bottom: 10px;
            }
            .btn-fb{
                color: #fff;
                background-color:#3b5998;
            }
            .btn-fb:hover{
                color: #fff;
                background-color:#496ebc 
            }
            .btn-tw{
                color: #fff;
                background-color:#55acee;
            }
            .btn-tw:hover{
                color: #fff;
                background-color:#59b5fa;
            }
            @media(max-width:768px){
                #login-dp{
                    background-color: inherit;
                    color: #fff;
                }
                #login-dp .bottom{
                    background-color: inherit;
                    border-top:0 none;
                }
            }

            #lblmensajeLogin{
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <script type="text/javascript">
            $(document).ready(function() {
                $("#lblmensajeLogin").on("click", function() {
                    window.location = "${pageContext.request.contextPath}/";
                })
            });
        </script>    
        <nav class="navbar navbar-default navbar-inverse" role="navigation">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">LORD BRAIN</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <c:set value="${sMensaje}" var="cadMensaje" scope="page"/>
                    <ul class="nav navbar-nav navbar-right"> 
                        <li>
                            <p class="navbar-text" style="color:red;" id="lblmensajeLogin">${cadMensaje.concat("    X")}</p>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b>INGRESAR</b> <span class="caret"></span></a>
                            <ul id="login-dp" class="dropdown-menu">
                                <li>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <!--                                            Login via
                                                                                        <div class="social-buttons">
                                                                                            <a href="#" class="btn btn-fb"><i class="fa fa-facebook"></i> Facebook</a>
                                                                                            <a href="#" class="btn btn-tw"><i class="fa fa-twitter"></i> Twitter</a>
                                                                                        </div>
                                                                                        or-->
                                            <div class="social-buttons">
                                                <img src="${pageContext.request.contextPath}/images/loginBootstrap.png" alt="LOGIN" class="img-responsive center-block">
                                            </div>
                                            <form class="form" role="form" action="${pageContext.request.contextPath}/Formularios/LoginServletController" method="post" accept-charset="UTF-8" id="login-nav">
                                                <div class="form-group">
                                                    <label class="sr-only" for="exampleInputEmail2">Usuario</label>
                                                    <input type="text" class="form-control" name="txtUsuario" placeholder="User" required>
                                                </div>
                                                <div class="form-group">
                                                    <label class="sr-only" for="exampleInputPassword2">Clave</label>
                                                    <input type="password" class="form-control" name="txtPassword" placeholder="Password" required>
<!--                                                    <div class="help-block text-right"><a href="">Olvido la contraseña?</a></div>-->
                                                </div>
                                                <div class="form-group">
                                                    <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
                                                </div>
<!--                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox"> Mantenerme Logeado
                                                    </label>
                                                </div>-->
                                            </form>
                                        </div>
<!--                                        <div class="bottom text-center">
                                            Nuevo aqui? <a href="#"><b>Unase</b></a>
                                        </div>-->
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <p class="lead">${cadMensaje}</p>
                    </div>
                </div>

            </div>
        </div>
    </body>
</html>
