$(document).ready(function () {
    $("#btn-enviar").click(function () {        
        var link = document.URL;
        var urls = new URL(link);
        var id = localStorage.lastname;;
        var idSer = Number(id);
        var filtro = {
            idUsuario: idSer
        }       
        var server = "192.168.1.23";
        var url_persona = "http://" + server + ":8080/laborapp/api/legalapp/actualizarTutorial";
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
                Materialize.toast('Complete tu registro para continuar', 4000)
                setTimeout(function () {
                    window.location.href = "perfil.html";
                }, 3000);
                console.log(data);
            }
        })
    })
    $('#modal1').show();
    $('.modal').modal();
});