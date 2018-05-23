$(document).ready(function () {
    $("#btn-enviar").click(function () {        
        var link = document.URL;
        var urls = new URL(link);
        var id = urls.searchParams.get("user");
        var idSer = Number(id);
        var filtro = {
            idUsuario: idSer
        }       
        var server = "localhost";
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
                window.location.href = "main.html?user=" + id;
                console.log(data);
            }
        })
    })
    $('#modal1').show();
    $('.modal').modal();
});