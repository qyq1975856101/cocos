// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,
    },

    runJumpAction(){
        var JumpDown = cc.tween().by(this.jumpDuration,{y:-this.jumpHeight},{ easing: 'sineIn'});
        var JumpUp = cc.tween().by(this.jumpDuration,{y:this.jumpHeight},{ easing: 'sineOut'});
        var tween = cc.tween().sequence(JumpUp,JumpDown);
        return cc.tween().repeatForever(tween);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var Jump = this.runJumpAction();
        cc.tween(this.node).then(Jump).start();
    },


    start () {

    },

    // update (dt) {},
});
