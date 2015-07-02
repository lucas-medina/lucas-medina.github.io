var mobile_sim = {

	valores : {
		'count-email-texto' : 0,
        'count-apps-mensagens' : 0,
        'count-email-anexo' : 0,
        'count-pagina-web' : 0,
        'count-facebook' : 0,
        'count-instagram' : 0,
        'count-chat-facebook' : 0,
        'count-baixar-apps' : 0,
        'count-videos' : 0,

        'count-current-result' : 0,
        'count-final-result': 0
	},

	// Inicializa as funções
	init : function(){
		this.setSliders();
		this.bind();
	},

	// Define os sliders do simulador, pelo jQuery Mobile
	setSliders : function(){
		$('.slider-set').slider();
	},
	// Atribui demais funções e eventos
	bind : function(){
		$('.mobile-sim-action-device-item').on('click tap', this.setDevice); // Define device
		$('.slider-set').on('change', this.calcSlider); // Calcula valores dos sliders

		$('.btn-simular').on('click tap', this.initResult); // A magia exibida ao usuário é aqui
	},

	// Configura o dispositivo ativo. Isso é utilizado em initResult
	setDevice : function(){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	},

	// Calcula os valores em cada slider, e executa resultSlider, para receber somas
	calcSlider : function(){
		var dataSlide = $(this).data('slide');
		$('.value[data-value="' + $(this).data('slide') + '"]').text($(this).val());
		switch(dataSlide){
			case 'email-texto' :
				mobile_sim.valores['count-' + dataSlide] = $(this).val() * 10 / 1024;
				break;
			case 'apps-mensagens' :
				mobile_sim.valores['count-' + dataSlide] = $(this).val() * 5 / 1024;
				break;
			case 'email-anexo' :
				mobile_sim.valores['count-' + dataSlide] = $(this).val() * 350 / 1024;
				break;
			case 'pagina-web' :
				mobile_sim.valores['count-' + dataSlide] = $(this).val() * 300 / 1024;
				break;
			case 'facebook' :
				mobile_sim.valores['count-' + dataSlide] = $(this).val() * 5 / 1024;
				break;
			case 'instagram' :
				mobile_sim.valores['count-' + dataSlide] = $(this).val() * 300 / 1024;
				break;
			case 'chat-facebook' :
				mobile_sim.valores['count-' + dataSlide] = $(this).val() * 38 / 1024;
				break;
			case 'baixar-apps' :
				mobile_sim.valores['count-' + dataSlide] = $(this).val() * 4096 / 1024;
				break;
			case 'videos' :
				mobile_sim.valores['count-' + dataSlide] = $(this).val() * 2048 / 1024;
				break;
		}
		console.log(dataSlide + ': ' + mobile_sim.valores['count-' + dataSlide]);
		mobile_sim.resultSlider();
	},
	// Soma os resultados dos sliders
	resultSlider : function(){
		mobile_sim.valores['count-current-result'] = 0;
		$('.slider-set').each(function(){
			mobile_sim.valores['count-current-result'] += mobile_sim.valores['count-' + $(this).data('slide')];
		});
		mobile_sim.valores['count-final-result'] = mobile_sim.valores['count-current-result'];
		console.log('soma: ' + mobile_sim.valores['count-final-result']);
	},
	// Executa ao clicar no botão 'Simular'
	initResult : function(){
		// Anima a exibição de novo conteúdo
		$('.result-progressbar').progressbar();
		$('#mobile-sim-action-intro, #mobile-sim-action-wrapper').fadeOut(500, function(){
			var range = parseInt(mobile_sim.valores['count-final-result']/2);
			$(this).addClass('ninja').attr('style', '');
			$(window).scrollTop($('#mobile-sim-result-wrapper').offset().top);
			$('#mobile-sim-result-wrapper').removeClass('ninja');
			$('.result-progressbar').progressbar('value', range);
			$('.progressbar-meter').css('margin-left', $('.result-progressbar').progressbar('value') - 1 + '%');

			// Ajusta o Progressbar Meter se as dimensões ocupadas forem maiores que o intencionado
			mobile_sim.meterChange();
		});

		// Exibe os valores certos na 'Progressbar Meter'
		console.log(mobile_sim.valores['count-final-result']);
		mobile_sim.meterText();

	},

	// meterText atualiza o texto da Progressbar Meter
	meterText : function(){
		var resultado = 0;
		resultado = mobile_sim.valores['count-final-result'].toFixed(2).replace('.000', '').replace('.9999', '');
		$('.progressbar-meter').text(resultado + 'MB');
	},

	// meterChange muda as classes do método se suas dimensões forem grandes demais para a tela
	// setInterval verifica por 2,5s, e então para.
	meterChange : function(){
		var timer = 0;
		var interval = setInterval(function(){
			console.info('margin: ' + $('.progressbar-meter').offset().left + $('.progressbar-meter').outerWidth());
			if ($('.progressbar-meter').offset().left + $('.progressbar-meter').outerWidth() > window.innerWidth - 5){
				console.log('oh hell');
				$('.progressbar-meter').addClass('left-aligned');
			}
			timer += 125;
			if (timer >= 2500){
				clearTimeout(interval);
			}
		}, 125);
	},


	// Helper Function - reinicializa os sliders
	resetSliders : function(e){
		$('.slider-set').val(0).slider("refresh");
		$('.value-counter .value').text(0);
		for (var prop in mobile_sim.valores){
			if (mobile_sim.valores.hasOwnProperty(prop)){
				mobile_sim.valores[prop] = 0;
			}
		}
	}

}
mobile_sim.init();