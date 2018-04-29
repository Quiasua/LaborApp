$(document).ready(function(){ //Funcion al momento de recargar la página
    $("#checkbox2").click( function(){
        if( $(this).is(':checked') ){
            $("#otroSalario,#tituloOtroSalario").css("display","block");
            $("select#salario").prop('disabled', true);
            $('select').material_select();   
        }else{
            $("#otroSalario,#tituloOtroSalario").css("display","none");
            $("select#salario").prop('disabled', false);
            $('select').material_select();
        }
     });
     
});


