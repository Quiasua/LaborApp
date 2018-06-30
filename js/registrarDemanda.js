 //ESTA PARTE DEL SCRIPT ES PARA REGISTRAR LA PERSONA JURIDICA A LA QUE SE LE VA HACER LA DEMANADA 
 $(document).ready(function () {
 var server = "localhost";
 $("#validarRegistro").click(function () {
     if ($("#tipoper").val() == "1") {
         registrarPersonaN();
     } else {
         registrarPersonaJ();
     }
 });

 function registrarPersonaN() {
     Materialize.toast('Es natural', 4000)
     var validarCorreo = $("#emailN").val();
     var espacioCorreo = validarCorreo.split("@");
     var puntoCorreo = validarCorreo.split(".com");
     if ($("#emailN").val() != "") {
         if (espacioCorreo.length >= 2) {
             if (puntoCorreo.length >= 2) {
                 var cliente = {
                     'nombre': '',
                     'apellido': '',
                     'numeroTelefono': '',
                     'dirreccion': '',
                     'correo': '',
                     'numeroIdentificacion': '',
                     'ciudadDomicilio': '',
                     'tipoInden': '',
                 }
                 var url_persona = "http://" + server + ":8080/laborapp/api/legalapp/registrarPersona";
                 var link = document.URL;
                 var urls = new URL(link);
                 var nombre = $("#nombreN").val();
                 cliente.nombre = $("#nombreN").val();
                 cliente.apellido = $("#apellidoN").val();
                 cliente.tipoInden = $("#tip-idenN").val();
                 cliente.ciudadDomicilio = $("#deparN").val();
                 cliente.numeroIdentificacion = $("#idenN").val();
                 $("#munN").val();
                 cliente.dirreccion = $("#direccionN").val();
                 cliente.numeroTelefono = $("#telefonoN").val();
                 cliente.correo = $("#emailN").val();
                 cliente.tipoInden = "D"          
                 console.log(JSON.stringify(cliente));
                 $.ajax({
                     url: url_persona,
                     type: 'POST',
                     dataType: 'json',
                     data: JSON.stringify(cliente),
                     contentType: 'application/json',
                     beforeSend: function (request) {
                         request.setRequestHeader("Authorization", "Admin");
                     },
                     success: function (data) {
                         console.log(data);
                         Materialize.toast('Se realizo el registro', 4000)
                         setTimeout(function () {
                             window.location.href = "demanda.html";
                         }, 1000);
                         // $('#modal1').openModal();
                     }
                 })
             } else {
                 Materialize.toast('Su correo debe .com', 4000)
             }

         } else {
             Materialize.toast('Su correo debe contener @', 4000)
         }

     } else {
         /*
         if ($("#contrase").val() == "") {
             $("#contrase").css({
                 "border-bottom": "1px solid #F44336"
             });
             $("#campo").removeClass("ocultar");
         } else {
             $("#campo").addClass("ocultar");
             $("#contrase").css({
                 "border-bottom": "1px solid #26a29a"
             });
         }
         if ($("#correo").val() == "") {
             $("#correo").css({
                 "border-bottom": "1px solid #F44336"
             })
             $("#campo1").removeClass("ocultar");
         } else {
             $("#campo1").addClass("ocultar");
             $("#correo").css({
                 "border-bottom": "1px solid #26a29a"
             });
         }*/
     }
 };

 

 function registrarPersonaJ() {
     Materialize.toast('Es juridica', 4000)
     var validarCorreo = $("#correo").val();
     var espacioCorreo = validarCorreo.split("@");
     var puntoCorreo = validarCorreo.split(".com");
     if ($("#contrase").val() != "" && $("#correo").val() != "") {
         if (espacioCorreo.length >= 2) {
             if (puntoCorreo.length >= 2) {
                 var cliente = {
                     'nombre': '',
                     'apellido': '',
                     'fechaNacimiento': ''
                 }
                 var url_persona = "http://" + server + ":8080/laborapp/api/legalapp/registrarPersona";
                 var link = document.URL;
                 var urls = new URL(link);
                 var nombre = urls.searchParams.get("nombre");
                 var apellido = urls.searchParams.get("apellido");
                 var fecha = urls.searchParams.get("fecha");
                 cliente.nombre = nombre;
                 cliente.apellido = apellido;
                 var fechaEnviar = fecha.split("/");
                 cliente.fechaNacimiento = fechaEnviar[0] + "" + fechaEnviar[1] + "" + fechaEnviar[2];
                 $("#campo").addClass("ocultar");
                 $("#campo1").addClass("ocultar");
                 console.log(JSON.stringify(usuario));
                 $.ajax({
                     url: urlSer,
                     type: 'POST',
                     dataType: 'json',
                     data: JSON.stringify(usuario),
                     contentType: 'application/json',
                     beforeSend: function (request) {
                         request.setRequestHeader("Authorization", "Admin");
                     },
                     success: function (data) {
                         console.log(data);
                         Materialize.toast('Se realizo el registro', 4000)
                         setTimeout(function () {
                             login();
                         }, 1000);
                         // $('#modal1').openModal();
                     }
                 })
             } else {
                 Materialize.toast('Su correo debe .com', 4000)
             }

         } else {
             Materialize.toast('Su correo debe contener @', 4000)
         }

     } else {
         /*
         if ($("#contrase").val() == "") {
             $("#contrase").css({
                 "border-bottom": "1px solid #F44336"
             });
             $("#campo").removeClass("ocultar");
         } else {
             $("#campo").addClass("ocultar");
             $("#contrase").css({
                 "border-bottom": "1px solid #26a29a"
             });
         }
         if ($("#correo").val() == "") {
             $("#correo").css({
                 "border-bottom": "1px solid #F44336"
             })
             $("#campo1").removeClass("ocultar");
         } else {
             $("#campo1").addClass("ocultar");
             $("#correo").css({
                 "border-bottom": "1px solid #26a29a"
             });
         }*/
     }
 };

 $("#registrarDemanda").click(function () {
  window.location.href = "generar_demanda.html";
});

 

});