var date = new Date();
var Url = "http://api.openweathermap.org/data/2.5/weather";
var names = "beijing";
var Api = "APPID=fe9f45d7f758713c610aad0a531279a5&lang=zh_cn&units=metric";
var mainUrl = "http://api.openweathermap.org/data/2.5/forecast/daily";
var mainApi = "&appid=fe9f45d7f758713c610aad0a531279a5&units=metric";
var cnt = "&cnt=13";
var hourlyUrl = "http://api.openweathermap.org/data/2.5/forecast?";
var hourlyApi = "&appid=fe9f45d7f758713c610aad0a531279a5&units=metric";
window.load = now_weather(names);
// window.load = main_weather("beijing");
// window.load = hourly_weather("beijing");
var argument = new Vue({
    el: '#argument',
    data: {
        toponymy: '',
        contry: '',
        temp: '',
        weather: '',
        date: '',
        time: '',
        wind_dir: '',
        speed: '',
        cloud: '',
        air_pre: '',
        humidity: '',
        sunrise: '',
        sunset: '',
        lon: '',
        lat: '',
        items: [],
        dates: [{
            day: "",
            hourlyWeathers: [{
                time: "",
                icon: "",
                max_temp: "",
                description: "",
                min_temp: "",
                max_temp: "",
                speed: "",
                humidity: "",
                pressure: ""
            }]
        }]

    },
    methods: {
        flush: function() { //点击刷新按钮执行函数
            names = (this.names); //文本框没有内容时利用逻辑短路点击刷新时为默认为背景
            now_weather(names);
            main_weather(names);
        },
        enter: function(e) { //（e是指鼠标指针）在文本框中按下回车执行函数
            names = (this.names);
            if (names && e.keyCode === 13) {
                now_weather(this.names);
                main_weather(names);
            }
        },
        main_click: function(e) {
            console.log("我点击了main标签");
            console.log($(e));
            // $(".nav").css({"border": "1px solid #f3f3fblack"})
            // high(e);

            main_weather(names);


        },
        daily_click: function() {
            console.log("我点击了daily标签");
            daily_weather(names);
            // $(".daily_chart").removeClass("None").siblings().addClass("None");
        },
        hourly_click: function() {
            console.log("我点击了hourly标签");
            hourly_weather(names);
            // $(".hourly_chart").removeClass("None").siblings().addClass("None");
        },
        chart_click: function() {
            console.log("我点击了chart标签");
            chart_weather(names);
            // $(".chart_chart").removeClass("None").siblings().addClass("None");
        },
        map_click: function() {
            console.log("我点击了map标签");
            map_weather(names);
            // $(".map_chart").removeClass("None").siblings().addClass("None");
        }
    }
});

function now_weather(names) {
    console.log(Url + "?q=" + names + "&" + Api)
    axios.get(Url + "?q=" + names + "&" + Api)

    .then(function(response) {
        console.log(response)
        argument.lon = response.data.coord.lon;
        argument.lat = response.data.coord.lat;
        argument.toponymy = response.data.name;
        argument.country = response.data.sys.country;
        argument.icon = response.data.weather[0].icon;
        argument.temp = response.data.main.temp;
        argument.weather = response.data.weather[0].main;
        argument.date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
        argument.time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        // argument.time = 


        let degree = response.data.wind.deg

        function toTextualDescription(degree) {
            if ((degree > 337.5 && degree < 360) || (degree > 22.5 && degree < 22.5)) {
                return 'Northerly';
            } else if (degree > 22.5 && degree < 67.5) {
                return 'North Easterly';
            } else if (degree > 67.5 && degree < 112.5) {
                return 'Easterly';
            } else if (degree > 122.5 && degree < 157.5) {
                return 'South Easterly';
            } else if (degree > 157.5 && degree < 202.5) {
                return 'Southerly';
            } else if (degree > 202.5 && degree < 247.5) {
                return 'South Westerly';
            } else if (degree > 247.5 && degree < 292.5) {
                return 'Westerly';
            } else if (degree > 292.5 && degree < 337.5) {
                return 'North Westerly';
            }
        };

        // that.speed = toTextualDescription(degree)
        argument.wind_dir = toTextualDescription(degree);
        argument.speed = response.data.wind.speed;
        argument.wind_deg = response.data.wind.deg;
        argument.cloud = response.data.clouds.all;
        argument.air_pre = response.data.main.pressure;
        argument.humidity = response.data.main.humidity;
        let rise = new Date(response.data.sys.sunrise * 1000);
        argument.sunrise = "0" + rise.getHours() + ":" + rise.getMinutes();
        let set = new Date(response.data.sys.sunset * 1000);
        argument.sunset = set.getHours() + ":" + set.getMinutes();
    })
};

