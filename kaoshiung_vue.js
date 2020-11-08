const app=new Vue({
    el:'#app',
    data:{
        data:[],
        currentLocation:'',
        currentPage:0,
        pages:0,
        locations:[],
    },
    methods:{
        getLocationlist(){
            const vm =this;
            let list=[];
            vm.data.forEach(item=>list.push(item.Zone));
            vm.locations=list.filter((element,index,array)=>
                array.indexOf(element)===index
            );
        },
        scrollTop(){
            $('html,body').animate({scrollTop: 0}, 555);
        },
        autoTop(){
            if ( $(window).scrollTop() > 300 ){
				$('.gotop').fadeIn(444);
				} else {
				$('.gotop').stop().fadeOut(444);
				}
        }
    },
    computed: {
        filterData(){
            const vm=this;
            const newData=[];
            let items=[];
            if(vm.currentLocation===''){
                items=vm.data;
            }else{
                items=vm.data.filter((item,i)=>item.Zone===vm.currentLocation);
            }
           
            items.forEach((item,i)=>{
                if(i%10===0){
                    newData.push([]);
                }
                const page=parseInt(i/10);
                newData[page].push(item);
                console.log(newData);
            })
            vm.pages=newData.length;
            vm.currentPage=0;
            return newData
        },
    },
    created() {
        const vm=this;
        axios.get('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json').then((response)=>{
            vm.data=response.data.result.records;
            console.log(vm.data);
            vm.getLocationlist();
        });
    },
    mounted() {
        window.addEventListener('scroll',this.autoTop);
    },
    destroyed() {
        window.removeEventListener('scroll',this.autoTop);
    },
});
/* filterData(){
    const vm=this;
    let newData=[]
    let items=[];
    if(vm.currentlocation=''){
        item=vm.data
    }else{
        item=vm.data.filter(item=>item.zone===vm.currentlocation)
    }
    item.forEach((item,i)=>{
        if(i%10===0){
            newData.push([]);
        }
        const page=parseInt(i/10);
        newData[page].push(item);
    }
    vm.pages=newData.length;
    currentpage=0;
    return newData
} */