var holidays = {
	"0606":{title:"현충일",year:""},
	"0501":{title:"근로자의날",year:""},
	"0505":{title:"어린이날",year:""},
	"0301":{title:"3.1절",year:""},
	"0101":{title:"신정",year:""},
	"0815":{title:"광복절",year:""},
	"1003":{title:"개천절",year:""},
	"1225":{title:"크리스마스",year:""},
	"1009":{title:"한글날",year:""},
	"20190205":{title:"설날",year:"2019"},
	"20190512":{title:"석가탄신일",year:"2019"},
	"20190204":{title:"설연휴",year:"2019"},
	"20190506":{title:"대체휴가",year:"2019"},
	"20190912":{title:"추석연휴",year:"2019"},
	"20190913":{title:"추석",year:"2019"},
	"20190914":{title:"추석연휴",year:"2019"},
	"20190206":{title:"설연휴",year:"2019"},
	"20200430":{title:"석가탄신일",year:"2020"},
	"20200124":{title:"설연휴",year:"2020"},
	"20200125":{title:"설날",year:"2020"},
	"20200126":{title:"설연휴",year:"2020"},
	"20200127":{title:"설연휴",year:"2020"},
	"20201002":{title:"추석연휴",year:"2020"},
	"20201001":{title:"추석",year:"2020"},
	"20200930":{title:"추석연휴",year:"2020"}
};
/* 데이트피커 일부 옵션 초기화(공휴일 처리 및 달력 2개 기본 스타일 처리 */
$.datepicker.regional['ko'] = {
	prevText: '이전달',
	nextText: '다음달',
	currentText: '오늘',
	numberOfMonths: 2,
	beforeShowDay: function(date) {
		var result = FE.jqdHolidayMark(date);
		return result;	
	},
	beforeShow: function(input, inst){
		if(checkMobile()){
			var calendar = inst.dpDiv;
			setTimeout(function() {
				calendar.position({
					my: 'left top',
					at: 'left bottom',
					collision: 'none',
					of: input
				});
			}, 1);
		}
	}
};
$.datepicker.setDefaults($.datepicker.regional['ko']);