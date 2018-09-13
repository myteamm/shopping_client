$(document).ready(function() {

	$(function() {

		var userName = $.cookie('userName');

		$.ajax({
			url: "http://39.108.238.18:8080/shopping/order/" + userName + "/list",
			//url: "http://localhost:8080/shopping/order/" + userName + "/list",
			type: 'get',
			dataType: 'json',
			crossDomain: true,
			success: function(data) {
				var tbody = "<tbody>";
				$.each(data, function(i, order) {
					tbody = tbody + "<tr>" +
						"<td>" + userName + "</td>" +
						"<td>" + order.goods.title + "</td>" +
						"<td>" + order.goods.seckillPrice + "</td>" +
						"<td>" + order.goods.marketPrice + "</td>" +
						"<td>" + order.createTime + "</td>" +
						"<td>秒杀成功</td>" +
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

});
