
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
            switch (this.active) {
                case 0:
                    if(this.sizeForm.happy ===""){
                        this.$message.error('今の気分を教えて');
                    }else {
                        this.active++
                    }
                    break;
                case 1:
                    if(this.sizeForm.weather ===""){
                        this.$message.error('今の天気を教えて');
                    }else {
                        this.active++
                    }
                    break;
                case 2:
                    if(this.sizeForm.people ===""){
                        this.$message.error('今の人数を教えて');
                    }else {
                        this.active++
                    }
                    break;
                case 3:
                    if(this.sizeForm.clothes ===""){
                        this.$message.error('今の服の色を教えて');
                    }else {
                        this.active++
                    }
                    break;
                default:
                    if (this.active++ > 4) this.active = 0;
                    break;
            }
        },
        back(){
            this.active--;
            if(this.active <0){
                document.location = "./"
            }
        },
        btnClick(){
            this.show = !this.show;
        },
        submit() {

        }
    }
});
