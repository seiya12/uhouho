
new Vue({
    el:"#inquiry",
    data:{
        active: 0,
        sizeForm: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        }
    },
    methods:{
        next() {
            if (this.active++ > 4) this.active = 0;
        }
    }
});
