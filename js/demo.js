/**
 * @description
 * 	Honda Propose Site
 * @author Fishingtree Dev( Hyunkwan Roh )
 */

// Extreior ~ Sense
function sec1() {
	var tl = new TimelineLite(),
		$section = $( 'div.section_1' ),
		$text = $section.find( 'div.text' ),
		$bg = $section.find( 'div.bg' );

	tl.fromTo( $bg, 1, { opacity: 0 }, { opacity: 1 } );
	tl.fromTo( $text, 1, { opacity: 0 }, { opacity: 1 }, "+=1" );
	return tl;
};

// 달릴수록 ~ 경제성
function sec2() {
	var tl = new TimelineLite(),
		$section = $( 'div.section_2' ),
		$bg = $section.find( 'div.bg' ),
		$effect = $section.find( 'div.effect' ),
		$text_title = $section.find( 'div.text.title' ),
		$text_desc = $section.find( 'div.text.desc' ),
		$info = $section.find( 'div.info' );

	tl.fromTo( $bg, 2, { opacity: 0, marginTop: -379 }, { opacity: 1, marginTop: 0, ease: Strong.easeInOut }, 0 );
	tl.fromTo( $effect, 1.5, { opacity: 0 }, { opacity: 1, ease: Bounce.easeOut }, '-=0.5' );
	tl.fromTo( $text_title.find( 'img' ), 1, { opacity: 0, marginTop: 38 }, { opacity: 1, marginTop: 0, ease: Strong.easeInOut }, '-=2.5' );
	tl.fromTo( $text_desc, 2, { opacity: 0 }, { opacity: 1, ease: Strong.easeInOut }, '-=2.5' );
	tl.fromTo( $info, 2, { opacity: 0 }, { opacity: 1, ease: Strong.easeInOut }, '-=2' );
	return tl;
};

// 드라이빙~쾌적함까지
function sec7() {
	var tl = new TimelineLite(),
		$section = $( 'div.section_7' ),
		$bg = $section.find( 'div.bg' ),
		$effect = $section.find( 'div.effect' ),
		$text_title = $section.find( 'div.text.title' ),
		$text_desc = $section.find( 'div.text.desc' ),
		$info = $section.find( 'div.info' ),
		$con1 = $section.find( 'div.con_1' ),
		$con2 = $section.find( 'div.con_2' ),
		$area = $section.find( 'area' );

	$con2.hide();

	$area.click(function(event) {
		event.preventDefault();

		var href = $(this).attr( 'href' );
		switch( href ) {
			case '#con_1':
				$con1.stop().fadeIn();
				$con2.stop().fadeOut();
				$con1.find( 'div.spot' ).stop().hide( 0 );
				$con1.find( 'div.spot' ).stop().delay( 300 ).fadeIn( 500 );
				break;
			case '#con_2':
				$con1.stop().fadeOut();
				$con2.find( 'div.spot' ).stop().hide( 0 );
				$con2.stop().fadeIn();
				$con2.find( 'div.spot' ).stop().delay( 300 ).fadeIn( 500 );
				break;
			case '#spot':
				//alert( 'spot' );
				$( 'div.pop' ).show();
				$( 'div.dim' ).show();
				break;
		};
	});

	$( 'div.pop' ).find( 'area' ).click(function(event) {
		event.preventDefault();

		$( 'div.pop' ).hide();
		$( 'div.dim' ).hide();
	});

	tl.fromTo( $text_title.find( 'img' ), 2, { opacity: 0, marginLeft: -100 }, { opacity: 1, marginLeft: 0, ease: Strong.easeInOut }, 0 );
	tl.fromTo( $text_desc.find( 'img' ), 2, { opacity: 0, marginLeft: 100 }, { opacity: 1, marginLeft: 0, ease: Strong.easeInOut }, 0 );

	tl.fromTo( $con1.find( 'div.menu' ), 2, { opacity: 0 }, { opacity: 1, ease: Strong.easeInOut }, '-=1.5' );
	tl.fromTo( $con1.find( 'div.car' ).find( 'img' ), 1.5, { opacity: 0, marginLeft: 5 }, { opacity: 1, marginLeft: 0, ease: Strong.easeInOut }, '-=1.5' );
	tl.fromTo( $con1.find( 'div.spot' ), 2, { opacity: 0 }, { opacity: 1, ease: Strong.easeInOut }, '-=0.5' );
	return tl;
};

