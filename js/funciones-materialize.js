$(document).ready(function () { //Funcion al momento de recargar la página
	
	$("#checkbox2").click(function () { //Funcion clic 
		if ($(this).is(':checked')) { //Validador el checkbox
			$("#otroSalario,#tituloOtroSalario").css("display", "block"); //Aparece el input de otro salario
			$("select#salario").prop('disabled', true); //Deshabilita el select
			$('select').material_select();   //Para materialize
		} else {
			$("#otroSalario,#tituloOtroSalario").css("display", "none");//desaparece el input de otro salario
			$("select#salario").prop('disabled', false);//Habilita el select
			$('select').material_select();//Para materialize
		}
	});
	//variables
	var pass1 = $('[name=password]');
	var pass2 = $('[name=confirm-password]');
	var confirmacion = "Las contraseñas si coinciden";
	var longitud = "La contraseña debe estar formada entre 6-16 carácteres";
	var negacion = "No coinciden las contraseñas";
	var vacio = "La contraseña no puede estar vacía";
	//oculto por defecto el elemento span
	var span = $('<span></span>').insertAfter(pass2);
	span.hide();
	//función que comprueba las dos contraseñas
	function coincidePassword() {
		var valor1 = pass1.val();
		var valor2 = pass2.val();
		//muestro el span
		span.show().removeClass();
		//condiciones dentro de la función
		if (valor1 != valor2) {
			span.text(negacion).addClass('negacion');
		}
		if (valor1.length == 0 || valor1 == "") {
			span.text(vacio).addClass('negacion');
		}
		if (valor1.length < 6 || valor1.length > 16) {
			span.text(longitud).addClass('negacion');
		}
		if (valor1.length != 0 && valor1 == valor2) {
			span.text(confirmacion).removeClass("negacion").addClass('confirmacion');
		}
	}	

	

	$.ajax({
        url: "http://192.168.1.23:8080/laborapp/api/legalapp/consultarTipoConflicto",
		type: 'GET',
		beforeSend: function (request) {
            request.setRequestHeader("Authorization", "Admin");
        },
        success: function (data) {
			var html = ''; //Varaible para imprimir
			var len = data.length; //Varible para contador
			for (var i = -0; i < len; i++) { //for para traer la lista de colores
				html += '<option  value="'+data[i].idTipoConflicto+'">'+data[i].descripcion	+' </option>';
			}
			$('#tipoConflicto').append(html); 
			$('select').material_select();
		}
    });

	//ejecuto la función al soltar la tecla
	pass2.keyup(function () {
		coincidePassword();
	});

	
	$("#representante").click(function () { //Funcion clic 
		if ($("#dvOcultar").css("display") ==  'none'){
			$("#dvOcultar").css("display", "block");	
		
		} 
		else {
			$("#dvOcultar").css("display", "none");
		}
	});

	$('select.tipo-identificacion').on('change', function () {//Funcion para seleccionar la dosificacion del option que 
		var valorIdentificacionFrom = $(this).val();
		if (valorIdentificacionFrom == 1) {
			$("#persona-natural").css("display", "block");
			$("#persona-legal").css("display", "none");

		} else {
			$("#persona-legal").css("display", "block");
			$("#persona-natural").css("display", "none");
		}
	});

	$('select').material_select();


	// for HTML5 "required" attribute
	$("select[required]").css({
		display: "inline",
		height: 0,
		padding: 0,
		width: 0
	});
});




