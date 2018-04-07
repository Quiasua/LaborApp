
$(document).ready(function () {
    $(function () {
        moment.locale('es');

        jQuery.validator.addMethod("dateWithMoment", function (value, element) {
            // allow any non-whitespace characters as the host part
            return this.optional(element) || moment(value, "DD/MM/YYYY", true).isValid();
        }, 'Please enter a valid date with moment.');

        $('.datepicker').pickadate({
            editable: true,
            selectMonths: true,
            selectYears: 15,
            firstDay: true,
            format: 'dd/mm/yyyy',
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
    });

    $("#campo").addClass("ocultar");
    $("#campo1").addClass("ocultar");
    $("#valFecha").addClass("ocultar");

    $("#siguiente").click(function () {
        if ($("#Nombre").val() != "" && $("#Apellido").val() != "") {
            $("#primera").addClass("ocultar");
            $("#segunda").removeClass("ocultar");
        } else {
            if ($("#Nombre").val() == "") {
                $("#Nombre").css({
                    "border-bottom": "1px solid #F44336"
                });
                $("#campo").removeClass("ocultar");
            } else {
                $("#campo").addClass("ocultar");
                $("#Nombre").css({
                    "border-bottom": "1px solid #26a29a"
                });
            }
            if ($("#Apellido").val() == "") {
                $("#Apellido").css({
                    "border-bottom": "1px solid #F44336"
                })
                $("#campo1").removeClass("ocultar");
            } else {
                $("#campo1").addClass("ocultar");
                $("#Apellido").css({
                    "border-bottom": "1px solid #26a29a"
                });
            }


        }

    });

    $("#siguiente2").click(function () {
        if ($("#fecha").val() != "") {
            $("#segunda").addClass("ocultar");
            $("#tercera").removeClass("ocultar");
        } else {
            
        }        

    });
})


