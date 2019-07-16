(function ($, window, document, undefined) {
	$.fn.customCheckbox = function(){
		return this.each(function(){
			var $this = $(this);
			var $chk = $this.find('[type="checkbox"]');
			var $label = $this.find('label');
			
			if(!$chk || $this.hasClass('chk-initialized')){return false;}
			
			//checked 유효체크
			if($chk.prop('checked')){
				$label.addClass('on');
			}else{
				$label.removeClass('on');
			}
			
			//disabled
			if($chk.prop('disabled')){
			   $this.addClass('disabled');
			}
			
			//label click
			$label.on('click', function(){
				if($label.closest('.disabled').hasClass('disabled')){return;}
				if($label.hasClass('on')){
					$label.removeClass('on');
				}else{
					$label.addClass('on');
				}
			});
			
			//initialized
			$this.addClass('chk-initialized');
		});
	}
	$.fn.customRadio = function(){
		return this.each(function(){
			var $this = $(this);
			var $radio = $this.find('[type="radio"]');
			var $label = $this.find('label');
			var $name = $radio.attr('name');
			
			if(!$radio || $this.hasClass('radio-initialized')){return false;}
			
			//name 저장
			$label.name = $name;
			
			//checked 유효체크
			if($radio.prop('checked')){
				$label.addClass('on');
			}else{
				$label.removeClass('on');
			}
			
			//disabled
			if($radio.prop('disabled')){
			   $this.addClass('disabled');
			}
			
			//label click
			$label.on('click', function(){
				if($label.closest('.disabled').hasClass('disabled')){return;}
				if(!$label.hasClass('on')){
					$('[name="'+$label.name+'"]').next('label.on').removeClass('on');
					$label.addClass('on');	
				}
			});
			
			//initialized
			$this.addClass('radio-initialized');
		});
	}
	$.fn.uiCustomNumber = function(){
		return this.each(function(){
			var $this = $(this);
			var min, max;
			if($this.data('ctn') != undefined){
				min = $this.data('ctn').min || 0;
				max = $this.data('ctn').max || 9999;
			}else{
				min = 0;
				max = 9999;
			}
			if($this.find('input').val() == min) $this.find('.b-minus').addClass('disabled');
			if($this.find('input').val() == max) $this.find('.b-plus').addClass('disabled');
			if($this.find('input').val() == 0) $this.find('input').removeClass('active');
			
			$this.find('.b-minus').off('click').on('click', function(e){
				if($this.closest('.disabled')>0){return false;}
				var c = parseInt($this.find('input').val());
				c--;
				chkNum(c);
				e.preventDefault();
			});
			$this.find('.b-plus').off('click').on('click', function(e){
				if($this.closest('.disabled')>0){return false;}
				var c = parseInt($this.find('input').val());
				c++;
				chkNum(c);
				e.preventDefault();
			});
			function chkNum(c){
				if(c < 1){
					if(c == min) $this.find('input.active').removeClass('active');
					c = 0;
				}else if(c > 0){
					$this.find('input').addClass('active');
				}
				if(c <= min){
					c = min;
					$this.find('input.active').removeClass('active');
					$this.find('.b-minus').addClass('disabled');
				}else if(c > min){
					$this.find('.b-minus.disabled').removeClass('disabled');
				}
				if(c >= max){
					c = max;
					// $this.find('input.active').removeClass('active');
					$this.find('.b-plus').addClass('disabled');
				}else if(c < max){
					$this.find('.b-plus.disabled').removeClass('disabled');
				}
				$this.find('input').val(c);
			}
		})
	}
}(window.jQuery, window, document));

