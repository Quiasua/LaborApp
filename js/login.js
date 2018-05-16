$(document).ready(function () {

    window.onload = function () {
        if (typeof history.pushState === "function") {
            history.pushState("jibberish", null, null);
            window.onpopstate = function () {
                history.pushState('newjibberish', null, null);
                // Handle the back (or forward) buttons here
                // Will NOT handle refresh, use onbeforeunload for this.
            };
        }
        else {
            var ignoreHashChange = true;
            window.onhashchange = function () {
                if (!ignoreHashChange) {
                    ignoreHashChange = true;
                    window.location.hash = Math.random();
                    // Detect and redirect change here
                    // Works in older FF and IE9
                    // * it does mess with your hash symbol (anchor?) pound sign
                    // delimiter on the end of the URL
                }
                else {
                    ignoreHashChange = false;
                }
            };
        }
    }

    $("#btn-enviar").click(function () {
        if ($("#user").val() != "" && $("#password").val() != "") {
            var filtro = {
                filtroUno: $("#user").val(),
                filtroDos: $("#password").val()
            }
            var server = "localhost";
            var url_persona = "http://" + server + ":8080/laborapp/api/legalapp/consultarUsuario";
            $.ajax({
                url: url_persona,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(filtro),
                contentType: 'application/json',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", "Admin");
                },
                success: function (data) {
                    console.log(data);
                    if (data.usuario != null) {
                        if (data.indicador != null) {
                            window.location.href = "main.html?user=" + data.idUsuario;
                        } else {
                            window.location.href = "tutorial.html?user=" + data.idUsuario;
                        }
                    } else {
                        Materialize.toast('Usuario y/o contraseña incorrectos', 4000)
                    }
                }
            })
        } else {
            Materialize.toast('Los campos estan vacios', 4000)
        }
    })
});