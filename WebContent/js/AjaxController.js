var ajaxUtil = {
	name : "ajaxUtil",
	makeAjaxRequest : function(url, requestData, callbackEntity, callbackFunction) {
		var responseJson
		$.ajax({
					url : url,
					data : requestData,
					success : function(response) {
						callbackEntity.callback = callbackFunction;
						callbackEntity.callback(response);
					},
					error : null

				})
	}
}