var FE = window.FE || (function(){
  return {
    init: function(){
      //공통 UI
      FE.baseUI($(document));
      FE.contentsUI($(document));
      FE.roomManagement();
    },
    baseUI: function($this){
      var _ = $this;

      //placeholder(공통 - IE9 이하 부터 실행)
      _.find('.input-base, .text-base').placeholder();

      //인풋박스(공통)
      _.find('.input-area').on('click', function(){
        $(this).addClass('on focus');
        $(this).find('.input-base').focus();
      });
      _.find('.input-area .input-base').on('blur', function(){
        $(this).closest('.input-area').removeClass('focus');
        if($.trim($(this).val()) == ''){
          $(this).val('');
          $(this).closest('.input-area').removeClass('on');
        }
      });

      //체크박스(공통)
      _.find('.chk-base').customCheckbox();

      //라디오버튼(공통)
      _.find('.radio-base').customRadio();

      //셀렉트박스(공통)
      _.find('.select-base select').selectric();

      //스크롤바(공통)
      _.find('.o-scrollbar').mCustomScrollbar({
        theme:"minimal-dark",
        mouseWheel:{scrollAmount:200}
      });

      //팝업(공통) - 모달 팝업
      _.find('.btn-popup a').magnificPopup({
        type: 'inline',
        preloader: false,
        modal: false
      });
      $(document).on('click', '.b-mfp-close', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
      });	
      
      _.find('.btn-popup-anim-1 a').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'mfp-zin'
      });
      _.find('.btn-popup-anim-2 a').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'mfp-slide-b'
      });
      _.find('.btn-popup-ajax a').magnificPopup({
        type: 'ajax',
        overflowY: 'auto',
        fixedContentPos: true,
        preloader: false,
        removalDelay: 300,
        mainClass: 'fade-slideup',
        callbacks: {
          parseAjax: function(mfpResponse) {
            var _data = mfpResponse.data.substring(
              mfpResponse.data.indexOf('<body>') + 6,
              mfpResponse.data.indexOf('</body>')
            );
            mfpResponse.data = _data;
          }
        }
      });
    },
    onSelectTxtDay: function($this, dateText, inst){
      /* 설명   : 통합검색 - 선택된 날짜 형식 ex)08월 07일 (화) dayNamesMin 옵션이 있어야함!
          사용처 : jQuery UI datepicker : onSelect 내부 */
      var sDate = $.datepicker.parseDate($this.datepicker('option', 'dateFormat'), dateText),
          month = (sDate.getMonth()+1) < 10 ? '0' + (sDate.getMonth()+1)  : sDate.getMonth()+1,
          day = sDate.getDate() < 10 ? '0' + sDate.getDate()  : sDate.getDate(),
          dayName = sDate.getUTCDay() < 6 ? $this.datepicker('option', 'dayNamesMin')[sDate.getUTCDay()+1] : $this.datepicker('option', 'dayNamesMin')[0],
          txt = month + '월 ' + day + '일(' + dayName + ')';
      return txt;
    },
    jqdHolidayMark: function(date){
      /* 설명   : jQuery Ui datepicker 주말, 휴일 표시
          사용처 : 필요시 호출 ex) var result = FE.jqdHolidayMark(date); */
        
          //휴무일
        var result;
        var holiday = holidays[$.datepicker.formatDate("mmdd",date )];
        if(!holiday){
          holiday = holidays[$.datepicker.formatDate("yymmdd",date )];
        }
        var thisYear = $.datepicker.formatDate("yy", date);
        if (holiday) {
          if(thisYear == holiday.year || holiday.year == "") {
            result =  [true, "date-holiday", holiday.title];
          }
        }

        //주말
        if(!result) {
          switch (date.getDay()) {
            /*case 0:
              result = [true, "date-sunday"];
              break;
            case 6:
              result = [true, "date-saturday"];
              break;*/
            default:
              result = [true, ""];
              break;
          }
        }
        return result;
    },
    beforeShowDayMark: function(date, $date1, $date2){
      /* 설명   : 통합검색 - 출발, 도착지 스타일 구현
          사용처 : jQuery UI datepicker : beforeShowDay 내부 */
      var result = FE.jqdHolidayMark(date);

      //날짜 마크
      var date1 = $date1;
      var date2 = $date2;

      if(date1){
        if(date.getTime() == date1.getTime()){
          if(date2){
            if(date1.getTime() == date2.getTime()){
              result = [true, "dp-highlight dp-same", $.datepicker.formatDate('yy/mm/dd', date1)];
            }else{
              result = [true, "dp-highlight dp-first", $.datepicker.formatDate('yy/mm/dd', date1)];
            }
          }else{
            result = [true, "dp-highlight", $.datepicker.formatDate('yy/mm/dd', date1)];
          }
        }
        else if(date2){
          if(date.getTime() == date2.getTime()){
            result = [true, "dp-highlight dp-end", $.datepicker.formatDate('yy/mm/dd', date2)];
          }else if(date.getTime() > date1.getTime() && date.getTime() < date2.getTime()){
            result = [true, "dp-highlight pd-between"];
          }
        }
      }

      return result;
    },
    beforeShowDayMarkMD: function(date, $dateArr){
      /* 설명   : 통합검색 - 다구간 스타일 구현
          사용처 : jQuery UI datepicker : beforeShowDay 내부 */

      var result = FE.jqdHolidayMark(date);
      
      if($dateArr.length > 0){
        if(date.getTime() > $dateArr[0].getTime() && date.getTime() < $dateArr[$dateArr.length-1].getTime()){
          result = [true, "dp-highlight-md pd-between"];
        }
      
        for(var i in $dateArr){
          var dmDate = $dateArr[i];				
          if(date.getTime() == dmDate.getTime()){
            result = [true, 'dp-highlight-md isMD', $.datepicker.formatDate('yy/mm/dd', dmDate)];
          }
        }
      }

      return result;	
    },
    docuMoudownTrigger: function($delay){
      var delay = $delay || 0;
      // setTimeout(function(){$(document).mousedown();}, delay);
      $(document).mousedown();
    },
    roomManagement: function(){
      /* 설명   : 통합검색 - 객실 수, 인원 필터
          사용처 : 퀵서치 전역으로 실행 */
      var _roomNum = 0;
      var roomArr = [];
      var minRoom = 1; //객실 수 (최소)
      var maxRoom = 3; //객실 수 (최대)
      var defaultAdult = 2; //성인 수 (기본)
      var minAdult = 1; //성인 수 (최소)
      var maxAdult = 3; //성인 수 (최대)
      var minChild = 0; //아동 수 (최소)
      var maxChild = 3; //아동 수 (최대)
      var defaultChildOld = 1; //아동 나이(기본)
      var minChildOld = 2; //아동 나이(최소)
      var maxChildOld = 11; //아동 나이(최대)
      var totalAdultNum; //전체 성인 수
      var totalChildNum; //전체 아동 수
      var totalResult = null;
      var dataResult = function(data){ console.log(data) }; //데이터 (json)

      var $rooms = $('.ui-travelers .rooms-wrap');
      //var $result = $rooms.find('.rooms-result');
      var $con = $rooms.find('.rooms-remote');
      var $tab = $rooms.find('.room-tab');
      var $btn = $rooms.find('.b-add');

      var roomUI = {
        Init: function(){
          var roomData = $('.search-box .rooms').data('travelers');
          if(roomData != null && Object.keys(roomData).length > 0){
            for(i in roomData){
              _roomNum++;
              roomUI.Create(roomData[i]);
            }
            if(_roomNum >= maxRoom){
              _roomNum = maxRoom;
              $btn.hide();
            }
            $('.search-box .travelers .area').addClass('on');
          }else{
            _roomNum++;
            roomUI.Create(roomData);
          }
          roomUI.Data();
          $btn.on('click', function(e){
            _roomNum++;
            roomUI.Create();
            roomUI.Data();
            if(_roomNum >= maxRoom){
              _roomNum = maxRoom;
              $btn.hide();
            }
            e.preventDefault();
          });
        },
        Create: function(setting){
          var adult, child, childOld;
          if(setting != null){
            adult = setting.adult;
            if(setting.child != null){
              child = setting.child.length;
              childOld = setting.child;
            }else{
              child = minChild;
              childOld = [];
            }
          }else{
            adult = defaultAdult;
            child = minChild;
            childOld = [];
          }
          var obj = {};
          obj.roomNum = _roomNum;
          obj.adultNum = adult;
          obj.childNum = child;
          obj.childOld = childOld;
          obj.age = [];
          obj.ui = null;
    
          roomUI.Draw(obj);
        },
        Draw: function(obj){
          var roomHTML = '';
          if(_roomNum <= 1){
            roomHTML += '<div class="room-unit active">';
          }else{
            roomHTML += '<div class="room-unit">';
          }
            roomHTML +=  '<div class="room-tab">';
            roomHTML +=    '<span class="room">객실<span></span></span>';
          if(_roomNum > 1){
            roomHTML +=    '<span class="btn-base b-delete tp2"><a href="#">객실삭제</a></span>';
          }
            roomHTML +=  '</div>';
            roomHTML +=  '<div class="room-panel">';
            roomHTML +=    '<div class="adultArea">';
            roomHTML +=      '<dl class="num-remote">';
            roomHTML +=        '<dt>성인</dt>';
            roomHTML +=        '<dd>';
            roomHTML +=        '<span class="num-ctn">';
            roomHTML +=          '<a href="#" class="b-minus">-</a>';
            roomHTML +=          '<input type="text" class="active" value="'+obj.adultNum+'" readonly>';
            roomHTML +=          '<a href="#" class="b-plus">+</a>';
            roomHTML +=        '</span>';
            roomHTML +=        '</dd>';
            roomHTML +=      '</dl>';
            roomHTML +=    '</div>';
            roomHTML +=    '<div class="childArea">';
            roomHTML +=      '<dl class="num-remote">';
            roomHTML +=        '<dt>아동</dt>';
            roomHTML +=        '<dd>';
            roomHTML +=        '<span class="num-ctn">';
            roomHTML +=          '<a href="#" class="b-minus">-</a>';
          if(obj.childNum > 0){
            roomHTML +=          '<input type="text" class="active" value="'+obj.childNum+'" readonly>';
          }else{
            roomHTML +=          '<input type="text" value="'+obj.childNum+'" readonly>';
          }
            roomHTML +=          '<a href="#" class="b-plus">+</a>';
            roomHTML +=        '</span>';
            roomHTML +=        '</dd>';
            roomHTML +=      '</dl>';
            roomHTML +=    '</div>';
            roomHTML +=   '</div>';
            roomHTML += '</div>';
          var roomCon = $(roomHTML);
          obj.ui = roomCon;
          $con.append(obj.ui);
          roomUI.Event(obj);
        },
        Event: function(obj){
                //성인 +
          obj.ui.find('.adultArea .b-plus').on('click', function(){
            var num = obj.adultNum;
            num++;
            if(num <= minAdult){
              obj.ui.find('.adultArea input').removeClass('active');
            }else{
              obj.ui.find('.adultArea input').addClass('active');
            }
            if(num < minAdult || num > maxAdult) return false;
            obj.adultNum = num;
            obj.ui.find('.adultArea input').val(parseInt(num));
            roomUI.Data();
            });
      
            //성인 -
            obj.ui.find('.adultArea .b-minus').on('click', function(){
            var num = obj.adultNum;
            num--;
            if(num <= minAdult || num >= maxAdult){
              obj.ui.find('.adultArea input').removeClass('active');
            }else{
              obj.ui.find('.adultArea input').addClass('active');
            }
            if(num < minAdult || num > maxAdult) return false;
            obj.adultNum = num;
            obj.ui.find('.adultArea input').val(parseInt(num));
            roomUI.Data();
            });
      
            //아동 +
            obj.ui.find('.childArea .b-plus').on('click', function(){
            var num = obj.childNum;
            num++;
            if(num <= minChild){
              obj.ui.find('.childArea input').removeClass('active');
            }else{
              obj.ui.find('.childArea input').addClass('active');
            }
            if(num < minChild || num > maxChild) return false;
            obj.childNum = num;
            obj.ui.find('.childArea input').val(parseInt(num));
            roomUI.childAge(obj, num);
            roomUI.Data();
            });
      
            //아동 -
            obj.ui.find('.childArea .b-minus').on('click', function(){
            var num = obj.childNum;
            num--;
            if(num <= minChild || num >= maxChild){
              obj.ui.find('.childArea input').removeClass('active');
            }else{
              obj.ui.find('.childArea input').addClass('active');
            }
            if(num < minChild || num > maxChild) return false;
            obj.childNum = num;
            obj.ui.find('.childArea input').val(parseInt(num));
            obj.age.pop();
            obj.childOld.pop();
            obj.ui.find('.age-remote li.item:last-child').remove();
            if(num <= 0) obj.ui.find('.age-remote').remove();
            roomUI.Data();
            });
      
            //객실 선택
            obj.ui.find('.room').on('click', function(e){
            if(!$(this).closest('.room-unit').hasClass('active')){
              $(this).closest('.room-unit').addClass('active');
            }else{
              $(this).closest('.room-unit').removeClass('active');
            }
            $(this).closest('.room-unit').siblings().removeClass('active');
            
            e.preventDefault();
            });
      
            //객실 삭제
            if(_roomNum > 1){
            obj.ui.find('.b-delete').on('click', function(e){
              roomArr[obj.roomNum].ui.find('.b-minus, .b-plus').off('click');
              roomArr.splice(obj.roomNum, 1);
              if($(this).prev().hasClass('active')){
              $(this).parent().prev().find('.room').click();
              }
              $(obj.ui).remove();
              $(obj.ui).remove();
              roomUI.Change(roomArr);
              _roomNum--;
              if(_roomNum <= minRoom) _roomNum = minRoom;
              if($btn.css('display')=='none') $btn.show();
              $(this).off('click');
              roomUI.Data();
              e.preventDefault();
            });
            }

            if(obj.childOld.length > 0){
              for(i in obj.childOld){
                roomUI.childAge(obj, parseInt(i)+1);
              }
            }

            roomArr.push(obj);
            roomUI.Change(roomArr);
        },
        Change: function(arr){
                for(var i in arr){
            var obj = arr[i];
            obj.roomNum = parseInt(i);
            obj.ui.find('.room span').text(obj.roomNum+1);
          }
        },
        childAge: function(obj, num){
          var defaultChildOld;

          if(obj.childOld.length > 0){
            defaultChildOld = (obj.childOld[num-1]) ? obj.childOld[num-1] : defaultChildOld;
          }else{
            defaultChildOld = defaultChildOld;
          }

          var ageHTML = '';
          if(num <= 1){
            ageHTML += '<ul class="age-remote">';
          }
            ageHTML +=  '<li class="item">';
            ageHTML +=    '<p class="blind">나이 <span>'+num+'</span></p>';
            ageHTML +=      '<span class="select-box">';
          if(defaultChildOld > 0){
            ageHTML +=        '<span class="value active"></span>';
          }else{
              ageHTML +=        '<span class="value"></span>';
          }
            
            ageHTML +=        '<select>';
            ageHTML +=          '<option value="0">나이</option>';
          for(var i=minChildOld; i<=maxChildOld; i++){
            if(i == defaultChildOld){
            ageHTML +=        '<option value='+i+' selected>만 '+i+'세</option>';
            }else{
            ageHTML +=        '<option value='+i+'>만 '+i+'세</option>';
            }
          }
            ageHTML +=        '</select>';
            ageHTML +=      '</span>';
            ageHTML +=  '</li>';
          if(num <= 1){
            ageHTML += '</ul>';
          }
    
          var age = $(ageHTML);
          if(num <= 1){
            obj.ui.find('.childArea').append(age);
          }else{
            obj.ui.find('.age-remote').append(age);
          }
    
          var selectValue;
          var selectBox = age.find(".select-box:not(.on)").addClass("on").find(".value").html(function(){
            return $(this).next().find("option:selected").html();
          }).parent().find("select").on("change", function() {
            selectValue = $(this).closest('.select-box').find('.value');
            if($(this).val()==0){
              selectValue.removeClass('active');
            }else{
              selectValue.addClass('active');
            }
            selectValue.html( $(this).find("option:selected").text() );
            roomUI.Data();
          });
    
          obj.age.push(selectBox);
        },
        Data: function(){
                totalAdultNum = 0;
          totalChildNum = 0;
          for(i in roomArr){
          totalAdultNum += roomArr[i].adultNum;
          totalChildNum += roomArr[i].childNum;
          }
          // $result.find('li:eq(0) span').text(roomArr.length);
          // $result.find('li:eq(1) span').text(totalAdultNum);
          // $result.find('li:eq(2) span').text(totalChildNum);
          var temp = {};
          for(i in roomArr){
          if(roomArr[i].age != null){
            for(j in roomArr[i].age){
            roomArr[i].childOld[j] = Number(roomArr[i].age[j].find("option:selected").val());
            }
          }
          temp['room'+roomArr[i].roomNum] = {};
          temp['room'+roomArr[i].roomNum].adult = roomArr[i].adultNum;
          temp['room'+roomArr[i].roomNum].child = (roomArr[i].childOld.length < 1) ? null : roomArr[i].childOld;
          }
          totalResult = '성인' + totalAdultNum + '명, 아동' + totalChildNum + '명, 객실' + roomArr.length;
          $('.search-box .travelers .input').text(totalResult);
          dataResult(JSON.stringify(temp));
          //console.log(temp);
        }
      }
      roomUI.Init();
    },
    initPriceRange: function(_min, _max){
      /* 설명   : 검색 결과 조건 - 요금 범위
          사용처 : 필요시 호출 ex) FE.initPriceRange(0,1000000); */
      var priceRS = $("#priceRangeSet");
      var priceRMax = $("#priceRangeMax");
      var priceRMin = $("#priceRangeMin");
  
      priceRS.slider({
        range: true,
        min: _min,
        max: _max,
        values: [_min, _max],
        slide: function(e, ui) {
          priceRMin.text(FE.numberSetComma(ui.values[0]));
          priceRMax.text(FE.numberSetComma(ui.values[1]));
        }
      });
      priceRMin.text(FE.numberSetComma(priceRS.slider( "values", 0 )));
      priceRMax.text(FE.numberSetComma(priceRS.slider( "values", 1 )));
    },
    numberSetComma: function(val){
      /* 설명   : 요금 단위 콤마로 변환 */
      while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace( /(\d+)(\d{3})/, '$1' + ',' + '$2' );
      }
      return val;
    },
    contentsUI: function($this){
      var _ = $this;

      //카운터(공통)
      _.find('.num-ctn.module').uiCustomNumber();
      
      //목록 슬라이드(공통)
      _.find('.list-slick').each(function(){
        $(this).find('.list-item').slick({
          dots: false,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          variableWidth: true,
          autoplaySpeed: 3000,
          autoplay: true,
          arrow: true,
          appendArrows: $(this),
          touchThreshold: 100
        });
      });
    }
  }
}());

