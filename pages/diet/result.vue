<template>
	<view class="page-result">
		<view class="score-content">
			<image class="background" src="../../static/diet/diet-bg-01.svg" mode="aspectFit"></image>
			<view class="score">{{ score }}′</view>
			<view class="title">
				<image class="icon" src="../../static/diet/diet-icon-01.svg" mode="aspectFit"></image>
				<view class="text">膳食评分</view>
			</view>
			<view class="tag">“{{ score_lable }}”</view>
		</view>
		<!-- <view class="problem-content">
			<image class="pic" :src="dietary_pagoda_picture" mode="aspectFit"></image>
			<rich-text :nodes="report"></rich-text>
		</view> -->
		<view class="problem-content" v-if="dispute.length>0">
			<view class="title">问题排查</view>
			<view class="problem-list">
				<view class="problem-item" v-for="(item,index) in dispute" :key="index">
					<view class="text">{{item}}</view>
				</view>
			</view>
		</view>
		<view class="advice-content">
			<view class="title">膳食建议</view>
			<image class="img" src="../../static/diet/diet-img-01.png" mode="widthFix"></image>
		</view>
		<view class="desc-content">
			<view class="title">牢记健康十条</view>
			<view class="desc-list">
				<view class="desc-item">
					<view class="text">一、食物多样，谷类为主，粗细搭配</view>
				</view>
				<view class="desc-item">
					<view class="text">二、多吃蔬菜水果和薯类</view>
				</view>
				<view class="desc-item">
					<view class="text">三、每天吃奶类、大豆或其制品</view>
				</view>
				<view class="desc-item">
					<view class="text">四、常吃适量的鱼、禽、蛋和瘦肉</view>
				</view>
				<view class="desc-item">
					<view class="text">五、减少烹调用油、清淡少盐</view>
				</view>
				<view class="desc-item">
					<view class="text">六、食不过量，天天运动，保持健康体重</view>
				</view>
				<view class="desc-item">
					<view class="text">七、三餐分配要合理，零食要适当</view>
				</view>
				<view class="desc-item">
					<view class="text">八、每天足量饮水，合理选用饮料</view>
				</view>
				<view class="desc-item">
					<view class="text">九、如饮酒应限量</view>
				</view>
				<view class="desc-item">
					<view class="text">十、吃新鲜卫生的食物</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="handleReset">我要重测</view>
	</view>
</template>

<script>
	import {
		getSurveyResult
	} from '@/api/diet.js';
	export default {
		data() {
			return {
				score: '',
				score_lable: '',
				dietary_pagoda_picture: '',
				dispute: []
			};
		},
		onLoad() {
			getSurveyResult().then(
				result => {
					const {
						score,
						score_lable,
						dietary_pagoda_picture,
						dispute
					} = result;
					this.score = score;
					this.score_lable = score_lable;
					this.dietary_pagoda_picture = dietary_pagoda_picture;
					this.dispute = dispute;
				},
				err => {}
			);
		},
		methods: {
			handleReset() {
				uni.reLaunch({
					url: '/pages/diet/one'
				});
			}
		}
	};
</script>

<style lang="less">
	page {
		background-color: #f7f6f9;
	}

	.page-result {
		.score-content {
			position: relative;
			height: 396rpx;
			margin: 28rpx 32rpx 30rpx 32rpx;

			.background {
				width: 100%;
				height: 396rpx;
			}

			.score {
				position: absolute;
				top: 78rpx;
				left: 68rpx;
				font-size: 86rpx;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: #ffffff;
				line-height: 166rpx;
			}

			.title {
				position: absolute;
				left: 64rpx;
				top: 228rpx;
				display: flex;
				align-items: center;

				.icon {
					width: 38rpx;
					height: 36rpx;
					margin-right: 18rpx;
				}

				.text {
					font-size: 24rpx;
					font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
					font-weight: bold;
					color: #ffffff;
					line-height: 34rpx;
				}
			}

			.tag {
				position: absolute;
				left: 60rpx;
				bottom: 28rpx;
				width: 176rpx;
				height: 64rpx;
				background: rgba(255, 255, 255, 0.22);
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: #ffffff;
				line-height: 64rpx;
				text-align: center;
			}
		}

		.problem-content {
			margin: 30rpx 32rpx;
			background: #ffffff;
			border-radius: 16rpx;

			.title {
				padding: 30rpx 0 4rpx 30rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 42rpx;
			}

			.problem-list {
				.problem-item {
					display: flex;
					align-items: center;
					min-height: 88rpx;
					margin: 0 32rpx;
					padding: 30rpx 0;
					border-bottom: 2rpx dashed #e1e1e1;
					box-sizing: border-box;

					&:last-child {
						border-bottom: none;
					}

					.text {
						font-size: 24rpx;
						font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
						font-weight: 400;
						color: #666666;
						line-height: 34rpx;
					}
				}
			}
		}

		.advice-content {
			height: 564rpx;
			margin: 30rpx 32rpx;
			background: #ffffff;
			border-radius: 16rpx;

			.title {
				padding: 30rpx 0 42rpx 30rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 42rpx;
			}

			.img {
				width: 686rpx;
			}
		}

		.desc-content {
			height: 956rpx;
			margin: 30rpx 32rpx;
			background: #ffffff;
			border-radius: 16rpx;

			.title {
				padding: 30rpx 0 4rpx 30rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 42rpx;
			}

			.desc-list {
				.desc-item {
					display: flex;
					align-items: center;
					height: 88rpx;
					margin: 0 32rpx;
					border-bottom: 2rpx dashed #e1e1e1;
					box-sizing: border-box;

					&:last-child {
						border-bottom: none;
					}

					.text {
						font-size: 24rpx;
						font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
						font-weight: 400;
						color: #666666;
						line-height: 34rpx;
					}
				}
			}
		}

		.btn {
			width: 226rpx;
			height: 72rpx;
			margin: 0 auto 90rpx auto;
			background: #2975ff;
			border-radius: 4rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #ffffff;
			line-height: 72rpx;
			text-align: center;
		}
	}
</style>
