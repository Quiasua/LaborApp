$(document).ready(function () {
    $("#btn-enviar").click(function () {
        if ($("#user").val() != "" && $("#password").val() != "") {
            var filtro = {
                filtroUno: $("#user").val(),
                filtroDos: $("#password").val()
            }
            var url_persona = "http://192.168.43.90:8080/laborapp/api/legalapp/consultarUsuario";
            $.ajax({
                url: url_persona,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(filtro),
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                    if (data != null) {
                        window.location.href = "perfil.html";
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