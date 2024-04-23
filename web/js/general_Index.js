$(document).ready(function(){
    fnObtenerEmpresa();
})

function fnObtenerEmpresa(){
    $.ajax({
        url : "obtenerNuevosRegistrosGeneralIndex",
        data:{
            action:"colocarEmpresa"
        }
    })
    .done(function (data, status, jqXhr) {
        empresa = data;  
        limparselect();                
        if (data=='') {
            $('#empresa').text(''); 
        }
        else{
            $('#empresa').text(empresa);          
        } 
    });
    function limparselect(){
        $('#empresa').text('');
    }        
}