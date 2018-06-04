$(document).ready(function () {

    $("#inicio").click(function () {
        var link = document.URL;
        var urls = new URL(link);
        var id = urls.searchParams.get("user");
        window.location.href = "main.html?user=" + id;
    });

    $("#perfil").click(function () {
        var link = document.URL;
        var urls = new URL(link);
        var id = urls.searchParams.get("user");
        window.location.href = "perfil.html?user=" + id;
    });

    $("#abogado").click(function () {
        var link = document.URL;
        var urls = new URL(link);
        var id = urls.searchParams.get("user");
        window.location.href = "abogado.html?user=" + id;
    });

    $("#demanda").click(function () {
        var link = document.URL;
        var urls = new URL(link);
        var id = urls.searchParams.get("user");
        window.location.href = "demanda.html?user=" + id;
    });

});