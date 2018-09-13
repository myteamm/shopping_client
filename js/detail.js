$(document).ready(function() {

	var userName = $.cookie('userName');

	toLogin(userName);

	var goods = JSON.parse($.cookie("goods"));

	var start = goods.startTime.replace(/-/g, " ");

	var end = goods.endTime.replace(/-/g, " ");

	var startTime = (new Date(start)).getTime();

	var endTime = (new Date(end)).getTime();

	$("#image").css("background-image", "url(" + goods.imageUrl + ")");
	$(".time-text").text("开始时间 " + goods.startTime);
	$("#title").text(goods.title);
	$("#description").text(goods.description);
	$("#seckillprice").text(goods.seckillPrice);
	$("#oldprice").text(goods.marketPrice);

	$("#seckillBtn").attr('disabled', true);

	timer(startTime, endTime);

	$("#seckillBtn").click(function() {
		$.ajax({
			//url: "http://localhost:8080/shopping/seckill/execution",
			url: "http://39.108.238.18:8080/shopping/seckill/execution",
			type: 'post',
			dataType: 'json',
			crossDomain: true,
			data: {
				userName: userName,
				goodsId: goods.goodsId
			},
			success: function(data) {

				console.log(data)

				if (data.statusInfo == "未登录") {
					toLogin(userName);
				} else if (data.statusInfo == "秒杀成功") {
					$('.modal-footer').attr('hidden', true);
					$('.modal-body').html('秒杀成功');
					$('#myModal').modal('show');

					setTimeout(function() {
						$('#myModal').modal('hide');
					}, 1500)

					$("#seckillBtn").attr('disabled', true);
				} else if (data.statusInfo == "重复秒杀") {
					$('.modal-footer').attr('hidden', true);
					$('.modal-body').html('已秒杀成功，不可重复秒杀');
					$('#myModal').modal('show');

					setTimeout(function() {
						$('#myModal').modal('hide');
					}, 1500)

					$("#seckillBtn").attr('disabled', true);
				} else {
					$('.modal-footer').attr('hidden', true);
					$('.modal-body').html('秒杀已结束');
					$('#myModal').modal('show');

					$("#timer").html("秒杀已结束");

					setTimeout(function() {
						$('#myModal').modal('hide');
					}, 1500)

					$("#seckillBtn").attr('disabled', true);
				}
			},
			error: function() {
				$('.modal-footer').attr('hidden', true);
				$('.modal-body').html('网络错误');

				setTimeout(function() {
					$('#myModal').modal('hide');
				}, 1500)
				$('#myModal').modal('show');
			}

		});
	})

	$("#toLogin").click(function() {
		$(location).attr('href', 'login.html')
	})

	$("#out").click(function() {
		$.removeCookie('userName');
		$(location).attr('href', 'login.html')
	})

});

function timer(startTime, endTime) {

	var nowTime = new Date().getTime();

	if (nowTime - endTime > 0) {
		$(".modal-footer").attr('hidden', false)
		$("#timer").html("秒杀已结束!!!");
		$("#seckillBtn").attr('disabled', true);
	} else {
		var ts = startTime - nowTime; //计算剩余的毫秒数

		if (ts <= 0) {
			$("#timer").html("正在秒杀!!!");
			$("#seckillBtn").attr('disabled', false);
		} else {
			var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
			var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数
			var mm = parseInt(ts / 1000 / 60 % 60, 10); //计算剩余的分钟数
			var ss = parseInt(ts / 1000 % 60, 10); //计算剩余的秒数

			hh = checkTime(hh);
			mm = checkTime(mm);
			ss = checkTime(ss);

			$("#timer").html("倒计时 " + dd + " 天 " + hh + " 时 " + mm + " 分 " + ss + " 秒 ");
			setInterval("timer(" + startTime + "," + endTime + ")", 1000);
		}
	}
}

function toLogin(userName) {
	if (jQuery.isEmptyObject(userName)) {
		$('.modal-footer').attr('hidden', false);
		$('.modal-body').html('未登录，无法进行秒杀，请立即登录');
		$('#myModal').modal('show');

		$('#userName').html("未登录");
		$('#order').hide();
		$('#out').hide()
	} else {
		$('#userName').html(userName);
		$('#login').hide();
	}
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}