import jhState from './entity/jhState' 
import wj3State from './entity/wj3State'
import wj4State from './entity/wj4State'
import wj7State from './entity/wj7State' //百川
import wj9State from './entity/wj9State' //变现猫
import tajxState from './entity/tajxState'
import bxState from './entity/bxState' //贝享
import wanteng from './entity/wanteng' //万腾
import wyydState from './entity/wyydState' //网易有道
import wbjState from './entity/wbjState'
import yk8State from './entity/yk8State'
import ykhdtState from './entity/ykhdtState'
import wj5State from './entity/wj5State'
import wbj88State from './entity/wbj88State'
import jgggState from './entity/jgggState'
import ykksState from './entity/ykksState'
import ytcbState from './entity/ytcbState'
import catState from './entity/catState'
import shState from './entity/shState'

/** 
 * 添加渠道统计代码 
 * 在configMap中追加渠道号对应的实体类
*/
var configMap = {
    //jh 渠道 1 - 100 渠道的统计代码
    ...createMap('jh',jhState,0,100),
    ...createMap('tajx',tajxState,0,100),
    ...createMap('hxly',wj3State,1,3), //hlxy 使用wj3的统计方法
    ...createMap('wj3',wj3State),
    ...createMap('wj4',wj4State),
    ...createMap('wj7',wj7State),
    ...createMap('wj9',wj9State),
    ...createMap('bx',bxState,0,100),
    ...createMap('wanteng',wanteng,0,100),
    ...createMap('wyyd',wyydState,0,100),
    ...createMap('yk',tajxState,0,7), //yk 用tajx的统计方法
    ...createMap('yk',tajxState,9,10), //yk 用tajx的统计方法
    ...createMap('yk8',yk8State),  //yk8 用的也是tajx的统计方法
    ...createMap('xm',tajxState,0,100), //xm 用tajx的统计方法
    ...createMap('ta',tajxState,0,20), //ta 用tajx的统计方法
    ...createMap('ykhdt',ykhdtState,0,3), //ykhdt 用ykhdtState的统计方法
    ...createMap('wbj',wbjState,0,25), 
    ...createMap('wbj88',wbj88State), 
    ...createMap('wj5',wj5State), 
    ...createMap('jggg',jgggState,0,10),
    ...createMap('ykks',ykksState,0,100),
    ...createMap('ytcb',ytcbState,0,100),
    ...createMap('cat',catState,1,10),
    ...createMap('sh',shState,0,100),
};


function createMap(keyword,entity,startIndex = -1,endIndex=-1){
    var map = {};
    let channelName = getUrlArgs('channel') || '';
    if(!channelName.includes(keyword)) {
        return map;
    }

    if(startIndex == -1 && endIndex == -1) {
        map[`${keyword}`] = entity;
        return map
    }

    for (let index = startIndex; index <= endIndex; index++) {
        if(index == 0) {
            map[`${keyword}`] = entity;
        }
        else {
            map[`${keyword}${index}`] = entity;
        }
    }
    return map;
}

export default configMap