<template>
	<canvas v-if="canvasId" class="ec-canvas" :id="canvasId" :canvasId="canvasId" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @error="error"></canvas>
</template>

<script>
import WxCanvas from './wx-canvas';
export default {
	props: {
		canvasId: {
			type: String,
			default: 'ec-canvas'
		},
		lazyLoad: {
			type: Boolean,
			default: false
		},
		disableTouch: {
			type: Boolean,
			default: false
		},
		throttleTouch: {
			type: Boolean,
			default: false
		}
	},
	// #ifdef H5
	mounted() {
		if (!this.lazyLoad) this.init();
	},
	// #endif
	// #ifndef H5
	onReady() {
		if (!this.lazyLoad) this.init();
	},
	// #endif
	methods: {
		setChart(chart) {
			this.chart = chart;
		},
		init() {
			const { canvasId } = this;
			this.ctx = uni.createCanvasContext(canvasId, this);
			this.canvas = new WxCanvas(this.ctx, canvasId);
			const query = uni.createSelectorQuery().in(this);
			query
				.select(`#${canvasId}`)
				.boundingClientRect(res => {
					if (!res) {
						setTimeout(() => this.init(), 50);
						return;
					}
					this.$emit('onInit', {
						canvas: this.canvas,
						width: res.width,
						height: res.height
					});
				})
				.exec();
		},
		canvasToTempFilePath(opt, callback) {
			const this_ = this;
			const { canvasId } = this_;
			const ctx = uni.createCanvasContext(canvasId, this_);
			ctx.fillStyle = '#000';
			ctx.draw(true, () => {
				setTimeout(function() {
					uni.canvasToTempFilePath(
						{
							canvasId,
							...opt,
							success: function(res) {
								// 在H5平台下，tempFilePath 为 base64
								callback(res.tempFilePath);
							},
							fail: function(err) {
								console.log(err);
							}
						},
						this_
					);
				}, 1000);
			});
		},
		touchStart(e) {
			const { disableTouch, chart } = this;
			if (disableTouch || !chart || !e.mp.touches.length) return;
			const touch = e.mp.touches[0];
			chart._zr.handler.dispatch('mousedown', {
				zrX: touch.x,
				zrY: touch.y
			});
			chart._zr.handler.dispatch('mousemove', {
				zrX: touch.x,
				zrY: touch.y
			});
		},
		touchMove(e) {
			const { disableTouch, throttleTouch, chart, lastMoveTime } = this;
			if (disableTouch || !chart || !e.mp.touches.length) return;
			if (throttleTouch) {
				const currMoveTime = Date.now();
				if (currMoveTime - lastMoveTime < 240) return;
				this.lastMoveTime = currMoveTime;
			}
			const touch = e.mp.touches[0];
			chart._zr.handler.dispatch('mousemove', {
				zrX: touch.x,
				zrY: touch.y
			});
		},
		touchEnd(e) {
			const { disableTouch, chart } = this;
			if (disableTouch || !chart) return;
			const touch = e.mp.changedTouches ? e.mp.changedTouches[0] : {};
			chart._zr.handler.dispatch('mouseup', {
				zrX: touch.x,
				zrY: touch.y
			});
			chart._zr.handler.dispatch('click', {
				zrX: touch.x,
				zrY: touch.y
			});
		}
	}
};
</script>

<style scoped>
.ec-canvas {
	width: 100%;
	height: 100%;
	flex: 1;
}
</style>
