Component({
  ref() {
    return { key: 'contactDialog' }
  },
  mixins: [],
  data: {
    dialogShow: false,
    count: 0,
    servicePhone:'',
    serviceQQ:''
  },
  props: {
    show: Boolean,
    onLoadData(servicePhone,serviceQQ) {

    }
  },
  didMount() { },
  didUpdate(prevProps, prevData) {
    if (!prevProps.show && this.props.show) {
      this.setData({
        dialogShow: true,
      })
    }

  },
  didUnmount() { },
  methods: {
    cancelOrder(){

    },
    onDialogClose() {
      this.props.onClose();

      this.setData({
        dialogShow: false,
      })
      console.log('this.props.show:', this.props.show)
    },
    toOrderSeek() {
      my.navigateTo({
        url: '/pages/order/orderSeek/orderSeek'
      });
    },
    getConstant(constant) {
      let param = {
        constantNames: ['serviceQQ', 'servicePhone'],
      };
      app.post('getConstantValue', {}, res => {
         this.setData({
           servicePhone:res.resultData.servicePhone,
           serviceQQ:res.resultData.serviceQQ
         })
         this.props.onLoadData(this.data.servicePhone,this.data.serviceQQ)
      })

    },
  },
});
