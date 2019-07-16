new Vue({
    el: '.guide-menu',
    data: {
        msgKeyword: ''
    },
    methods: {
        searchMenu: function(){
            if(this.msgKeyword == ''){
                $('.guide-box').show();
                $('.guide-menu li').show();
            }else{
                var keyword = $('.guide-menu a:contains('+this.msgKeyword.toUpperCase()+')');
                $('.guide-box').hide();
                $('.guide-menu li').hide();
                keyword.each(function(){
                   $('#'+$(this).text().toLowerCase()).show();
                });
                keyword.closest('li').show();
            }
        }
    }
});

$(function(){
    var $tabBtn = null;
    if(location.href.indexOf('#map') != -1){
        $('.guide-tit .btn-base').eq(1).siblings().removeClass('on');
        $('.guide-tit .btn-base').eq(1).addClass('on');
        $('#guide-map').fadeIn(150);
    }else{
        $tabBtn = $('.guide-tit .btn-base.on');
        $($tabBtn.find('a').attr('href')).fadeIn(150);
    }
    $('.guide-tit .btn-base a').on('click', function(e){
        $tabBtn = $(this).closest('.btn-base');
        $tabBtn.siblings().removeClass('on');
        $($tabBtn.siblings().find('a').attr('href')).hide();
        $tabBtn.addClass('on');
        $($(this).attr('href')).show();
        e.preventDefault();
    });
    
    var uiArr = [];
    var $uiBox = $('.guide-box');
    var $uiCodeBtn = $('.code-toggle'), codeStatus;
    var $uiMenu = $('.guide-menu');
    var $uiScrollbar = $uiMenu.find('.ui-customscrollbar');
    var $uiList = $uiMenu.find('ul');
    var uiBoxPos = function(i){ return $uiBox.eq(i).offset().top };
    var _top, _idx;
    var _speed = 500;
    var $gb = $('.guide-box');
    var codeArr = [];
    $gb.find('.gb-inner').each(function(i){
        codeArr.push($('.gb-inner').eq(i).html());
    });
    
    $uiBox.each(function(){
        uiArr.push($(this).attr('id'));
    });
    for(i in uiArr){
        $uiList.append('<li><a href="#'+uiArr[i]+'">'+uiArr[i].toUpperCase()+'</a></li>');    
    }
    $uiMenu.find('h2 span').text('(총 '+uiArr.length+'개)');
    $uiMenu.draggable();
    $uiMenu.find('.btn-base a').on('click', function(e){
        if($(this).hasClass('b-toggle')){
            if($uiList.css('display')=='block'){
                $uiList.stop().slideUp(300);
                $(this).text('열기');
                $(this).closest('.btn-base').css('margin-top', 0);
            }else{
                $uiList.stop().slideDown(300);
                $(this).text('접기');
                $(this).closest('.btn-base').css('margin-top', '10px');
            }    
        }
        if($(this).hasClass('b-mini')){
            $uiMenu.addClass('v-mini');
            //$uiMenu.draggable({disabled: true});
            $uiMenu.append('<a href="#" class="v-max">최대화</a>')
        }
        e.preventDefault();
        
    });
    $uiMenu.on('click', '.v-max', function(e){
        $uiMenu.removeClass('v-mini');
        //$uiMenu.draggable({disabled: false});
        $(this).remove();
        e.preventDefault();
    });
    $uiScrollbar.mCustomScrollbar({
        theme:"minimal-dark",
        mouseWheel:{scrollAmount:200}
    });
    $uiList.find('li').on('click', function(e){
        e.preventDefault();
        _idx = $uiList.find('li').index(this);
        _top = uiBoxPos(_idx)-50;
        $('html, body').stop().animate({'scrollTop': _top}, _speed); 
    });
    $(window).on('load scroll', function(){
        var scTop = $(window).scrollTop();
        var scToBottom = ($(window).scrollTop() >= $(document).height()-$(window).height());
        if(scTop < uiBoxPos(0)){
            $uiList.find('li').removeClass('on');
            $uiList.find('li').eq(0).addClass('on');
        }
        for(var i=0; i<uiArr.length; i++){
            if(scTop >= uiBoxPos(i)-60 && scTop < uiBoxPos(i+1)){
                $uiList.find('li').removeClass('on');
                $uiList.find('li').eq(i).addClass('on');
                $uiScrollbar.mCustomScrollbar('scrollTo', $uiList.find('li').eq(i), { timeout:0, scrollInertia:150, scrollEasing:'linear' });
            }
        }
        if(scToBottom){
            $uiList.find('li').removeClass('on');
            $uiList.find('li').eq(uiArr.length-1).addClass('on');
        }
    });
    
    $gb.append('<span class="btn-base code-btn"><a href="#">CODE</a></span>')
    var $codeBtn = $gb.find('.code-btn');
    $codeBtn.on('click', function(e){
        e.preventDefault();
        _idx = $codeBtn.index(this);
        $(this).hide();
        CodeMirror($gb.eq(_idx)[0], {
            value: codeArr[_idx],
            mode: 'htmlmixed',
            lineNumbers: !$(this).is('.inline'),
            readOnly: true,
            autoClearEmptyLines: false,
            lineWrapping: true,
            theme: 'monokai'
        });
        _top = uiBoxPos(_idx)-50;
        $('html, body').stop().animate({'scrollTop': _top}, 150); 
    });
    $('.dummy-txt').eq(0).load('../terms/termsOfService.html');
    $('.dummy-txt').eq(1).load('../terms/privacyCollection.html');
    $('.dummy-txt').eq(2).load('../terms/privacyOffer.html');
});