

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
    $("#enviarcorreo").click(function () {
        var link = document.URL;
        var urls = new URL(link);
        var server = "localhost";
        var url_persona = "http://" + server + ":8080/laborapp/api/legalapp/envioCorreo";
        var url_consulta = "http://" + server + ":8080/laborapp/api/legalapp/consultarUsuarioId";
        var nombre = urls.searchParams.get("user");
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
                if (user.indicador == null) {
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
                                window.location.href = "main.html?user=" + id;
                            }, 3000);
                        }
                    })
                } else {
                    Materialize.toast('Usted ya envio una peticion en un correo', 4000)
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
        var id = urls.searchParams.get("user");
        window.location.href = "abogado.html?user=" + id

    });


    // SIDEBAR
    var link = document.URL;
    var urls = new URL(link);
    var usuario = urls.searchParams.get("user");
    var server = "localhost";
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



});



