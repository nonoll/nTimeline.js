# nTimeline.js
GSAP - Timeline 애니메이션 컨트롤러 UI 구성을 위한 플러그인

화면 구성 및 플러그인을 ajax로 로드 하므로 로컬에서 테스트시 크롬으로 할것

[크롬 로컬 ajax 설정]( http://blog.naver.com/nonoll88/220302452764 "크롬 로컬 ajax 설정" ) 참조

#Screenshot
![ScreenShot](/screenshot/1.png)
***
![ScreenShot](/screenshot/2.png)
***
![ScreenShot](/screenshot/3.png)
***
![ScreenShot](/screenshot/4.png)
***
![ScreenShot](/screenshot/5.png)
***
![ScreenShot](/screenshot/6.png)

#Setup
jquery, GSAP, nTimeline.js 를 웹페이지에 추가
<pre lang="html">
<!-- Requires {{ -->
&lt;script type="text/javascript" src="./js/jquery-1.8.3.min.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="./js/TweenMax.min.js"&gt;&lt;/script&gt;
<!-- Requires }} -->

<!-- nTimeline.js {{ -->
&lt;script type="text/javascript" src="./nTimeline/nTimeline.js"&gt;&lt;/script&gt;
<!-- nTimeline.js }} -->
</pre>

#Methods
- ``window.nTimeline.init``

<pre lang="javascript">
// 실행
window.nTimeline.init( options );

// 옵션
options = {
			timeline 		GSAP - Timeline
			autorun 		Timeline Animate Autorun Flag
			repeat 			Timeline Animate Repeat Flag
			debug 			nTimeline.js Debug log Flag
			modulePath 		nTimeline.js Module Path
			align 			nTimeline.js Debbuger Display Align ( 'top', 'bottom' )
}
</pre>

#Usage
**1. 기본 사용**

window.nTimeline.init( { timeline : GSAP Timeline } );

사용할 GSAP 의 Timeline을 옵션값에 넣어 실행

<pre lang="javascript">
var master = new TimelineMax();
	master.add( sec1() )		// Scene
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
</pre>

**2. 기본 옵션**
<pre lang="javascript">
window.nTimeline.options = {
								timeline : null
								, autorun : true
								, repeat : true
								, debug : true
								, modulePath : './nTimeline/'
								, align : 'top' // 'bottom'
							};
</pre>

##History
1. 2015.07.21 첫 버전 등록