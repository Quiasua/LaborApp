$(document).ready(function(){ //Funcion al momento de recargar la página
    $("#checkbox2").click( function(){
        if( $(this).is(':checked') ){
            $("#otroSalario,#tituloOtroSalario").css("display","block"); 
           // $("input,#select-salario").prop('disabled', true);
           $('select#salario').attr('disabled','disabled');   
        }
     });
     
});


