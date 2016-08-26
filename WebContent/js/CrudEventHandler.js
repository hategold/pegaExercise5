// var crudEventHandler = {
//
// }
//

$(document).on("click", "button[name=\"delete\"]", function(e) {
			e.preventDefault();
			var thisSelector = $(this);
			var url = thisSelector.closest("a").attr("href");

			bootbox.confirm({// 頁面邏輯?
				title : "確認要刪除?",
				message : "Are you sure?",
				callback : function(result) {
					if (result) {
						ajaxUtil.makeAjaxRequest(url, null, {}, function() {
									domBuilder.deleteSelectRow(thisSelector);
								})
					}
				},
				size : "big"
			});

		})

$(document).on("click", "button[name=\"update\"]", function(e) {
	e.preventDefault();
	domBuilder.updateNewRowForm(Brand.prototype.inputColAttributeMap, $(this)
					.closest("tr"));

})
$(document).on("click", "button[name=\"create\"]", function(e) {
	e.preventDefault();
	domBuilder.createNewRowForm(Brand.prototype.inputColAttributeMap,
			domBuilder.tableName);

})

$(document).ready(function() {
	domBuilder.tableServlet = Brand.prototype.entityServlet;
	domBuilder.initSuperEntityString();
	var url = domBuilder.tableServlet + '.do?action=list&'
			+ domBuilder.superEntityString;
	domBuilder.tableName = $('table').attr('id');
	domBuilder.tableAttributeName = Brand.prototype.colAttribute;
	domBuilder.entityConstructor = Brand;
	domBuilder.buildTableHead(Brand.prototype.colAttribute);
	ajaxUtil
			.makeAjaxRequest(url, null, domBuilder, domBuilder.buildTableByAjax);

})

$(document).on("click", "button[name=\"inputOk\"]", function(e) {
	console.log(e);
	var postMap = {};
	var trSelector = $(this).closest("tr");
	trSelector.find("input,select").map(function() {
				postMap[$(this).attr("name")] = $(this).val();
			});

	postMap[domBuilder.superEntityParm['idName']] = domBuilder.superEntityParm['idValue']

	ajaxUtil.makeAjaxRequest(domBuilder.tableServlet, JSON.stringify(postMap),
			domBuilder, function(response) {
				domBuilder.formToEntity(trSelector, response);
			}, "POST", function(response) {
				domBuilder.deleteRowForm(trSelector);
			})
});

$(document).on("click", "button[name=\"inputCancel\"]", function(e) {
			$("#" + $(this).attr("target")).show();
			$(this).closest("tr").remove();
		});