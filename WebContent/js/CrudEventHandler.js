var crudEventHandler = {

}

var htmlTagUtils = {
}

$(document).on("click", "button[name=\"delete\"]", function(e) {
			var url = $(this).closest().attr("href");
			e.preventDefault();
			$(this).closest("tr").replaceWith("");
			
			/* var response = ajaxUtil.makeAjaxRequest(url, null) */
			console.log(response)
		})
$(document).on("click", "button[name=\"update\"]", function(e) {
			console.log("OjOkj")
			console.log($(this).closest("tr"));
			console.log($(this).closest("tr").html());
			var url = $(this).closest().attr("href");
			e.preventDefault();

			ajaxUtil.makeAjaxRequest(url, null, doUpdate)

		})
$(document).on("click", "button[name=\"create\"]", function() {
			console.log("OjOkj");
			console.log($(this).closest("tr"));
			console.log($(this).closest("tr").html());
			var url = $(this).closest("href");
			e.preventDefault();

			ajaxUtil.makeAjaxRequest(url, null, doUpdate);
		})

$(document).ready(function() {
	var url = 'BrandTableController.do?action=list'
	var BrandDomBuilder = domBuilder;
	BrandDomBuilder.tableName = "brandTable";
	BrandDomBuilder.tableAttributeName = ["brandId", "brandName", "website",
			"country"];
	BrandDomBuilder.tableServlet = "BrandTableController";
	ajaxUtil.makeAjaxRequest(url, null, BrandDomBuilder, domBuilder.buildTable);

})

function doUpdate(responseJson) {
	console.log(responseJson)
}