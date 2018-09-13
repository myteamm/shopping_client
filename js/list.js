$(document).ready(function() {

	$(function() {

		var userName = $.cookie('userName');

		if (jQuery.isEmptyObject(userName)) {
			$('#myModal').modal('show');
		}

		$.ajax({
			url: "http://39.108.238.18:8080/shopping/goods/list",
			//url: "http://localhost:8080/shopping/goods/list",
			type: 'get',
			dataType: 'json',
			crossDomain: true,
			success: function(data) {
				var tbody = "<tbody>";
				$.each(data, function(i, goods) {
					tbody = tbody + "<tr>" +
						"<td>" + goods.title + "</td>" +
						"<td>" + goods.totality + "</td>" +
						"<td>" + goods.startTime + "</td>" +
						"<td>" + goods.endTime + "</td>" +
						"<td>" + checkStatus(goods.startTime, goods.endTime) + "</td>" +
						"<td>" + "<span class='btn btn-info' onclick='detail(" + JSON.stringify(goods) + ")';>link</span>" + "</td>" +
						"</tr>"
				})
				tbody = tbody + "</tbody>";
				$('#list_table').append(tbody);
			},
			error: function() {
				$('.modal-body').html('网络错误');
				$('#myModal').modal('show');
			}

		});
	});

	$("#toLogin").click(function() {
		$(location).attr('href', 'login.html')
	})

});

function detail(goods) {
	$.cookie("goods", JSON.stringify(goods));
	$(location).attr('href', 'detail.html');
}

function checkStatus(startTime, endTime) {

	startTime = startTime.replace(/-/g, " ");

	endTime = endTime.replace(/-/g, " ");

	startTime = (new Date(startTime)).getTime();

	endTime = (new Date(endTime)).getTime();

	var nowTime = new Date().getTime();

	console.log(startTime + "  " + nowTime + "  " + endTime)

	if (nowTime < startTime) {
		return "未开始";
	} else if (nowTime > startTime && nowTime < endTime){
		return "正在秒杀"
	} else {
		return "已结束";
	}

	
}