function main_weather(names) {
    console.log(names + "我是main_weather的函数值的地址");
    // console.log(cnt+"我是cnt");
    // console.log(mainUrl+"?q="+names+"&"+mainApi+cnt);
    $(".main_chart").removeClass("None").siblings().addClass("None");
    axios.get(mainUrl + "?q=" + names + "&" + Api + cnt)

    .then(function(response) {
        var arr = []; //创建用于列表渲染的数组
        var len = response.data.cnt; //需要渲染多少天数的天气就是多少个数组的元素
        console.log(len + "我是预报天气天数");
        console.log(response.data + "我是response.data");
        for (var i = 1; i < len; i++) { //对从api获得的数组进行遍历，要取得多少天的天气该数据就得遍历几次
            var obj = {}; //创建多天预报的每天天气数据的数组
            var info = response.data.list[i];
            console.log(response.data + "我是response.data");
            console.log(info + "我是respons");


            console.log(info.dt + "我是数据预测时间");

            function week_shift(getday) {
                switch (getday) {
                    case 0:
                        return "Sun";
                        break;
                    case 1:
                        return "Mon";
                        break;
                    case 2:
                        return "Tue";
                        break;
                    case 3:
                        return "Wed";
                        break;
                    case 4:
                        return "Thours";
                        break;
                    case 5:
                        return "Fri";
                        break;
                    case 6:
                        return "Sat";
                        break;
                }
            };
            console.log("我在遍历天气数组");
            obj.week = week_shift(date.getDay(info.dt));
            // console.log(date.getDay(info.dt+=86400)+"我是预报天气的时间");
            obj.day = date.getDate();
            obj.month = date.getMonth(info.dt);
            obj.day_icon = "http://openweathermap.org/img/w/" + info.weather[0].icon + ".png";
            obj.max_temp = info.temp.max;
            obj.min_temp = info.temp.min;
            obj.description = info.weather[0].description;
            obj.speed = info.speed;
            obj.clouds = info.clouds;
            obj.press = info.pressure;
            arr.push(obj);
            console.log(obj + "我是元素中每一天的数据对象");
            console.log(obj.day_icon);
        }
        console.log(arr);
        argument.items = arr;


        // function week_shift(getday){
        // 	switch(getday){
        // 		case 0:
        // 		return "Sun";
        // 		break;
        // 		case 1:
        // 		return "Mon";
        // 		break;
        // 		case 2:
        // 		return "Tue";
        // 		break;
        // 		case 3:
        // 		return "Wed";
        // 		break;
        // 		case 4:
        // 		return "Thours";
        // 		break;
        // 		case 5:
        // 		return "Fri";
        // 		break;
        // 		case 6:
        // 		return "Sat";
        // 		break;	  				
        // 	}
        // };
        // let week = week_shift(date.getDay());
        // console.log(date.getDay());
        // console.log(week);
        // console.log("*************************************");



        // items[{}]
    })
};


function daily_weather(names) {
    $(".daily_chart").removeClass("None").siblings().addClass("None");
};