function commonEvent(){
  $(document).on('mousedown', function(e){
		if($(e.target).closest('.ui-search-panel.on').length <= 0){
			$('.ui-search-panel.on').removeClass('on');
		}
	});
	//모바일 환경에서 document 클릭시 툴팁 닫음
	$(document).on('touchend', function(e){
		if($('.custom-tooltip').length > 0){
			if(!$(e.target).data('cancel.customTooltip')){
				$.data($('[original-title]'), 'cancel.custom-tooltip', false);
				$('.custom-tooltip').fadeOut('fast', function(){
					$(this).attr('style','');
					$(this).remove();
				});
			}
		}
	});
}

function commonSearch(){
  var $target = null;
  $('[data-panel]').on('click', function(e){
		$target = $(this).data("panel");
		$(this).closest('.search-box').find('.ui-search-panel.ui-'+$target).addClass('on');
		if($target == 'attractions'){
			$(this).addClass('on');
			$(this).find('.input').focus();
		}else{
			$('.search-box .places .area').removeClass('fix');
		}
		if($(this).closest('.o-multiway').length > 0){
			var idx = $(this).closest('li').index()+1;
			$(this).closest('.search-box').find('.ui-date-calendar').css('top', 102 * idx);
		}

		//다구간인 경우 캘린더 팝업 1개 존재, 오픈시 날짜셋팅해준다
		if($(this).closest('.o-multiway').length > 0){
			_mdDateIdx = $(this).closest('li[class*="md-"].on').index();
			var day = $(this).find('.chkin').data('day');
			
			//console.log(_mdDateIdx, day);
			
			//캘린더 팝업에 날짜 표시
			if(day != ""){
				var txtDay = FE.onSelectTxtDay($('.o-multiway .uis-datepicker'), day);
				$('.o-multiway .uis-datepicker').datepicker('setDate', new Date(day));
				addTextToMD($('.o-multiway .uis-datepicker'));
			}
			
			//여정1 표시된경우 이전날짜 비활성화 처리
			if(_mdDateArr[0] != ''){
				if(_mdDateIdx == 0){
					$('.o-multiway .uis-datepicker').datepicker( "option", "minDate", '0');
				}
				else{
					$('.o-multiway .uis-datepicker').datepicker( "option", "minDate", _mdDateArr[0]);
					addTextToMD($('.o-multiway .uis-datepicker'));
				}
			
			}
		}
    e.preventDefault();
  });
  $('.ui-search-panel .btn-close').on('click', function(e){
		$(this).closest('.ui-search-panel.on').removeClass('on');
		e.preventDefault();
  });
  
  var _MDMinCnt = 2; //최소 구간
	var _MDCnt = $('.o-multiway li[class*="md-"].on').length; // 다구간 on
	var _MDMax = $('.o-multiway li[class*="md-"]').length; //다구간 최대
	var _mdDateIdx; //다구간 index
	var _mdDateArr = []; //다중날짜 처리 array
  var timeAddTextToMD = null; //텍스트 삽입 중복 방지
  
  // 퀵서치 > 체크인, 체크아웃 - 왕복
	$('.o-shuttle .uis-datepicker').datepicker({
		minDate: '0',
		maxDate: '+365',
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        dateFormat: 'yy/mm/dd',
		beforeShowDay: function(date) {
			var date1 = $.datepicker.parseDate($(this).datepicker('option', 'dateFormat'), $('.o-shuttle .chkin').data('day'));
			var date2 = $.datepicker.parseDate($(this).datepicker('option', 'dateFormat'), $('.o-shuttle .chkout').data('day'));
			return FE.beforeShowDayMark(date, date1, date2);
		},
		onSelect: function(dateText, inst) {
			var date1 = $.datepicker.parseDate($(this).datepicker('option', 'dateFormat'), $('.o-shuttle .chkin').data('day'));
			var date2 = $.datepicker.parseDate($(this).datepicker('option', 'dateFormat'), $('.o-shuttle .chkout').data('day'));
			var selectedDate = $.datepicker.parseDate($(this).datepicker('option', 'dateFormat'), dateText);
			var txtDay = FE.onSelectTxtDay($(this), dateText);
						
			//체크인, 체크아웃 모두 선택인 경우, 아무것도 선택이 없는 경우(체크인)
			if (!date1 || date2) {
				$('.o-shuttle .chkin').data('day',dateText);
				$('.o-shuttle .chkout').data('day','');
				$('.o-shuttle .dates .area').addClass('on');
				$('.o-shuttle .chkin').html(txtDay);	
				$('.o-shuttle .chkout').html('');

				$('.o-shuttle .bridge').removeClass('on');
				$('.o-shuttle .result-days').removeClass('on');
			} else {
				//체크인 보다 이전 날짜 선택
				var duration = Math.abs(selectedDate.getTime() - date1.getTime());
				duration = Math.ceil(duration/(1000*3600*24));
				if(duration==0){
					$('.o-shuttle .uis-datepicker').datepicker('setDate', new Date($('.o-shuttle .uis-datepicker .qsb-chkin').data('day')));
					alert("같은날은 선택할 수 없습니다.");
					return false;
				}
				if(duration>15){
					$('.o-shuttle .uis-datepicker').datepicker('setDate', new Date($('.o-shuttle .uis-datepicker .qsb-chkin').data('day')));
                    alert("15박까지 예약할 수 있습니다.");
                    return false;
                }
				
				if( selectedDate.getTime() < date1.getTime() ) {
					//체크인 -> 체크아웃 이동
					$('.o-shuttle .chkout').data('day', $('.o-shuttle .chkin').data('day'));
					$('.o-shuttle .chkout').html($('.o-shuttle .chkin').html());	
	
					//체크인 셋팅
					$('.o-shuttle .chkin').data('day',dateText);
					$('.o-shuttle .chkin').html(txtDay);
				}else{
					//체크인이후 선택시(체크아웃)
					$('.o-shuttle .chkout').data('day',dateText);
					$('.o-shuttle .chkout').html(txtDay);
				}
				
				if(!$('.o-shuttle .bridge').hasClass('on')){
					$('.o-shuttle .bridge').addClass('on');
				}
				if(!$('.o-shuttle .result-days').hasClass('on')){
					$('.o-shuttle .result-days').addClass('on');
				}
				$('.o-shuttle .result-days .num').text(duration);
	
				FE.docuMoudownTrigger();
			}
		}
	});

	//캘린더 datepicker - 편도
	$('.o-oneway .uis-datepicker').datepicker({
		minDate: '0',
		maxDate: '+365',
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		dateFormat: 'yy/mm/dd',
		beforeShowDay: function(date) {
			var date1 = $.datepicker.parseDate($(this).datepicker('option', 'dateFormat'), $('.o-oneway .chkin').data('day'));
			return FE.beforeShowDayMark(date, date1);
		},
		onSelect: function(dateText, inst) {
			var txtDay = FE.onSelectTxtDay($(this), dateText);
			
			//sbox input
			$('.o-oneway .chkin').data('day',dateText);
			$('.o-oneway .dates .area').addClass('on');
			$('.o-oneway .chkin').html(txtDay);	
			
			FE.docuMoudownTrigger();
		}
	});

	//캘린더 datepicker - 다구간
	$('.o-multiway .uis-datepicker').datepicker({
		minDate: '0',
		maxDate: '+365',
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		dateFormat: 'yy/mm/dd',
		onSelect: function(dateText, inst) {
			var selectedDate = $.datepicker.parseDate($(this).datepicker('option', 'dateFormat'), dateText);
			
			var txtDay = FE.onSelectTxtDay($(this), dateText);
			
			//다중날짜 체크
			checkMdDate(_mdDateIdx, selectedDate);
			
			FE.docuMoudownTrigger();
		},
		onChangeMonthYear: function(year, month, inst) {
			//텍스트 삽입
			addTextToMD($(this));
		}
	});

	//다구간 - 구간 추가 click
	$('.o-multiway .b-add-multiway').on('click', function(){
		_MDCnt++;
		if(_MDCnt > _MDMax){
			_MDCnt = _MDMax;
			//alert('여정은 총 ' + _MDCnt + '개 까지만 가능합니다.\n' + _MDCnt + '개 이상의 여정이 있으시다면 1;1문의로 요청해 주시기 바랍니다.');
			if($(this).hasClass('disabled')){ return false; }
		}
		else{
			$('.o-multiway .md-'+_MDCnt).addClass('on');
			if(_MDCnt > _MDMinCnt){
				$('.o-multiway .md-'+_MDMinCnt).find('.btn-add').show();
			}
			
			if(_MDCnt == _MDMax){
			   $('.o-multiway .b-add-multiway').addClass('disabled');
			}
			_mdDateArr.push(""); //다중날짜 추가
		}
	});
	
	//다구간 - 구간 제거 click
	$('.o-multiway .b-remove-multiway').on('click', function(){
		_MDCnt--;
		if(_MDCnt < _MDMinCnt){
			_MDCnt = _MDMinCnt;
			alert('출발 및 귀국 여정은 삭제하실 수 없습니다.');
			return false;
		}else{
			var removeIdx = $(this).closest('li[class*="md-"].on').index();
			var openTotal = $('.o-multiway .list-cont li[class*="md-"].on').length;
			//console.log('삭제구간 = ', removeIdx, removeIdx+1, '노출된 총구간 = ', openTotal);
									
			//삭제구간 부터 데이터 초기화하고 한칸씩 옮김
			$('.o-multiway .list-cont li[class*="md-"].on').each(function(){
				var idx = $(this).index();
				if(idx >= removeIdx){
					//qsb 초기화
					$(this).find('.area.on').removeClass('on');
				}
			});
			
			//맨뒤에 있는 구간 숨김
			$('.o-multiway .md-'+openTotal).removeClass('on');
						
			//버튼 변경 - 구간 2개 남을때
			if(openTotal <= _MDMinCnt+1){
				$('.o-multiway .md-2 .btn-add').hide();			
			}
			
			if(_MDCnt < _MDMax){
			   $('.o-multiway .b-add-multiway').removeClass('disabled');
			}
			
			//다중날짜 리셋
			_mdDateArr.splice(removeIdx, 1);
			initMDDate();
		}
	});

	//다구간 - 다중날짜 셋팅
	function initMDDate(){
		//console.log('s initMDDate = ', _mdDateArr);
		//date array 리셋(날짜가 없는경우 "" 처리)
		if(_mdDateArr.length <= 0){
			$('.o-multiway li[class*="md-"].on').each(function(){
				_mdDateArr.push($(this).find('.chkin').data('day'));
			});	
		}
		
		//qsb 여행 날짜 표시 리셋
		for(var i in _mdDateArr){
			if(_mdDateArr[i] != ""){
				//sbox input
				var txtDay = FE.onSelectTxtDay($('.o-multiway .uis-datepicker'), _mdDateArr[i]);
				if(!$('.o-multiway [class*="md-"]').eq(i).find('.dates .area').hasClass('on')){
					$('.o-multiway [class*="md-"]').eq(i).find('.dates .area').addClass('on');
					$('.o-multiway [class*="md-"]').eq(i).find('.dates .area').addClass('on');
				}
				console.log(txtDay)
				$('.o-multiway [class*="md-"]').eq(i).find('.dates .chkin').html(txtDay);		
				$('.o-multiway [class*="md-"]').eq(i).find('.dates .chkin').data('day', _mdDateArr[i]);		
			}
			else{
				$('.o-multiway [class*="md-"]').eq(i).find('.dates .area.on').removeClass('on');
				$('.o-multiway [class*="md-"]').eq(i).find('.dates .chkin').html('');		
				$('.o-multiway [class*="md-"]').eq(i).find('.dates .chkin').data('day','');		
			}
		}
		
		//console.log('e initMDDate = ', _mdDateArr);
		
		//캘린더 마크 리셋
		var tempParseDateArr = [];
		for(var i in _mdDateArr){
			//날짜만 모아서 넘김
			if(_mdDateArr[i] != ""){
				tempParseDateArr.push($.datepicker.parseDate('yy/mm/dd', _mdDateArr[i]));
			}
		}
		//console.log('tempParseDateArr = ', tempParseDateArr);
		
		//캘린더 마크 표시
		//datepicker - beforeShowDay
		$('.o-multiway .uis-datepicker').datepicker('option', 'beforeShowDay', function(date) {
			return FE.beforeShowDayMarkMD(date, tempParseDateArr);
		});	
		
		//텍스트 삽입
		addTextToMD($('.o-multiway .uis-datepicker'));
	}

	//다구간 - 텍스트 삽입
	function addTextToMD($this) {
		if(timeAddTextToMD){
		   clearTimeout(timeAddTextToMD);
			timeAddTextToMD = null;
		}		
		timeAddTextToMD = setTimeout(function(){
			//console.log('addTextToMD = ', _mdDateArr);
			for(var i in _mdDateArr){
				if(_mdDateArr[i] != ""){
					if($this.find('.isMD[title="'+_mdDateArr[i]+'"] .txt').length > 0){
						var t = $this.find('.isMD[title="'+_mdDateArr[i]+'"] .txt').text() + ','+(i*1+1);
						$this.find('.isMD[title="'+_mdDateArr[i]+'"] .txt').text(t);
					}
					else{
						$this.find('.isMD[title="'+_mdDateArr[i]+'"]').append('<em class="txt">여정'+(i*1+1)+'</em>');
					}
				}
			}
		},1);
	}
	
	//다구간 - 다중날짜 체크
	function checkMdDate(num, date){
		var mdDateArrGetTime = [],
			newDate = date.getTime(),
			isDelete = false;
		
		//getTime 셋팅
		for(var i in _mdDateArr){
			if(_mdDateArr[i] != ""){
				mdDateArrGetTime.push($.datepicker.parseDate('yy/mm/dd', _mdDateArr[i]).getTime());
			}
			else{
				mdDateArrGetTime.push(_mdDateArr[i]);
			}
		}
		
		//날짜 체크
		for(var i=0; i<mdDateArrGetTime.length; i++){
			if(!isDelete){
				if(i < num){
					//console.log('기준보다 작은 구간 탐색 = ', i);
					if(mdDateArrGetTime[i] != "" && mdDateArrGetTime[i] > newDate){
						//console.log('기준보다 작은 구간 탐색 - 선택보다 더 작음 이후 전부 비우기! = ', mdDateArrGetTime[i], i);
						_mdDateArr.splice(i, 1, $.datepicker.formatDate('yy/mm/dd', date));
						isDelete = true;
					}
				}
				else if(i > num){
					//console.log('기준보다 큰 구간 탐색 = ', i);
					if(mdDateArrGetTime[i] != "" && mdDateArrGetTime[i] < newDate){
						//console.log('기준보다 큰 구간 탐색 - 선택보다 더 큼 이후 전부 비우기! = ', mdDateArrGetTime[i], i);
						_mdDateArr.splice(i, 1, "");
						_mdDateArr.splice(num, 1, $.datepicker.formatDate('yy/mm/dd', date));
						isDelete = true;
					}
				}
				else{
					//console.log('비어있거나, 범위유효', i);
					_mdDateArr.splice(num, 1, $.datepicker.formatDate('yy/mm/dd', date));
				}
			}
			else{
				//console.log('날짜 비우기!', i);
				_mdDateArr.splice(i, 1, "");
			}
		}
		
		initMDDate(); //다중날짜 리셋
	}

	initMDDate();
}

$(function(){
  commonEvent();
  commonSearch();
  FE.init();
});