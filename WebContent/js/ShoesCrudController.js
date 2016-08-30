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
			domBuilder.updateNewRowForm(Shoes.prototype.inputColAttributeMap,
					$(this).closest("tr"));

		})
$(document).on("click", "button[name=\"create\"]", function(e) {
	e.preventDefault();
	domBuilder.createNewRowForm(Shoes.prototype.inputColAttributeMap);

})

$(document).ready(function() {
	domBuilder.tableServlet = Shoes.prototype.entityServlet;
	domBuilder.initSuperEntityString();
	domBuilder.tableName = $('table').attr('id');
	domBuilder.tableAttributeName = Shoes.prototype.colAttribute;
	domBuilder.initializeListener(Shoes);

	var shoesBuilder = new entityModelBuilder(Shoes)
	var url = Shoes.prototype.entityServlet + '.do?action=list&'
			+ domBuilder.superEntityString;

	initReferrenceListener();
	domBuilder.buildTableHead(Shoes.prototype.colAttribute);
	ajaxUtil.makeAjaxRequest(url, null, shoesBuilder, shoesBuilder.buildByJson);

})

function initReferrenceListener() {
	$(document).on(domBuilder.tableName + 'TrBuilded', function(e, eventData) {
				var tbSelector = $('#' + domBuilder.tableName + ' tbody');
				$.each(eventData, function(idx) {
							tbSelector.append(eventData[idx]);
						})
			});
	$(document).on(domBuilder.tableName + 'ThBuilded', function(e, eventData) {
				var thSelector = $('#' + domBuilder.tableName + ' thead');
				thSelector.children().remove();
				thSelector.append(eventData.tr);
			})

	$(document).on(domBuilder.tableName + 'UpdateRowForm',
			function(e, eventData) {
				var idSelector = eventData.target;
				idSelector.after(eventData.tr);
			})

	$(document).on(domBuilder.tableName + 'CreateRowForm', function(e, trForm) {
				var tbSelector = $('#' + domBuilder.tableName + ' tbody');
				tbSelector.append(trForm);
			})
}

$(document).on("click", "button[name=\"inputOk\"]", function(e) {//TODO check this part!
	var postModel = {};// = new Brand();
	var trSelector = $(this).closest("tr");
	trSelector.find("input,select").map(function() {
				postModel[$(this).attr("name")] = $(this).val();
			});

	postModel[domBuilder.superEntityParm['idName']] = domBuilder.superEntityParm['idValue']

	ajaxUtil.makeAjaxRequest(Shoes.prototype.entityServlet,
			JSON.stringify(postModel), domBuilder, function(response) {
				domBuilder.formToEntity(trSelector, response);
			}, "POST", function(response) {
				domBuilder.deleteSelectRow(trSelector);
			})
});

$(document).on("click", "button[name=\"inputCancel\"]", function(e) {
			$("#" + $(this).attr("target")).show();
			dombuilde.deleteSelectRow($(this));
		});