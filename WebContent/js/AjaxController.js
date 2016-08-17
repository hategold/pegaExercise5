var ajaxUtil = {
	name : "ajaxUtil",
	makeAjaxRequest : function(url, requestData, callback) {
		var responseJson
		$.ajax({
					url : url,
					data : requestData,
					success : function(response) {
						callback(response)
					},
					error : null

				})
	}
}