function hourly_weather(names) {
    $(".hourly_chart").removeClass("None").siblings().addClass("None");
    // axios.get(hourlyApi+"&q="+names+hourlyApi)
    // .then(function(response){
    // 	argument.hourly_datas=[];
    // 	for (let i = 0; i < response.data.list.length; i++){
    // 		var HourlyWeather = {
    // 			time:"",
    //     		icon:"",
    //     		max_temp: response.data.list[i].max_temp,
    //     		description:"",
    //     		min_temp: response.data.list[i].min_temp,
    //     		max_temp: response.data.list[i].max_temp,
    //     		speed:"",
    //     		humidity:"",
    //     		pressure:""
    // 		}
    // 	}

    // })
    console.log(hourlyUrl + "&q=" + names + hourlyApi + "我是小时预报天气")
    console.log(names + "我是城市的名字")
        // axios.get(mainUrl + "?q=" + names + "&" + Api + cnt)
        axios.get(hourlyUrl + "&q=" + names + hourlyApi)
    // axios.get("http://api.openweathermap.org/data/2.5/forecast?&q=beijing&appid=fe9f45d7f758713c610aad0a531279a5&units=metric")
        .then(function(response) {
            // 清空旧数据
            argument.dates = []

            var weatherForcast = null
            var nowDate = new Date()

            for (var i = 0; i < response.data.list.length; i++) {
                console.log(response.data.list[i].main.temp_max + "我是每小时的最高温度");
                var hourlyDatas = {
                    max_temp: response.data.list[i].main.temp_max,
                    min_temp: response.data.list[i].main.temp_min,
                    description: response.data.list[i].weather[0].description,
                    speed: response.data.list[i].wind.speed,
                    humidity: response.data.list[i].main.humidity,
                    pressure: response.data.list[i].main.pressure,
                    icon: "http://openweathermap.org/img/w/" +  response.data.list[i].weather[0].icon + ".png",
                    time: new Date((response.data.list[i].dt)*1000).toTimeString().substring(0,5)


                //     time: "",
                // icon: "",
                // max_temp: "",
                // description: "",
                // min_temp: "",
                // max_temp: "",
                // speed: "",
                // humidity: "",
                // pressure: ""

                    // max_temp: response.data.list[i].main.temp_max,

                }

                var weatherDate = new Date(response.data.list[i].dt * 1000)
                if (i === 0 || weatherForcast.date !== weatherDate.toDateString()) {
                    /* 包含两种情况：第一条天气数据
                       或者 weatherForcast 的日期和当前这一条数据不同，说明这是新一天的天气数据
                       后者需要把前一天的数据添加到 hourlyForcast */

                    if (i !== 0) {
                        argument.dates.push(weatherForcast)
                    }
                    // 初始化新一天的 weatherForcast
                    weatherForcast = {
                        day: weatherDate.toDateString(),
                        hourlyWeathers: [hourlyDatas]
                    }


                    // 判断是不是今天
                    if (nowDate.toDateString() === weatherDate.toDateString()) {
                        weatherForcast.isToday = true
                    } else {
                        weatherForcast.isToday = false
                    }
                } else {
                    // 还是同一天的天气数据，只需在 weatherForcast.hourlyWeathers 里追加一条数据
                    weatherForcast.hourlyWeathers.push(hourlyDatas)
                }
            }




            // 循环结束后最后一天的数据没有添加进去，在这里添加
            if (weatherForcast) {
                argument.dates.hourlyWeathers.push(weatherForcast)
            }
        })
        .catch(function(error) {
            console.log(error);
        });







};

function chart_weather(names) {
    $(".chart_chart").removeClass("None").siblings().addClass("None");
};

function map_weather(names) {
    $(".map_chart").removeClass("None").siblings().addClass("None");
};


$(".li").click(function() { //导航栏li变迁点击高亮函数
    console.log("kfldhjgiufdhbvifugdhb");
    $(this).addClass("active").siblings().removeClass("active"); //被点击的li标签增加class属性增加active属性值，li标签其兄弟的class属性去掉active属性值		
    // console.log($(this).id ==== "main_click");
    // console.log($(this));
    // console.log($(this)[0].id+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");  //测试使用，此处得到的this是一个数组，可以通过this数组中的第0个元素的id属性判断id并选择性的执行函数，好方法！！！！
    // if($(this)[0].id==="main_click"){
    // 	console.log("hhahahhahahhahahhahh!!!!!#####################")
    // }
});
