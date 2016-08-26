pageVariable = {};// global value similar to cookie
var domBuilder = {
	name : "domBuilder",
	tableName : "",
	tableAttributeName : [],
	tableServlet : "",
	superEntityString : "",
	superEntityParm : {},
	entityConstructor : function() {
	},
	buildTableHead : function(colAttribute) {
		var tr = $('<tr>');

		$.each(colAttribute, function(index, attrName) {
					var firstUpperCaseName = attrName[0].toUpperCase()
							+ attrName.substring(1);
					var tHead = $('<th>').text(firstUpperCaseName);
					tHead.appendTo(tr);
				})
		$(document).trigger('buidedTableHead', {
					'tr' : tr
				})
	},
	buildTableByAjax : function(responseJson) {

		var that = this;
		var tAttr = this.tableAttributeName;
		var tName = this.tableName;
		var tHeadSelector = $("#" + tName + " thead");
		var tBodySelector = $("#" + tName + " tbody");
		tBodySelector.children().remove();
		console.log(responseJson.length);
		cc = responseJson;
		$.each(responseJson, function(index, record) {

					tBodySelector
							.append($("<tr>").attr("id", record[tAttr[0]]));
					var trLastSelector = $("#" + tName + " tr:last");
					var i;
					for (i = 0; i < tAttr.length; i++) {
						trLastSelector.append("<td>" + record[tAttr[i]]
								+ "</td>")

					}
					appendUpdate(trLastSelector, that.tableServlet
									+ '.do?action=edit&' + tAttr[0] + '='
									+ record[tAttr[0]] + '&'
									+ that.superEntityString);
					appendDelete(trLastSelector, that.tableServlet
									+ '.do?action=delete&' + tAttr[0] + '='
									+ record[tAttr[0]] + '&'
									+ that.superEntityString);
					if (!that.superEntityString) {
						appendSubTableBtn(trLastSelector, tAttr[0],
								record[tAttr[0]]);
					}
				})
	},
	createNewRowForm : function(rowMap, tableName) {
		$("#" + tableName + " tr:last").after("<tr></tr>");
		var targetTr = $("#" + tableName + " tr:last");
		$.each(rowMap, function(item, key) {

					targetTr.append("<td><" + item.tag
							+ (item.type ? " type=\"" + item.type + "\"" : "")
							+ " name = \"" + key + "\" "
							+ "class=\"form-control\" "
							+ (item.otherAttribute ? item.otherAttribute : "")
							+ ">" + "</td>");
					if (item.tag == "select") {
						if (!pageVariable[key + 'Map']) {
							buildOptionsByAjax(key, $("select[name='" + key
											+ "']"));
						} else {
							buildOptionsByGlobalVar(key, $("select[name='"
											+ key + "']"));
						}
					}
				});
		targetTr.append(inputOkButton);
		targetTr.append(inputCancelButton);

	},
	updateNewRowForm : function(rowMap, rowSelector) {
		rowSelector = rowSelector.closest('tr');
		rowSelector.hide();
		var attributeArray = this.tableAttributeName;
		var targetTr = $("<tr>");
		var tdArray = rowSelector.find("td");
		var i;
		for (i = 0; i < attributeArray.length; i++) {
			var key = attributeArray[i];
			var item = rowMap[key];
			var tmpTd = $("<td>");
			var tmpTag = $("<" + item.colTag + ">");
			tmpTag.attr("type", item.colType).attr("name", key).attr("class",
					"form-control").appendTo(tmpTd);

			item.otherAttribute ? tmpTag.prop(item.otherAttribute, true) : "";

			if (item.colTag == "select") {
				if (!pageVariable[key + 'Map']) {
					buildOptionsByAjax(key, tmpTag);
				} else {
					buildOptionsByGlobalVar(key, tmpTag);
				}
			}
			tmpTag.value = $(tdArray[i]).text();
			tmpTag.val($(tdArray[i]).text());
			targetTr.append(tmpTd);

		}

		cancelButtonForUpdate = $(inputCancelButton)
		cancelButtonForUpdate.children("button").attr("target",
				rowSelector.attr("id"));

		targetTr.append(inputOkButton);
		targetTr.append(cancelButtonForUpdate);
		rowSelector.after(targetTr);
	},
	formToEntity : function(selector, responseJson) {
		var thisTr = $("<tr>");
		var id = responseJson[this.tableAttributeName[0]];

		this.tableAttributeName.forEach(function(element) {
					$("<td>").text(responseJson[element]).appendTo(thisTr);
				});
		$('#' + id).remove();
		thisTr.attr('id', id);
		appendUpdate(thisTr, this.tableServlet + '.do?action=edit&'
						+ this.tableAttributeName[0] + '='
						+ responseJson[this.tableAttributeName[0]] + '&'
						+ this.superEntityString)
		appendDelete(thisTr, this.tableServlet + '.do?action=delete&'
						+ this.tableAttributeName[0] + '='
						+ responseJson[this.tableAttributeName[0]] + '&'
						+ this.superEntityString)
		if (!this.superEntityString) {
			appendSubTableBtn(thisTr, this.tableAttributeName[0],
					responseJson[this.tableAttributeName[0]]);
		}

		selector.replaceWith(thisTr);
	},
	deleteRowForm : function(selector) {
		selector.replaceWith("");
	},
	checkThis : function() {
		return (this);
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
	initializeListener : function() {
	}
}

function buildOptionsByGlobalVar(mapName, selector) {
	setOptionsByJson(pageVariable[mapName + "Map"], selector);
}

function buildOptionsByAjax(mapName, selector) {
	var proxy = {};
	var jsonMap = ajaxUtil.makeAjaxRequest("countryCode.jsp", null, proxy,
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

function appendDelete(element, url) {
	element
			.append('<td><a href="'
					+ url
					+ '" class="confirm"><button type="button" class="btn btn-danger delete" name="delete">Delete</button></a></td>')
}

function appendUpdate(element, url) {
	element
			.append('<td><a href='
					+ url
					+ '><button type="button" class="btn btn-primary" name="update">Update</button></a></td>')
}

function appendSubTableBtn(element, idName, idValue) {
	$('<td>')
			.append($('<a>')
					.attr('href', 'listShoes.jsp?' + idName + '=' + idValue)
					.append('<button type="button" class="btn btn-primary" name="ShoesList">ShoesList</button>'))
			.appendTo(element);
}

var inputOkButton = '<td><button type="button" class="btn btn-primary inputOk" name="inputOk" type="submit">OK</button></td>';
var inputCancelButton = '<td><button type="button" class="btn btn-default inputCancel" name="inputCancel">Cancel</button></td>';

var domBuilEventListener = {}