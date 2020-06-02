import Vue from 'vue'


// 注册一个全局自定义指令 `v-lazyinput`
// 实现input 在连续输入完毕后实现回调
Vue.directive('lazyinput', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function(el, binding) {
        var last;
        el.addEventListener('keyup', (event) => {
            last = event.timeStamp;
            //利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
            setTimeout(() => { //设时延迟0.5s执行
                if (last - event.timeStamp == 0) {
                    //如果时间差为0（也就是你停止输入0.5s之内都没有其它的keyup事件发生）则做你想要做的事
                    // console.log('binding.value', binding.value);
                    binding.value();
                }
            }, 600);
        });
    }
})
//监听元素大小发生变化
Vue.directive('resize', {
    bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
        let width = '', height = '';
        function isReize() {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width || height !== style.height) {
            binding.value();  // 关键
          }
          width = style.width;
          height = style.height;
        }
        el.__vueSetInterval__ = setInterval(isReize, 300);
      },
      unbind(el) {
        clearInterval(el.__vueSetInterval__);
    }
})
