console.log('linked');

var renderSung = function(response){
	var raw = $('#sung-temp').html()
	var template = Handlebars.compile(raw);
	console.log(response)
	$sungDiv = $('<div>', {id: 'sungID'})
	response.forEach(function(item){
		console.log(item)
		$sungDiv.append(template(item))
	})
	$('body').append($sungDiv)
};

var renderAnna = function(response){
	
	var raw = $('#anna-temp').html()
	var template = Handlebars.compile(raw); 
	$annaDiv = $('<div>', {id: 'annaID'})
	response.forEach(function(item){
		$annaDiv.append(template(item))
	})
	$('body').append($annaDiv)
}

var renderPhil = function(response){
	console.log(response)
	var raw = $('#phil-temp').html()
	var template = Handlebars.compile(raw)
	$philDiv = $('<div>', {id: 'philID'})
	response.forEach(function(item) {
		$philDiv.append(template(item))
	})
	$('body').append($philDiv)
}



$(document).ready(function() {
	$('#sung').on('click', function() {
		if (document.contains(document.getElementById("annaID"))) {
			document.getElementById("annaID").remove();
		} else if (document.contains(document.getElementById("philID"))) {
			document.getElementById("philID").remove();
		}
		$('#who').remove()
		$.ajax({
			url: '/sung', 
			type: 'GET', 
			dataType: 'JSON'
		}).done(renderSung)
	});

	$('#anna').on('click', function() {
		if (document.contains(document.getElementById("sungID"))) {
			document.getElementById("sungID").remove();
		} else if (document.contains(document.getElementById("philID"))) {
			document.getElementById("philID").remove();
		}
		$('#who').remove()
		$.ajax({
			url: '/anna', 
			type: 'GET', 
			dataType: 'JSON'
		}).done(renderAnna)
	});

	$('#phil').on('click', function() {
		if (document.contains(document.getElementById("sungID"))) {
			document.getElementById("sungID").remove();
		} else if (document.contains(document.getElementById("annaID"))) {
			document.getElementById("annaID").remove();
		}
		$('#who').remove()
		$.ajax({
			url: '/phil', 
			type: 'GET', 
			dataType: 'JSON'
		}).done(renderPhil)
	})

	$('#button').on('click', function() {
		$.ajax({
			url: '/phil', 
			type: 'POST', 
			dataType: ''
		}).done(function(response) {
			console.log(response)
		})
	})

});