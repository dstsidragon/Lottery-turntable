// https://www.bilibili.com/video/av18751303/?spm_id_from=333.788.videocard.6
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';
createApp({
    data() {
        return {
            //JSON 資料
            localJsonData: [],
            //平均角度
            deg: 0,
            //優惠券數量
            itemNum: 0,
            //起始角度
            start_deg: 42.5,
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
                        // console.log(res);
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
                        this.start_deg = this.degree % 360;
                        console.log(this.localJsonData[this.number.indexOf(this.start_deg)].name)
                        
                        alert(this.localJsonData[this.number.indexOf(this.start_deg)].name)
                        
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
        },
        deg(){
            this.number =  [42.5,87.5,132.5,177.5,222.5,267.5,312.5,357.5]
        },
    },
    created() {
        this.getLocalJson();
        this.creatMathNumber();
        
    },
    mounted(){
    },
})

.component('changeColor',{
    props:['localJsonData','deg'],
    template:`
    <h2 class="mt-5 text-center h1 border text-white bg-dark"> 更換顏色</h2>
    <div class=" d-flex justify-content-center align-items-center">
    <div class="circlePanel" :key="2">
        <div class="pieImg">
        <ul class='pie'>
            <li v-for="(item,i) in localJsonData" :key="i" class='slice' :style = "{transform: 'rotate(' + deg * i + 'deg)' + 'skewY(' + (deg - 90 ) + 'deg)' }" :style="[  i % 2 ==0 ? goodItemBackgroundColorClass:badItemBackgroundColorClass]"   > 
                <ul  class="pieItem text-center fw-bold"   :style = "{transform: 'rotate( '+ (deg+3) +'deg)' + 'skewY(' + (deg -37 ) + 'deg)' }" :style="[  i % 2 ==0 ? goodItemColorClass:badItemColorClass]" >               
                   
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
        <div class="piePress"><a  href="#" >PRESS</a></div> 
        </div>
        
    </div>

    <div class="colorPanel ms-2">
            <div>
                <label for="goodItemColor">中獎字體顏色</label>
                <input  type="color" v-model="this.goodItemColor">
                <input id="goodItemColor" type="text" v-model="this.goodItemColor">
            </div>
            <div>
              <label for="goodItemBackgroundColor">中獎區塊顏色</label>
              <input type="color" v-model="this.goodItemBackgroundColor">
              <input id="goodItemBackgroundColor" type="text" v-model="this.goodItemBackgroundColor">
          </div>
            <div>
              <label for="badItemColor">落獎字體顏色</label>
              <input type="color" v-model="this.badItemColor">
              <input id="badItemColor" type="text" v-model="this.badItemColor">
             </div>
             <div>
              <label for="badItemBackgroundColor">落獎區塊顏色</label>
              <input type="color"  v-model="this.badItemBackgroundColor">
              <input id="badItemBackgroundColor" type="text" v-model="this.badItemBackgroundColor">
          </div>
        </div>
        </div>
    `,
    data(){
        return{
            goodItemColor:"#ffffff",
            goodItemBackgroundColor:"#dc3545",
            badItemColor:"#dc3545",
            badItemBackgroundColor:"#212529",
            goodItemColorClass:'',
            goodItemBackgroundColorClass:'',
            badItemColorClass:'',
            badItemBackgroundColorClass:'',

        }
    },
    watch:{
        goodItemColor(){
            this.goodItemColorClass = `color:${this.goodItemColor}`;
        },
        goodItemBackgroundColor(){
            this.goodItemBackgroundColorClass = `background:${this.goodItemBackgroundColor};`;
        },
        badItemColor(){
            this.badItemColorClass = `color:${this.badItemColor}`;
        },
        badItemBackgroundColor(){
            this.badItemBackgroundColorClass = `background:${this.badItemBackgroundColor}`;
        },
    },
    
    mounted(){
        this.goodItemColorClass = `color:${this.goodItemColor}`;
        this.goodItemBackgroundColorClass = `background:${this.goodItemBackgroundColor}`;
        this.badItemColorClass = `color:${this.badItemColor}`;
        this.badItemBackgroundColorClass = `background:${this.badItemBackgroundColor}`;
    },
})

.mount("#app");