$(document).ready(function(){ //Funcion al momento de recargar la página
    $("#checkbox2").click( function(){ //Funcion clic 
        if( $(this).is(':checked') ){ //Validador el checkbox
            $("#otroSalario,#tituloOtroSalario").css("display","block"); //Aparece el input de otro salario
            $("select#salario").prop('disabled', true); //Deshabilita el select
            $('select').material_select();   //Para materialize
        }else{
            $("#otroSalario,#tituloOtroSalario").css("display","none");//desaparece el input de otro salario
            $("select#salario").prop('disabled', false);//Habilita el select
            $('select').material_select();//Para materialize
        }
    });
     
});


