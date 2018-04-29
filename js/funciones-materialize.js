$(document).ready(function(){ //Funcion al momento de recargar la página
    $("#checkbox2").click( function(){
        if( $(this).is(':checked') ){
            $("#otroSalario,#tituloOtroSalario,.salario").css("display","block"); 
            $(".salario").prop('disabled', true);
           //$('input#salario').attr('disabled','disabled');   
        }else{
            $("#otroSalario,#tituloOtroSalario,.salario").css("display","none");
        }
     });
     
});


