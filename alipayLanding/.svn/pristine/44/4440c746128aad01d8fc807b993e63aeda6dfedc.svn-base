Component({
  mixins: [],
  data: {
    inputValue:'',
  },
  props: {
     iconUrl:String,
     title:String,
     placeholder:String,
     type:{
       type:String,
       value:'text'
     },
     value:'',
     onInput(e){

     }
  },
  didMount() {
    this.setData({
      inputValue:this.props.value
    })
  },
  didUpdate() {
   
  },
  didUnmount() {},
  methods: {
    onInput(e) {
      this.setData({
        inputValue:e.detail.value
      })
      this.props.onInput(e)
    }
  },
});
