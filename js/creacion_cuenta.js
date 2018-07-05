$(document).ready(function () {
    $(function () {
        moment.locale('es');

        jQuery.validator.addMethod("dateWithMoment", function (value, element) {
            // allow any non-whitespace characters as the host part
            return this.optional(element) || moment(value, "DD/MM/YYYY", true).isValid();
        }, 'Please enter a valid date with moment.');
        var fechaActual = new Date();
        fechaActual.setFullYear(fechaActual.getFullYear()-18);
        $('.datepicker').pickadate({
            editable: true,
            selectMonths: true,
            selectYears: 100,
            firstDay: true,
            closeOnSelect: true,
            today: false,
            clear: false,
            close: 'Seleccionar',
            format: 'dd/mm/yyyy',
            max: fechaActual,
            // pour fermer le datepicker quand on sélectionne une date
            onSet: function (ele) {
                if (ele.select) {
                    //this.close();
                }
            }
        }).dblclick(function () {
            $(this).pickadate('picker').set(moment.now());
        });

        $('.trigger-datepicker').click(function (event) {
            event.stopPropagation();
            var $datepicker = $(this).parent().parent().find('.datepicker');
            var picker = $datepicker.pickadate('picker');
            picker.open();
        });

        $('#formulaireDate').validate();
    });

    $("#campo").addClass("ocultar");
    $("#campo1").addClass("ocultar");
    $("#mensaje").addClass("ocultar");
    $("#valFecha").addClass("ocultar");
    var nombre;
    var expr = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $("#siguiente").click(function () {
        if ($("#Nombre").val() != "" && $("#Apellido").val() != "") {
            window.location.href = "fecha.html?nombre=" + $("#Nombre").val() + "&apellido=" + $("#Apellido").val();
        } else {
            if ($("#Nombre").val() == "") {
                $("#Nombre").css({
                    "border-bottom": "1px solid #F44336"
                });
                $("#campo").removeClass("ocultar");
            } else {
                $("#campo").addClass("ocultar");
                $("#Nombre").css({
                    "border-bottom": "1px solid #26a29a"
                });
            }
            if ($("#Apellido").val() == "") {
                $("#Apellido").css({
                    "border-bottom": "1px solid #F44336"
                })
                $("#campo1").removeClass("ocultar");
            } else {
                $("#campo1").addClass("ocultar");
                $("#Apellido").css({
                    "border-bottom": "1px solid #26a29a"
                });
            }
        }

    });

    $("#siguiente2").click(function () {
        if ($("#fecha").val() != "") {
            var link = document.URL;
            var url = new URL(link);
            var nombre = url.searchParams.get("nombre");
            var apellido = url.searchParams.get("apellido");
            window.location.href = "correo.html?fecha=" + $("#fecha").val() + "&nombre=" + nombre + "&apellido=" + apellido;

        } else {

        }

    });

    var server = "192.168.1.23";
    $("#siguiente3").click(function () {
        var validarCorreo = $("#correo").val();       
        var espacioCorreo =  validarCorreo.split("@");
        var puntoCorreo =  validarCorreo.split(".com");
        if ($("#contrase").val() != "" && $("#correo").val() != "" ) {          
          if(espacioCorreo.length >= 2)  {
              if(puntoCorreo.length>=2){
                var cliente = {
                    'nombre': '',
                    'apellido': '',
                    'fechaNacimiento': ''
                }                
                var usuario = {
                    'descripcion': 'Se realiza el registro',
                    'usuario': $("#correo").val(),
                    'contrasena': $("#contrase").val(),
                    'idPersona':0
                }
                var urlSer = "http://"+server+":8080/laborapp/api/legalapp/registrarUsuario";
                var url_persona = "http://"+server+":8080/laborapp/api/legalapp/registrarPersona";
                var link = document.URL;
                var urls = new URL(link);
                var nombre = urls.searchParams.get("nombre");
                var apellido = urls.searchParams.get("apellido");
                var fecha = urls.searchParams.get("fecha");
                cliente.nombre = nombre;
                cliente.apellido = apellido;
                var fechaEnviar = fecha.split("/");
                cliente.fechaNacimiento = fechaEnviar[0]+""+fechaEnviar[1]+""+fechaEnviar[2];
                $("#campo").addClass("ocultar");
                $("#campo1").addClass("ocultar");
                console.log(JSON.stringify(usuario));
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
                        usuario.idPersona = data;
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
                    }
                })
              }else{
                Materialize.toast('Su correo debe .com', 4000)
              }
            
            }else{
            Materialize.toast('Su correo debe contener @', 4000)
          }      
            
        } else {
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
            }
        }
    });

    function login() {
        window.location.href = "login.html";
    }


    $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        ready: function () { alert('Ready'); }, // Callback for Modal open
        complete: function () { alert('Closed'); } // Callback for Modal close
    }
    );

    function getAllUrlParams(url) {

        // get query string from url (optional) or window
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

        // we'll store the parameters here
        var obj = {};

        // if query string exists
        if (queryString) {

            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];

            // split our query string into its component parts
            var arr = queryString.split('&');

            for (var i = 0; i < arr.length; i++) {
                // separate the keys and the values
                var a = arr[i].split('=');

                // in case params look like: list[]=thing1&list[]=thing2
                var paramNum = undefined;
                var paramName = a[0].replace(/\[\d*\]/, function (v) {
                    paramNum = v.slice(1, -1);
                    return '';
                });

                // set parameter value (use 'true' if empty)
                var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                // (optional) keep case consistent
                paramName = paramName.toLowerCase();
                paramValue = paramValue.toLowerCase();

                // if parameter name already exists
                if (obj[paramName]) {
                    // convert value to array (if still string)
                    if (typeof obj[paramName] === 'string') {
                        obj[paramName] = [obj[paramName]];
                    }
                    // if no array index number specified...
                    if (typeof paramNum === 'undefined') {
                        // put the value on the end of the array
                        obj[paramName].push(paramValue);
                    }
                    // if array index number specified...
                    else {
                        // put the value at that index number
                        obj[paramName][paramNum] = paramValue;
                    }
                }
                // if param name doesn't exist yet, set it
                else {
                    obj[paramName] = paramValue;
                }
            }
        }

        return obj;
    }
})