// 차량내 인테리어
function sec8() {
	var tl = new TimelineLite(),
		$section = $( 'div.section_8' ),
		$obj1 = $section.find( 'div.obj1' ),
		$obj2 = $section.find( 'div.obj2' ),
		$obj3 = $section.find( 'div.obj3' );

	tl.fromTo( $obj1.find( 'img' ), 1.5, { opacity: 0, marginTop: 269 }, { opacity: 1, marginTop: 0, ease: Strong.easeInOut }, 0 );
	tl.fromTo( $obj2.find( 'img' ), 1.5, { opacity: 0, marginTop: -270 }, { opacity: 1, marginTop: 0, ease: Strong.easeInOut }, '-=1.2' );
	tl.fromTo( $obj3.find( 'img' ), 1.5, { opacity: 0, marginTop: -270 }, { opacity: 1, marginTop: 0, ease: Strong.easeInOut }, '-=1' );
	return tl;
};

// Earth ~ Tech
function sec9() {
	var tl = new TimelineLite(),
		$section = $( 'div.section_9' ),
		$text_title = $section.find( 'div.text.title' ),
		$text_desc = $section.find( 'div.text.desc' ),
		$indi = $section.find( 'div.indi' ),
		$effect = $section.find( 'div.effect' ),
		$car = $section.find( 'div.car' );

	tl.fromTo( $car.find( 'img' ), 2.5, { opacity: 0, marginLeft: -896 }, { opacity: 1, marginLeft: 0, ease: Strong.easeInOut }, 0 );
	tl.fromTo( $effect, 1.5, { opacity: 0 }, { opacity: 1, ease: Strong.easeInOut } );

	tl.fromTo( $text_title.find( 'img' ), 1, { opacity: 0, marginLeft: -150 }, { opacity: 1, marginLeft: 0, ease: Strong.easeInOut }, '-=3' );
	tl.fromTo( $text_desc, 1.5, { opacity: 0 }, { opacity: 1, ease: Strong.easeInOut }, '-=1.5' );
	tl.fromTo( $indi, 1.5, { opacity: 0 }, { opacity: 1, ease: Strong.easeInOut }, '-=1' );
	return tl;
};

// Belief ~ Safe
function sec10() {
	var tl = new TimelineLite(),
		$section = $( 'div.section_10' ),
		$text_title = $section.find( 'div.text.title' ),
		$text_desc = $section.find( 'div.text.desc' ),
		$indi = $section.find( 'div.indi' ),
		$effect = $section.find( 'div.effect' ),
		$car = $section.find( 'div.car' ),
		$line = $section.find( 'div.line img' );

	tl.fromTo( $car.find( 'img' ), 3, { opacity: 0, marginTop: -250, marginRight: -500 }, { opacity: 1, marginTop: 0, marginRight: 0, ease: Back.easeInOut.config(0.7) }, 0 );
	tl.fromTo( $effect, 3, { marginTop: -250, marginRight: -500 }, { marginTop: 0, marginRight: 0, ease: Back.easeInOut.config(0.7) }, 0 );
	tl.fromTo( $effect, 1, { opacity: 0 }, { opacity: 1, ease: Strong.easeInOut }, '-=1.5' );

	tl.fromTo( $line.eq( 0 ), 1, { opacity: 0 }, { opacity: 0.4, ease: Strong.easeInOut }, '-=1.5' );
	tl.fromTo( $line.eq( 1 ), 1, { opacity: 0 }, { opacity: 0.4, ease: Strong.easeInOut }, '-=1.2' );
	tl.fromTo( $line.eq( 2 ), 1, { opacity: 0 }, { opacity: 0.4, ease: Strong.easeInOut }, '-=1' );
	tl.fromTo( $line.eq( 3 ), 1, { opacity: 0 }, { opacity: 0.4, ease: Strong.easeInOut }, '-=0.8' );

	tl.fromTo( $text_title.find( 'img' ), 1, { opacity: 0, marginLeft: -150 }, { opacity: 1, marginLeft: 0, ease: Strong.easeInOut }, '-=2' );
	tl.fromTo( $text_desc, 1.5, { opacity: 0 }, { opacity: 1, ease: Strong.easeInOut }, '-=1.5' );
	tl.fromTo( $indi, 1.5, { opacity: 0 }, { opacity: 1, ease: Strong.easeInOut }, '-=1' );
	return tl;
};

$(document).ready(function() {
	var master = new TimelineMax();
	master.add( sec1() )
			.add( sec2() )
			.add( sec7() )
			.add( sec8() )
			.add( sec9() )
			.add( sec10() );
	/*
	window.nTimeline.init({ 
							timeline : master
							, align: 'top'
							});
	*/

	window.nTimeline.init({ 
							timeline : master
							, autorun : true
							, repeat : false
							, debug : true
							, modulePath : './nTimeline/'
							, align: 'top'
							});
});
