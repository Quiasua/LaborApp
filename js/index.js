

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


$(document).ready(function () {
    localStorage.lastname;
    //localStorage.clear();
    localStorage.lastname;
    $("#enviarcorreo").click(function () {
        var link = document.URL;
        var urls = new URL(link);
        var server = "192.168.1.23";
        var url_persona = "http://" + server + ":8080/laborapp/api/legalapp/envioCorreo";
        var url_consulta = "http://" + server + ":8080/laborapp/api/legalapp/consultarUsuarioId";
        var nombre = localStorage.lastname;;
        var id = Number(nombre);
        var num = Number($("#telefono").val());
        var enviar = {
            idPersona: id,
            correo: $("#correo").val(),
            dirreccion: $("#textarea1").val(),
            numeroTelefono: $("#telefono").val(),
            ciudadDomicilio: $("#ciudad").val()
        }
        var consulta = {
            filtroId: id
        }
        var user = {};
        $.ajax({
            url: url_consulta,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(consulta),
            contentType: 'application/json',
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Admin");
            },
            success: function (data) {
                user = data;
                console.log(data);
                if (user.correo == null) {
                    $.ajax({
                        url: url_persona,
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(enviar),
                        contentType: 'application/json',
                        beforeSend: function (request) {
                            request.setRequestHeader("Authorization", "Admin");
                        },
                        success: function (data) {
                            console.log(data);
                            $("#telefono").attr("");
                            $("#textarea1").attr("");
                            Materialize.toast('En un momento uno de nuestros acesores de Legalapp se contáctara con usted', 3000)
                            setTimeout(function () {
                                window.location.href = "main.html";
                            }, 3000);
                        }
                    })
                } else {
                    Materialize.toast('Usted ya tiene una solicitud, en un momento nos comunicaremos con usted', 4000)
                }
                console.log(data);
            }
        })
    });


    function enviarCorreos(id) {

    }

    $("#contactar").click(function () {
        var link = document.URL;
        var urls = new URL(link);
        var id = localStorage.lastname;;
        window.location.href = "abogado.html"

    });


    // SIDEBAR
    var link = document.URL;
    var urls = new URL(link);
    var usuario = localStorage.lastname;;
    var server = "192.168.1.23";
    var url_persona = "http://" + server + ":8080/laborapp/api/legalapp/consultarPersona";
    var filtroPersona = {
        filtroId: 0
    }
    var id = Number(usuario);
    filtroPersona.filtroId = id;
    $.ajax({
        url: url_persona,
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(filtroPersona),
        contentType: 'application/json',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", "Admin");
        },
        success: function (data) {
            if (data.foto != null) {
                $('#imagen').attr('src', `data:image/jpg;base64,${data.foto}`);
            } else {
                $('#imagen').attr('src', `data:image/jpg;base64,${"iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAgMAAACJFjxpAAAADFBMVEXFxcX////p6enW1tbAmiBwAAAFiElEQVR4AezAgQAAAACAoP2pF6kAAAAAAAAAAAAAAIDbu2MkvY0jiuMWWQoUmI50BB+BgRTpCAz4G6C8CJDrC3AEXGKPoMTlYA/gAJfwETawI8cuBs5Nk2KtvfiLW+gLfK9m+r3X82G653+JP/zjF8afP1S//y+An4/i51//AsB4aH+/QPD6EQAY/zwZwN8BAP50bh786KP4+VT+3fs4/noigEc+jnHeJrzxX+NWMDDh4g8+EXcnLcC9T8U5S/CdT8bcUeBEIrwBOiI8ki7Ba5+NrePgWUy89/nYyxQ8Iw3f+pWY4h1gb3eAW7sDTPEOsLc7wK1TIeDuDB+I/OA1QOUHv/dFsZQkhKkh4QlEfOULYz2nGj2/Nn1LmwR/86VxlCoAW6kCsHRGANx1RgCMo5Qh2EsZgrXNQZZShp5Liv7Il8eIc5C91EHY2hxk6bwYmNscZIReDBwtCdhbErC1JGBpScBcOgFMLQsZMQs5Whayd+UQsLYsZGlZyNyykKllISNmIUfAwifw8NXvTojAjGFrdYi11SGWVoeYWx1i6lmQCiEjFkKOVgjZ+xxIhZCtFULWHkCqxCw9gNQKmP9vNHzipdEPrRcxtVbAeDkAvve0iM2QozVD9hfjhp4YP/UrkJYDbD2AtBxgfSkAvvHEeNcDSAsilgtAWxIy91J8AXgZAJ5e33+4tuACcAG4AFwALgBXRXQB6AFcB5MXAuA6nl9/0Vx/011/1V5/1/dfTPJvRtdnu/zL6beeFO/7r+fXBYbrEkt/j+i6ytXfpuvvE/ZXOnsA/a3a/l5xf7O6v1t+Xe/vOyz6HpO8yyboM8o7rfJes77bru83THk48p7TvOs27zvOO6/73vO++z7l4cgnMPQzKPopHC0N9noSSz6LJp/Gk88jyicy5TOp6qlc+VyyfDJbPpuuns6XzyfMJzTmMyrrKZ35nNJ8Ums+q7af1tvPK+4nNodEnPKp3fnc8npyez67/qVP7+/fL8hfcMjfsOhf8cjfMclfcnn9+BkOnLECP8Q58OYeyJ40eoyF6Ee/En/JHlP6mIlRVXprF4BxtAvArV0AxtEuALd2ARhHuwDc2gVgHPX/hFv9fMBddjIGeKg/WCxlCsI46u+Ga5mCcJd+sIG9UkGAW32ZbApFAHhod4Bb3eo04h3god0BbiUHYApVCNjbHeBW+QDAXT4a7qg7r7e214057vg0QhkEHkoSwq0kIdydXw4/Q3H8hjYJ3vL0WConBJhCHQaOToeBrU0BljYFmEoVgHGUKgAPnREAt84IgLuqFgAYSUEOAHszDwuAtSkHAZhLGYIpdCLgKGUIHtocZG1zkLmUIRhxDnJU1RDA1uYga5uDzKUOwhTnIEfnxcDe5iBrcyQAYGlzkKkUYhhxDrKXQgxbSwLWUohhbknA1JKAEZOAvSUBW0sC1pYEzC0JmFoSMMJyCDhaFrK3JGDtyiFgaVnI3LKQqWUhI2YhR8tC9paFrC0LWVoWMrcsZGpZyIhZyNGykL2rSIGtlQHWVgZYWhlgbmWAqZUBRiwDHK0MsLcywNbKAGsOoNUhllaHmFsdYmp1iBHrEEerQ+w5gFYI2VodYm11iKXVIeYcQCuETK0QMmIh5MgBtELI3gohWyuErDmAVolZWiFkzgG0SszUKjGjfj6gVmKOVonZcwCtFbB9HQC+ozWDbz1bvGu9iKW1AuYcQOtFTLEX1GbIaFegN0OOHEBrhuw5gNYM2XIArRuz5gDacoB3bTnAEktxXQ4wfw0AvveM8b4tiJjSJOwLIsbXsAKeNeKCiOO3D+AVbUl0AfjGs8ZPbUnIdgFoa1LWC0BblfMuB9AeC1j6gqQE0J9LmC8AOYD2ZMb7i4bt2ZTpWoHfPoB7Tj2fXzT8N1X41vkq/QHOAAAAAElFTkSuQmCC"}`);
            }
            console.log(data);
            if (data.idPersona.nombre != null) {
                $("#Nombre").val(data.idPersona.nombre);
                $("#nombrel").addClass("active");
            }
            if (data.idPersona.apellido != null) {
                $("#Apellido").val(data.idPersona.apellido);
                $("#nombrel1").addClass("active");
            }
            if (data.idPersona.numeroTelefono != null) {
                $("#Telefono").val(data.idPersona.numeroTelefono);
                $("#nombrel3").addClass("active");
            }
            if (data.usuario != null) {
                $("#Correo").val(data.usuario);
                $("#nombrel5").addClass("active");
            }
            if (data.idPersona.dirreccion != null) {
                $("#direccion").val(data.idPersona.dirreccion);
                $("#nombrel4").addClass("active");
            }
            if (data.idPersona.numeroIdentificacion != null) {
                $("#Numid").val(data.idPersona.numeroIdentificacion);
                $("#Tipoid").val("CC");
                $("#nombrel6").addClass("active");
                $("#nombrel7").addClass("active");
            }
        }
    })

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    }
    );
    // START OPEN


    $('.button-collapse').sideNav('hide');
    $('#siguiente5').click(function () {
        window.location.href = "generar_demanda.html";
    })


    $("#actualizar").click(function () {
        var link = document.URL;
        var urls = new URL(link);
        var usuario = localStorage.lastname;;
        var id = Number(usuario);
        var persona = {
            idPersona: id,
            nombre: $("#Nombre").val(),
            apellido: $("#Apellido").val(),
            numeroTelefono: $("#Telefono").val(),
            dirreccion: $("#direccion").val(),
            numeroIdentificacion: $("#Numid").val()
        }
        var urlEnviar = "http://192.168.1.23:8080/laborapp/api/legalapp/actualizarPersona"
        $.ajax({
            url: urlEnviar,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(persona),
            contentType: 'application/json',
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Admin");
            },
            success: function (data) {
                console.log(data);
                Materialize.toast('Los datos fueron actualizados de forma exitosa', 3000)
                setTimeout(function () {
                    window.location.href = "main.html";
                }, 3000);
            }
        })
    });

    //ESTA PARTE DEL SCRIPT ES PARA REGISTRAR LA PERSONA JURIDICA A LA QUE SE LE VA HACER LA DEMANADA 

    var server = "192.168.1.23";
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
                    console.log(JSON.stringify(usuario));
                    $.ajax({
                        url: url_persona,
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

});



