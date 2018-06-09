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
    $('.modal').modal();
    $('#siguiente1').click(function () {
        window.location.href = "demanda.html"; 
    })
    $('#siguiente3').click(function () {
        //Prescripcion    
        var f = new Date();
        var diaActual = f.getDate();
        var mesActual = (f.getMonth() + 1);
        var anioActual = f.getFullYear();
        var fechafin = $("#fechaFinal").val();
        var arregloFecha = fechafin.split('/');
        var diaFin = parseInt(arregloFecha[0]);
        var mesFin = parseInt(arregloFecha[1]);
        var anioFin = parseInt(arregloFecha[2]) + 3;
        var fechaInicio = $("#fechainicio").val();
        var arregloFechainicio = fechaInicio.split('/');
        var diaInicio = parseInt(arregloFechainicio[0]);
        var mesInicio = parseInt(arregloFechainicio[1]);
        var anioInicio = parseInt(arregloFechainicio[2]);

        if (anioFin >= anioActual) {
            if (mesFin <= mesActual || mesFin >= mesActual) {
                if (diaFin >= diaActual) {
                    window.location.href = "tipo_conflicto.html";
                } else {
                    preparar();
                }
            } else {
                window.location.href = "tipo_conflicto.html";
            }
        }
        else {
            preparar();
        }


    }) //Fin funcion

    function preparar() {
        $('#modal1').modal('open');
        $('#modal1').modal('modal').options.dismissible = false;
        $('#modal1').modal({
            backdrop: 'static',
            keyboard: false
        })
    }
});