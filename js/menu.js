$(document).ready(function () {

    $("#inicio").click(function () {
        var link = document.URL;
        var urls = new URL(link);
        var id = localStorage.lastname;;
        window.location.href = "main.html";
    });

    $("#perfil").click(function () {
        var link = document.URL;
        var urls = new URL(link);
        var id = localStorage.lastname;;
        window.location.href = "perfil.html";
    });

    $("#abogado").click(function () {
        var link = document.URL;
        var urls = new URL(link);
        var id = localStorage.lastname;;
        window.location.href = "abogado.html";
    });

    $("#demanda").click(function () {
        var link = document.URL;
        var urls = new URL(link);
        var id = localStorage.lastname;;
        window.location.href = "demanda.html";
    });

});