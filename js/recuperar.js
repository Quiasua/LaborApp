$(document).ready(function () {
    var link = document.URL;
    var urls = new URL(link);
    var nombre = urls.searchParams.get("usr");
    console.log(nombre);

    $("#recordar").click(function () {
        var url = "http://192.168.1.23:8080/laborapp/api/legalapp/actalizarContrase";
        var id = $("#email-rec").val();
        var iNum = parseInt(id);
        var cliente = {
            'filtroUno': id
        }
        console.log(JSON.stringify(cliente));
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(cliente),
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
                if (data.correo != null) {
                    Materialize.toast('Revise su correo electronico, para cambiar su contraseña', 4000)
                    setTimeout(function () {
                        login();
                    }, 1000);
                } else {
                    Materialize.toast('El correo no se encuentra registrado', 4000)
                }
            }
        })

    })

    $("#confirmar").click(function () {
        var url = "http://192.168.1.23:8080/laborapp/api/legalapp/cambiarContrasena";        
        var id =  urls.searchParams.get("usr");
        var iNum = parseInt(id);
        var cliente = {
            'idUsuario': id,
            'contrasena':$("#contrase").val()
        }
        console.log(cliente);
        if ($("#contrase").val() == $("#confirme-contrase").val()) {
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(cliente),
                contentType: 'application/json',                
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", "Admin");
                },
                success: function (data) {
                    console.log(data);
                    if (data != null) {
                        Materialize.toast('Se actualizo la contraseña del usuario', 4000)
                        setTimeout(function () {
                            login();
                        }, 1000);
                    } else {
                        Materialize.toast('Error a la hora de actializar el correo', 4000)
                    }
                }
            })
        } else {
            Materialize.toast('Las contraseñas no coiciden', 4000)
        }


    })

    function login() {
        window.location.href = "login.html";
    }


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