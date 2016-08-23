var crudEventHandler = {

}

var htmlTagUtils = {}

$(document).on("click", "button[name=\"delete\"]", function(e) {
			e.preventDefault();
			var thisSelector = $(this);
			var url = thisSelector.closest("a").attr("href");

			bootbox.confirm({
						title : "確認要刪除?",
						message : "Are you sure?",
						callback : function(result) {
							if (result) {
								ajaxUtil.makeAjaxRequest(url, null, {},
										function() {
											thisSelector.closest("tr")
													.replaceWith("");
										})
							}
						},
						size : "big"
					});

		})

$(document).on("click", "button[name=\"update\"]", function(e) {
	e.preventDefault();

	var colNameTypeMap = new Map();
	$("#" + "brandTable" + " tr:first").children().each(function() {
				var targetEntity = $(this).find("div");
				var key = targetEntity.attr("colName");
				if (key != undefined) {
					colNameTypeMap.set(key, {
								tag : targetEntity.attr("colTag"),
								input : targetEntity.attr("colType"),
								otherAttribute : targetEntity
										.attr("otherAttribute")
							});
				}

			});
	// console.log(colNameTypeMap);
	domBuilder.updateNewRowForm(colNameTypeMap, $(this).closest("tr"));
	var url = $(this).closest("href");

})
$(document).on("click", "button[name=\"create\"]", function(e) {
	e.preventDefault();
	var colNameTypeMap = new Map();
	$("#" + "brandTable" + " tr:first").children().each(function() {
				var targetEntity = $(this).find("div");
				var key = targetEntity.attr("colName");
				if (key != undefined) {
					colNameTypeMap.set(key, {
								tag : targetEntity.attr("colTag"),
								input : targetEntity.attr("colType"),
								otherAttribute : targetEntity
										.attr("otherAttribute")
							});
				}

			});
	domBuilder.createNewRowForm(colNameTypeMap, "brandTable");
	var url = $(this).closest("href");

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

$(document).on("click", "button[name=\"inputOk\"]", function(e) {
	var url = 'BrandTableController';
	var postMap = {};
	var trSelector = $(this).closest("tr");
	trSelector.find("input,select").map(function() {
				postMap[$(this).attr("name")] = $(this).val();
			});

	ajaxUtil.makeAjaxRequest(url, JSON.stringify(postMap), domBuilder,
			function(response) {
				domBuilder.formToEntity(trSelector, response);
			}, "POST", domBuilder.deleteRowForm)
});

$(document).on("click", "button[name=\"inputCancel\"]", function(e) {
			$("#" + $(this).attr("target")).show();
			$(this).closest("tr").replaceWith("");
		});