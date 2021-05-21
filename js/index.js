$(function() {
	var img_swiper = null
	img_swiper = new Swiper('.img_swiper .swiper-container', {
		slidesPerView: 6,
		loop: true,
		loopAdditionalSlides: 5,
		observer:true,
		observeParents:true, // 当Swiper的父元素变化时，会更新swiper
		navigation: {
			nextEl: '.swiper-button-next.one',
			prevEl: '.swiper-button-prev.one',
		},
	})
	
	$('.swiper_slide_img').click(function() {
		var url = $(this).data('url');
		$('.pic_container').find('.pic_container_inner img').attr('src', url);
		$('.pic_container').fadeIn('slow');
		$(document.body).css({
			"overflow-x":"hidden",
			"overflow-y":"hidden"
		});
	}) 

	$('.pic_container').on('click', function() {
		$(document.body).css({
			"overflow-x":"auto",
			"overflow-y":"auto"
		});
		$('.pic_container').fadeOut('slow');
		$('#box').css('transform', 'scale(1.5)')
	})
})