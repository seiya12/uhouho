
new Vue({
    el:"#wrapper",
    data:{
        show:false,
        active: 0,
        sizeForm: {
            delivery: false,
            happy: '',
            weather:'',
            clothes:'',
            breakfast:'',
            people:''
        }
    },
    methods:{
        next() {
            if (this.active++ > 4) this.active = 0;
        },
        btnClick(){
            this.show = !this.show;
        },
        submit() {

        }
    }
});
