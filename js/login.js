$(document).ready(function() {

	$("#login").click(function() {

		var userName = $("#userName").val();
		var password = $("#password").val()

		if (userName == "" || password == "") {
			$('.modal-body').html('用户名或密码不能为空');
			$('#myModal').modal('show');

			setTimeout(function() {
				$('#myModal').modal('hide');
			}, 1500)
		} else {
			$.ajax({
				url:"http://39.108.238.18:8080/shopping/login",
				//url: "http://localhost:8080/shopping/login",
				type: 'post',
				dataType: 'json',
				data: {
					userName: userName,
					password: password
				},
				success: function(data) {
					console.log(data.statuss)
					if (data.status == "login_success") {
						$.cookie("userName", $("#userName").val(), {
							expires: 1
						});
						$(location).attr('href', 'list.html');
					} else {
						$('.modal-body').html('用户名不存在或密码错误');
						$('#myModal').modal('show');

						setTimeout(function() {
							$('#myModal').modal('hide');
						}, 1500)
					}
				},
				error: function() {
					$('.modal-body').html('网络错误');
					$('#myModal').modal('show');

					setTimeout(function() {
						$('#myModal').modal('hide');
					}, 1500)
				}

			});
		}


	});

	$("#register").click(function() {

		var userName = $("#userName").val();
		var password = $("#password").val()

		if (userName == "" || password == "") {
			$('.modal-body').html('用户名或密码不能为空');
			$('#myModal').modal('show');

			setTimeout(function() {
				$('#myModal').modal('hide');
			}, 1500)
		} else {
			$.ajax({
				url:"http://39.108.238.18:8080/shopping/register",
				//url: "http://localhost:8080/shopping/register",
				type: 'post',
				dataType: 'json',
				data: {
					userName: userName,
					password: password
				},
				success: function(data) {
					if (data.status == "register_success") {
						$('.modal-body').html('注册成功');
						$('#myModal').modal('show');
						$(location).attr('href', 'login.html')
					} else if (data.status == "username_already_exist") {
						$('.modal-body').html('用户名已存在');
						$('#myModal').modal('show');
						setTimeout(function() {
							$('#myModal').modal('hide');
						}, 1500)
					}
				},
				error: function() {
					$('.modal-body').html('网络错误');
					$('#myModal').modal('show');
					setTimeout(function() {
						$('#myModal').modal('hide');
					}, 1500)
				}

			});
		}


	});
});