var crudEventHandler = {

}

var htmlTagUtils = {}

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
$(document).on("click", "button[name=\"create\"]", function(e) {
	// domBuilder.createNewRow();
	e.preventDefault();
	var colNameTypeMap = new Map();
	$("#" + "brandTable" + " tr:first").children().each(function() {

				var key = $(this).find("div").attr("colName");
				if (key != undefined) {
					colNameTypeMap
							.set(key, $(this).find("div").attr("colType"));
				}

			});
	domBuilder.createNewRow(colNameTypeMap,"brandTable");
	var url = $(this).closest("href");

		// ajaxUtil.makeAjaxRequest(url, null, doUpdate);
})

$(document).ready(function() {
	var url = 'BrandTableController.do?action=list'
	var BrandDomBuilder = domBuilder;
	BrandDomBuilder.tableName = "brandTable";
	BrandDomBuilder.tableAttributeName = ["brandId", "brandName", "website",
			"country"];
	BrandDomBuilder.tableServlet = "BrandTableController";
	ajaxUtil.makeAjaxRequest(url, null, BrandDomBuilder,
			domBuilder.buildTableByAjax);

})

function doUpdate(responseJson) {
	console.log(responseJson)
}