// https://www.bilibili.com/video/av18751303/?spm_id_from=333.788.videocard.6

const app = Vue.createApp({

    template: `
    <div class="circlePanel">
        <div class="pieImg">
        <ul class='pie'>
            <li v-for="(item,i) in localJsonData" :key="i" class='slice' :style = "{transform: 'rotate(' + deg * i + 'deg)' + 'skewY(' + (deg - 90 ) + 'deg)' }" :class="[  i % 2 ==0 ? 'bg-dark':'bg-danger']"   > 
                <ul  class="pieItem text-center fw-bold"  :class="item.color" :style = "{transform: 'rotate( '+ (deg+3) +'deg)' + 'skewY(' + (deg -37 ) + 'deg)' }">               
                   
                    <li>{{item.name}}</li>
                     <li><span class="material-icons fz-14">
                    {{item.icon}}
                    </span></li>
                </ul>
            </li>
        </ul>
        <div class="pieArrow" id="pieArrow" >
        <div class="position-relative" >
        <img   class="pieArrowImg" src="./imgage/component.png" alt=""> 
        </div>
        </div>
        <div class="piePress"><a  @click="rotateArrow" href="#" >PRESS</a></div> 
        </div>
        
    </div>
    


    `,
    data() {
        return {
            //JSON 資料
            localJsonData: [],
            //平均角度
            deg: 0,
            //優惠券數量
            itemNum: 0,
            //起始角度
            start_deg: 0,
            //旋轉圈數
            circle: 4,
            //旋轉角度
            degree: 0,
            //圈數
            number: [0, 1, 2, 3, 4, 5, 6, 7],
            //隨機圈數
            mathNumber: 0,
            //獎品角度
            prizeRotate:[45],
        }
    },
    methods: {
        //取得本地端json檔
        getLocalJson() {

            axios.get(`data.json`)
                .then(
                    res => {
                        console.log(res);
                        if (res.status == 200) {
                            this.localJsonData = res.data;
                        } else {
                            alert("JSON檔讀取失敗!")
                        }

                    }
                )
                .catch(
                    err => {
                        console.dir(err)
                        alert(`本地端的 ${err.config.url} ${err.response.statusText}`)
                    }
                )
        },
        //旋轉
        rotateArrow() {
            this.degree = this.circle * 360 + this.start_deg +this.deg * this.mathNumber ;
            $(() => {
                $('#pieArrow').rotate({
                    angle: this.start_deg,// 旋轉指定角度(沒有動畫)
                    duration: 5000,//動畫執行的時間 毫秒
                    animateTo: this.degree,//旋轉多少角度(有動畫)
                    callback: () => {//旋轉結束後回傳結果
                        console.log(this.degree)
                        console.log(this.number)
                        console.log(this.localJsonData[this.mathNumber].name)
                        alert(this.localJsonData[this.mathNumber].name)
                        this.start_deg = this.degree % 360;
                        console.log(this.start_deg)

                        
                    },
                });
            })
        },
        //隨機數字
        creatMathNumber() {
            this.mathNumber = this.number[Math.floor(Math.random() * this.number.length)];
        },
    },
    watch: {
        localJsonData() {
            this.deg = 360 / this.localJsonData.length;
            this.itemNum = this.localJsonData.length;
        },
        start_deg() {
                             //旋轉圈數    +     起始位子            +平均角度 *亂數
            this.degree = this.circle * 360 + this.start_deg + this.deg * this.mathNumber ;
        }
    },
    created() {
        this.getLocalJson();
        this.creatMathNumber();
        
    },
    mounted(){
        
    },
});

app.mount("#app");