$(document).ready(function () {
    $(".datepicker").pickadate({
      closeOnSelect: true,
      format: "dd/mm/yyyy",
      close: 'Seleccionar',
      today: false,
      clear: false,
    });

    $('#siguiente3').click(function(){
    //Prescripcion    
        var f = new Date();
        var dia = f.getDate();
        var mes =(f.getMonth() +1) ;
        var anio = f.getFullYear();
        var fechafin = $("#fechaFinal").val();
        var arregloFecha  = fechafin.split('/');
        var diafin = parseInt(arregloFecha[0]);
        var mesfin = parseInt(arregloFecha[1]);
        var aniofin = parseInt(arregloFecha[2])+3;
    
        if(aniofin >= anio){
           if(mesfin >= mes){
                }if(diafin>= dia){
                    window.location.href = "correo.html";
                }else{
                    window.location.href = "abogado.html";
                }
        } 
     
     
        var salario = $("#otroSalario").val();
      console.log(salario,"salario")
      var cuantia = 781242 * 20;
      console.log(cuantia,"cuenta")
      if(salario >= cuantia){
        window.location.href = "abogado.html";
      }
      
     

      
      
    })
  
  
  });   

    