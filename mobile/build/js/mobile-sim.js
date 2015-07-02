// Obs.: A classe .ninja é amor. A classe .ninja é vida, 
// e basicamente traz um display:none sobre os que a possuem

var mobile_sim = {

	valores : {
		//Valores de simulação
		'count-email-texto' : 0,
        'count-apps-mensagens' : 0,
        'count-email-anexo' : 0,
        'count-pagina-web' : 0,
        'count-facebook' : 0,
        'count-instagram' : 0,
        'count-chat-facebook' : 0,
        'count-baixar-apps' : 0,
        'count-videos' : 0,

        // Valores de resultado
        'count-current-result' : 0,
        'count-final-result': 0,

        // Valores de seleção de dispositivo
        'device-selected' : ''
	},

	// Inicializa as funções
	init : function(){
		this.setSliders();
		this.bind();
	},

	// Define os sliders do simulador, pelo jQuery Mobile. Os parâmetros estão no HTML
	setSliders : function(){
		$('.slider-set').slider();
	},

	// Atribui demais funções e eventos
	bind : function(){
		$('.mobile-sim-action-device-item').on('click tap', this.setDevice); // Define device
		$('.slider-set').on('change', this.calcSlider); // Calcula valores dos sliders

		$(window).resize(this.meterChange); // Ajusta a classe do Progressbar Meter;

		$('.btn-simular').on('click tap', this.initResult); // A magia exibida ao usuário é aqui
		$('.btn-voltar').on('click tap', this.resetResult);
	},

	// Configura o dispositivo ativo. O dispositivo ativo é utilizado em initResult
	setDevice : function(){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
		mobile_sim.valores['device-selected'] = $(this).data('device');
		console.log(mobile_sim.valores['device-selected']);
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
			$(window).scrollTop($('#mobile-sim-result-wrapper').offset().top - 18);
			$('#mobile-sim-result-wrapper').removeClass('ninja');
			$('.result-progressbar').progressbar('value', range);
			$('.progressbar-meter').css('margin-left', $('.result-progressbar').progressbar('value') - 1 + '%');

			// Ajusta o Progressbar Meter se as dimensões ocupadas forem maiores que o intencionado
			mobile_sim.meterChange();
		});

		// Exibe os valores certos na 'Progressbar Meter'
		console.log(mobile_sim.valores['count-final-result']);
		mobile_sim.meterText();

		// Define plano ideal, com base nos valores armazenados
		mobile_sim.resultGet();
	},

	// Fornece os resultados de texto, e links, com base no resultado
	// Os resultados possíveis são: 10, 30, 100 e 200
	// 10 e 30 somente para celulares e smartphones

	resultGet : function(){
		var finalResult = mobile_sim.valores['count-final-result'];
		finalResult = finalResult.toFixed(2).replace('.000', '').replace('.9999', '');
		var selectedDevice = mobile_sim.valores['device-selected'];
		console.log('result: ' + finalResult + ', device: ' + selectedDevice);

		if (selectedDevice == 'smartphone' || selectedDevice == 'celular'){
			console.log(selectedDevice);
			if (finalResult < 10){
				mobile_sim.resultPlanos({
					nome : 'Infinity Web 10',
					desc : 'Com essa oferta você tem <b>10MB de internet</b> por dia.',
					ativar : 'Para habilitar essa oferta, basta desativar qualquer outra oferta de Internet.',
					preco : 'R$ 0,75',
					link : '#'
				});
				$('.sms-activate').addClass('ninja-this-time');
				$('.btn-ativar').addClass('ninja-this-time');
			} else if (finalResult >= 10 && finalResult < 30){
				mobile_sim.resultPlanos({
					nome : 'Infinity Web 30',
					desc : 'Com essa oferta você tem <b>30MB de internet</b> por dia.',
					ativar : 'Envie <b>WEB30 para 2000</b>',
					preco : 'R$ 1,00',
					link : 'https://meutim.tim.com.br/menu/promocoes?utm_source=site-tim&utm_medium=link-paginainfinityweb&utm_campaign=infinity-web-30'
				});
			} else if (finalResult >= 30 && finalResult < 100){
				console.log('>30');
				mobile_sim.resultPlanos({
					nome : 'Infinity Web 100',
					desc : 'Com essa oferta você tem <b>100MB de internet</b> por dia.',
					ativar : 'Envie <b>WEB100 para 2000</b>',
					preco : 'R$ 1,99',
					link : 'https://meutim.tim.com.br/menu/promocoes?utm_source=site-tim&utm_medium=link-paginainfinityweb&utm_campaign=infinity-web-100'
				});
			} else if (finalResult >= 100){
				mobile_sim.resultPlanos({
					nome : 'Infinity Web 200',
					desc : 'Com essa oferta você tem <b>200MB de internet</b> por dia.',
					ativar : 'Envie <b>WEB200 para 2000</b>',
					preco : 'R$ 2,99',
					link : 'https://meutim.tim.com.br/menu/promocoes?utm_source=site-tim&utm_medium=link-paginainfinityweb&utm_campaign=infinity-web-200'
				});
			}
		} else if (selectedDevice == 'computador' || selectedDevice == 'tablet'){
			if (finalResult < 100){
				mobile_sim.resultPlanos({
					nome : 'Infinity Web 100',
					desc : 'Com essa oferta você tem <b>100MB de internet</b> por dia.',
					ativar : 'Envie <b>WEB100 para 2000</b>',
					preco : 'R$ 1,99',
					link : 'https://meutim.tim.com.br/menu/promocoes?utm_source=site-tim&utm_medium=link-paginainfinityweb&utm_campaign=infinity-web-100'
				});
			} else {
				mobile_sim.resultPlanos({
					nome : 'Infinity Web 200',
					desc : 'Com essa oferta você tem <b>200MB de internet</b> por dia.',
					ativar : 'Envie <b>WEB200 para 2000</b>',
					preco : 'R$ 2,99',
					link : 'https://meutim.tim.com.br/menu/promocoes?utm_source=site-tim&utm_medium=link-paginainfinityweb&utm_campaign=infinity-web-200'
				});
			}
		}
	},

	// Reinicializa tudo - textos, sliders, dispositivos e resultados
	resetResult : function(e){
		for (var prop in mobile_sim.valores){
			if (mobile_sim.valores.hasOwnProperty(prop)){
				mobile_sim.valores[prop] = 0;
			}
		}
		$('.mobile-sim-action-device-item').removeClass('active');
		$('#mobile-sim-result-wrapper').fadeOut(500, function(){
			$('#mobile-sim-action-intro, #mobile-sim-action-wrapper').removeClass('ninja');
			$(this).addClass('ninja').attr('style', '');
			$(window).scrollTop($('#mobile-sim-action-intro').offset().top - 20);
			$('.slider-set').val(0).slider("refresh");
			$('.value-counter .value').text(0);
			$('.ninja-this-time').removeClass('ninja-this-time');
			$('.left-aligned').removeClass('left-aligned');
		});

	},

	// Helper functions!
	// Estão sendo invocadas dentro de outros métodos, para auxiliar

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
			if ($('.progressbar-meter').hasClass('left-aligned') == false){
				if ($('.progressbar-meter').offset().left + $('.progressbar-meter').outerWidth() > window.innerWidth - 5){
					console.log('oh hell');
					$('.progressbar-meter').addClass('left-aligned');
					clearTimeout(interval);
				}
			}		
			timer += 125;
			if (timer >= 2500){
				clearTimeout(interval);
			}
		}, 125);
	},
	
	// Retorna: Nome do plano, descrição, como ativar, preço
	resultPlanos : function(args){
		$('[data-label="plano-nome"]').text(args.nome);
		$('[data-label="plano-desc"]').html(args.desc);
		$('[data-label="plano-ativar"]').html(args.ativar);
		$('[data-label="plano-preco"]').text(args.preco);
		$('[data-label="plano-link"]').attr('href', args.link);	
	}
}
mobile_sim.init();