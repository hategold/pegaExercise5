pageVariable = {};// global value similar to cookie

var domBuilder = {
	name : "domBuilder",
	tableName : "",
	tableAttributeName : [],
	tableServlet : "",// on button too
	superEntityString : "",// on button
	superEntityParm : {},
	buildTableHead : function(colAttribute) {
		var tr = $('<tr>');

		$.each(colAttribute, function(index, attrName) {
					var firstUpperCaseName = attrName[0].toUpperCase()
							+ attrName.substring(1);
					var tHead = $('<th>').text(firstUpperCaseName);
					tHead.appendTo(tr);
				})
		$('<th>').text('Action').attr('colspan', '3').appendTo(tr);
		$(document).trigger(this.tableName + 'ThBuilded', {
					'tr' : tr
				})
	},
	buildTableByArray : function(modelArray) {

		var that = this;
		var tAttr = this.tableAttributeName;
		var returnTrArray = new Array();

		$.each(modelArray, function(index, model) {
					record = model.getAttributes();
					var returnTr = $("<tr>").attr("id", record[tAttr[0]]);
					var i;
					for (i = 0; i < tAttr.length; i++) {
						returnTr.append("<td>" + record[tAttr[i]] + "</td>")
					}
					that.appendButtons(returnTr, tAttr[0], record[tAttr[0]]);

					returnTrArray.push(returnTr);
				})
		$(document).trigger(this.tableName + 'TrBuilded', [returnTrArray]);
	},
	createNewRowForm : function(rowMap) {
		var tmpTr = $('<tr>');
		var buildColForm = this.buildColForm;
		$.each(rowMap, function(key, item) {
					tmpTr.append($('<td>').append(buildColForm(item, key)))
				});
		tmpTr.append(this.inputOkButton);
		tmpTr.append(this.inputCancelButton);

		$(document).trigger(this.tableName + 'CreateRowForm', tmpTr);

	},
	buildColForm : function(item, key) {
		var inputTag = $("<" + item.colTag + ">").attr('type',
				(item.colType ? item.colType : "")).attr('name', key).attr(
				'class', 'form-control');
		if (item.otherAttribute) {
			item.otherAttribute.split(' ').forEach(function(attrName) {
						inputTag.prop(attrName, true);
					});
		}
		if (item.colTag == "select") {
			if (!pageVariable[key + 'Map']) {
				buildOptionsByAjax(key, inputTag);
			} else {
				buildOptionsByGlobalVar(key, inputTag);
			}
		}
		return inputTag;
	},
	updateNewRowForm : function(rowMap, rowSelector) {
		rowSelector = rowSelector.closest('tr');
		rowSelector.hide();
		var attributeArray = this.tableAttributeName;
		var tmpTr = $("<tr>");
		var tdArray = rowSelector.find("td");
		var i;
		for (i = 0; i < attributeArray.length; i++) {
			var tmpTag = this.buildColForm(rowMap[attributeArray[i]],
					attributeArray[i]);

			tmpTag.value = $(tdArray[i]).text();
			tmpTag.val($(tdArray[i]).text());
			tmpTr.append($('<td>').append(tmpTag));

		}

		cancelButtonForUpdate = $(this.inputCancelButton)
		cancelButtonForUpdate.children("button").attr("target",
				rowSelector.attr("id"));

		tmpTr.append(this.inputOkButton);
		tmpTr.append(cancelButtonForUpdate);
		// rowSelector.after(targetTr);

		$(document).trigger(this.tableName + 'UpdateRowForm', {
					'tr' : tmpTr,
					'target' : rowSelector
				});
	},
	formToEntity : function(selector, responseJson) {
		var thisTr = $("<tr>");
		var id = responseJson[this.tableAttributeName[0]];

		this.tableAttributeName.forEach(function(element) {
					$("<td>").text(responseJson[element]).appendTo(thisTr);
				});
		console.log($('#' + id));
		$('#' + id).remove();
		thisTr.attr('id', id);

		this.appendButtons(thisTr, this.tableAttributeName[0],
				responseJson[this.tableAttributeName[0]]);

		selector.replaceWith(thisTr);
	},

	initSuperEntityString : function() {
		this.superEntityString = decodeURIComponent(window.location.search
				.substring(1));
		this.superEntityParm['idName'] = this.superEntityString.split('=')[0];
		this.superEntityParm['idValue'] = this.superEntityString.split('=')[1];
	},
	deleteSelectRow : function(selector) {
		selector.closest('tr').remove();
	},
	deleteSelectDom : function(selector) {
		selector.remove();
	},
	initializeListener : function(model) {
		var that = domBuilder;
		$(document).on(model.name + 'ListBuilded', function(event, eventData) {
					that.buildTableByArray(eventData);
				});
		$(document).on(model.name + 'Builded', function(event, eventData) {
				});
	},
	inputOkButton : '<td><button type="button" class="btn btn-primary inputOk" name="inputOk" type="submit">OK</button></td>',
	inputCancelButton : '<td><button type="button" class="btn btn-default inputCancel" name="inputCancel">Cancel</button></td>',
	appendDelete : function(element, idName, idValue) {

		$('<td>')
				.append($('<a>')
						.attr(
								'href',
								this.tableServlet + '.do?action=delete&'
										+ idName + '=' + idValue + '&'
										+ this.superEntityString)
						.attr('class', 'confirm')
						.append('<button type="button" class="btn btn-danger delete" name="delete">Delete</button>'))
				.appendTo(element);

	},
	appendUpdate : function(element, idName, idValue) {
		$('<td>')
				.append($('<a>')
						.attr(
								'href',
								this.tableServlet + '.do?action=edit&' + idName
										+ '=' + idValue + '&'
										+ this.superEntityString)
						.append('<button type="button" class="btn btn-primary" name="update">Update</button>'))
				.appendTo(element);

	},
	appendSubTableBtn : function(element, idName, idValue) {
		$('<td>')
				.append($('<a>').attr('href',
						'listShoes.jsp?' + idName + '=' + idValue)
						// ???listJsp
						.append('<button type="button" class="btn btn-primary" name="ShoesList">ShoesList</button>'))
				.appendTo(element);
	},
	appendButtons : function(element, idName, idValue) {
		this.appendUpdate(element, idName, idValue);
		this.appendDelete(element, idName, idValue);
		if (!this.superEntityString) {
			this.appendSubTableBtn(element, idName, idValue);
		}
	}

}

function buildOptionsByGlobalVar(mapName, selector) {
	setOptionsByJson(pageVariable[mapName + "Map"], selector);//options
}

function buildOptionsByAjax(mapName, selector) {
	var proxy = {};
	var jsonMap = ajaxUtil.makeAjaxRequest(mapName + "Map.jsp", null, proxy,
			function(response) {
				pageVariable[mapName + "Map"] = response;
				setOptionsByJson(response, selector);
			})
}

function setOptionsByJson(jsonMap, selector) {
	$.each(jsonMap, function(key, value) {
				$("<option>").val(key).text(value).appendTo(selector);
			});
	if (selector.value) {
		selector.val(selector.value);// Ajax load Async, so save in value
		// earlier
	}// and then save to val()
}
