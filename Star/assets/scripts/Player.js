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

    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },
    onKeyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var Jump = this.runJumpAction();
        cc.tween(this.node).then(Jump).start();

        this.accLeft = false;
        this.accRight = false;
        this.moveSpeed = 0;

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   

    },


    start () {

    },

    update (dt) {
        if(this.accLeft){
            this.moveSpeed -= this.accel*dt;
        }
        else if(this.accRight){
            this.moveSpeed += this.accel*dt;
        }
        if(Math.abs(this.moveSpeed)>this.maxMoveSpeed){
            this.moveSpeed = this.maxMoveSpeed*this.moveSpeed/Math.abs(this.moveSpeed);
        }

        this.node.x += this.moveSpeed*dt;
    },

    
    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp ,this)
    }
});
