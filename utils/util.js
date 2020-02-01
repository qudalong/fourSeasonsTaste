const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const drawImage = (coverPath_canvas = '', codePath_canvas = '', title = '', price = '',oldPrice='') => {
	// console.log('coverPath=' + coverPath_canvas);
	// console.log('codePath=' + codePath_canvas);
	const context = wx.createCanvasContext('myCanvas');
	context.rect(0, 0, 750, 900);
	context.setFillStyle('#fff');
	context.fill();
	context.drawImage(coverPath_canvas, 30, 30, 280, 250);
	context.drawImage(codePath_canvas, 250, 335, 50, 50);
	context.setFontSize(14);
	context.setFillStyle('#333');
	drawText(context, title, 40, 300, 100, 290); //字体换行
	context.setFontSize(14);
	context.setFillStyle('red');
	context.fillText('￥' + price, 50, 348);
	context.fillText('分享赚9元', 130, 380);
	context.setFillStyle('#666');
	context.setFontSize(12);
	context.fillText('￥' + oldPrice, 110, 348);
	// 画横线
	context.beginPath(); //开始一个新的路径
	context.setStrokeStyle('#666')
	context.moveTo(110,344); //路径的起点
	context.lineTo(170, 344); //路径的终点
	context.stroke(); //对当前路径进行描边
	context.closePath(); //关闭当前路径
	context.draw();
	wx.hideLoading();
}
const drawText = (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) => {
	var lineWidth = 0;
	var lastSubStrIndex = 0; //每次开始截取的字符串的索引 
	for (let i = 0; i < str.length; i++) {
		lineWidth += ctx.measureText(str[i]).width;
		if (lineWidth > canvasWidth) {
			ctx.setFillStyle('#333');
			ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分                
			initHeight += 20; //16为字体的高度                
			lineWidth = 0;
			lastSubStrIndex = i;
			titleHeight += 30;
		}
		if (i == str.length - 1) { //绘制剩余部分                
			ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
		}
	} // 标题border-bottom 线距顶部距离        
	titleHeight = titleHeight + 10;
	return titleHeight
}

const savePicToAlbum = tempFilePath => {
	wx.getSetting({
		success(res) {
			if (!res.authSetting['scope.writePhotosAlbum']) {
				wx.authorize({
					scope: 'scope.writePhotosAlbum',
					success() {
						wx.saveImageToPhotosAlbum({
							filePath: tempFilePath,
							success(res) {
								wx.showToast({
									title: '海报已保存到系统相册'
								});
							},
							fail(res) {
								console.log(res);
							}
						})
					},
					fail() {
						// 用户拒绝授权,打开设置页面
						wx.openSetting({
							success: function(data) {
								console.log("openSetting: success");
							},
							fail: function(data) {
								console.log("openSetting: fail");
							}
						});
					}
				})
			} else {
				wx.saveImageToPhotosAlbum({
					filePath: tempFilePath,
					success(res) {
						wx.showToast({
							title: '保存成功',
						});
					},
					fail(res) {
						console.log(res);
					}
				})
			}
		},
		fail(res) {
			console.log(res);
		}
	})
}

module.exports = {
	formatTime,
	drawImage,
	savePicToAlbum
}
