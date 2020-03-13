$(function() {
	$('#testForm').submit(function(e) {
		$.ajax({
			url: '/api/issues/apitest',
			type: 'post',
			data: $('#testForm').serialize(),
			success: function(data) {
				$('#jsonResult').text(JSON.stringify(data));
			},
		});
		e.preventDefault();
	});
	$('#testForm2').submit(function(e) {
		$.ajax({
			url: '/api/issues/apitest',
			type: 'put',
			data: $('#testForm2').serialize(),
		});
		e.preventDefault();
	});
	$('#testForm3').submit(function(e) {
		$.ajax({
			url: '/api/issues/apitest',
			type: 'delete',
			data: $('#testForm3').serialize(),
			success: function(data) {
				$('#jsonResult').text(JSON.stringify(data));
			},
		});
		e.preventDefault();
	});
	$('#testForm4').submit(function(e) {
		$.ajax({
			url: '/api/project',
			type: 'post',
			data: $('#testForm4').serialize(),
			success: function(data) {
				$('#jsonResult').text(JSON.stringify(data));
			},
		});
		e.preventDefault();
	});
});
