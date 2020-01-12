export default class ImageExample {
	palette(cover, title, price, oldPrice, scene) {
		return ({
			width: '750rpx',
			height: '1010rpx',
			borderRadius: '16px',
			background: '#fff',
			views: [{
					type: 'image',
					url: cover,
					css: {
						width: '690rpx',
						height: '690rpx',
						mode: 'scaleToFill',
						borderRadius: '16rpx',
						top: '30rpx',
						left: '30rpx'
					}
				},
				{
					type: 'text',
					text: title,
					css: {
						top: '740rpx',
						left: '30rpx',
						lineHeight: '40rpx',
						width: '690rpx',
						color: '#333333',
						fontSize: '30rpx',
					},
				},
				{
					type: 'text',
					text: "活动价:￥" + price,
					css: {
						top: '810rpx',
						left: '30rpx',
						width: '690rpx',
						color: '#F83B1D',
						fontWeight: 'bold',
						fontSize: '36rpx'
					},
				},
				{
					type: 'text',
					text: "原价:￥" + oldPrice,
					css: {
						top: '820rpx',
						left: '270rpx',
						width: '690rpx',
						color: '#666',
						fontSize: '26rpx',
						textDecoration: 'line-through'
					}
				},
				{
					type: 'image',
					url: 'https://shop.dnote.cn/api/v1/acode?is_hyaline=false&auto_color=false&line_color={r: 0,g: 0,b: 0}&width=430&page=pages/details/index&scene=' +
						scene,
					css: {
						top: '790rpx',
						right: '40rpx',
						width: '140rpx',
						height: '140rpx',
					},
				},
				{
					type: 'image',
					url: '/images/logo.jpeg',
					css: {
						width: '70rpx',
						height: '70rpx',
						borderRadius: '35rpx',
						top: '900rpx',
						left: '30rpx'
					}
				},
				{
					type: 'text',
					text: "四季滋味",
					css: {
						top: '900rpx',
						left: '62px',
						width: '690rpx',
						color: '#333',
						fontWeight: 'bold',
						fontSize: '28rpx'
					}
				},
				{
					type: 'text',
					text: "应季现摘现发，纯天然放心吃",
					css: {
						top: '946rpx',
						left: '62px',
						width: '690rpx',
						color: '#999',
						fontSize: '24rpx'
					}
				}, {
					type: 'text',
					text: "长按识别",
					css: {
						top: '936rpx',
						right: '66rpx',
						color: '#999',
						fontSize: '22rpx'
					}
				}
			]
		});
	}
}
