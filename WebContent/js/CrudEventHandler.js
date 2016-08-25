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
									thisSelector.closest("tr").replaceWith("");
								})
					}
				},
				size : "big"
			});

		})

$(document).on("click", "button[name=\"update\"]", function(e) {
	e.preventDefault();

	var colNameTypeMap = new Map();
	$("#" + domBuilder.tableName + " tr:first").children().each(function() {
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
	$("#" + domBuilder.tableName + " tr:first").children().each(function() {
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
	domBuilder.createNewRowForm(colNameTypeMap, domBuilder.tableName);
	var url = $(this).closest("href");

})

$(document).ready(function() {
	domBuilder.tableServlet = $('table').attr('servlet');
	domBuilder.initSuperEntityString();
	var url = domBuilder.tableServlet + '.do?action=list&'
			+ domBuilder.superEntityString;
	domBuilder.tableName = $('table').attr('id');
	domBuilder.tableAttributeName = Array.from($('th').find('div').map(
			function() {
				return $(this).attr('colName')
			}));
	ajaxUtil
			.makeAjaxRequest(url, null, domBuilder, domBuilder.buildTableByAjax);

})

$(document).on("click", "button[name=\"inputOk\"]", function(e) {
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
			$(this).closest("tr").replaceWith("");
		});