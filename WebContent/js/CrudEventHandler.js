var crudEventHandler = {

}

$(document).on("click", "button[name=\"delete\"]", function(e) {
			var url = $(this).parent().attr("href");
			e.preventDefault();
			var response = ajaxUtil.makeAjaxRequest(url, null)
			console.log(response)
		})
$(document).on("click", "button[name=\"update\"]", function(e) {
			console.log("OjOkj")
			var url = $(this).parent().attr("href");
			e.preventDefault();

			ajaxUtil.makeAjaxRequest(url, null, doUpdate)

		})
$(document).on("click", "button[name=\"create\"]", function() {
			console.log("OjOkj")
			var url = $(this).parent().attr("href");
			e.preventDefault();

			ajaxUtil.makeAjaxRequest(url, null, doUpdate)
		})

$(document).ready(function() {
			var url = 'BrandTableController.do?action=list'
			ajaxUtil.makeAjaxRequest(url, null, domBuilder.buildTable)

		})

function doUpdate(responseJson) {
	console.log(responseJson)
}