$(document).ready(function () {
    moment.locale('es');

    jQuery.validator.addMethod("dateWithMoment", function (value, element) {
        // allow any non-whitespace characters as the host part
        return this.optional(element) || moment(value, "DD/MM/YYYY", true).isValid();
    }, 'Please enter a valid date with moment.');
    var fechaActual = new Date();
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

    $('#siguiente3').click(function () {
        //Prescripcion    
        var f = new Date();
        var dia = f.getDate();
        var mes = (f.getMonth() + 1);
        var anio = f.getFullYear();
        var fechafin = $("#fechaFinal").val();
        var arregloFecha = fechafin.split('/');
        var diafin = parseInt(arregloFecha[0]);
        var mesfin = parseInt(arregloFecha[1]);
        var aniofin = parseInt(arregloFecha[2]) + 3;

        if (aniofin >= anio) {
            if (mesfin >= mes) {}
            if (diafin >= dia) {
                window.location.href = "correo.html";
            } else {
                $('.modal').modal({
                    onOpenStart: true
                });
            }
        }


        var salario = $("#otroSalario").val();
        console.log(salario, "salario")
        var cuantia = 781242 * 20;
        console.log(cuantia, "cuenta")
        if (salario >= cuantia) {
            window.location.href = "abogado.html";
        }





    })


});