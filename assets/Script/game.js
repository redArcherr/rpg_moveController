cc.Class({
    extends: cc.Component,

    properties: {
        speed:1000,
        directionX:1,
        directionY:1
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.directionX=0;//键盘事件控制方向
        this.directionY=0;//键盘事件控制方向
        this.bg = cc.find("Canvas/background");
        this.role = cc.find("Canvas/role");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);
     },

    start () {

    },

    onKeyPressed(event){
        let keyCode=event.keyCode;
        let anim=this.role.getComponent(cc.Animation);
        if(keyCode==cc.macro.KEY.a){
            this.directionX=1;
            let animState = anim.getAnimationState('role_l');
            if(!animState.isPlaying){
                anim.play("role_l");
            }  
        }
        if(keyCode==cc.macro.KEY.d){
            this.directionX=-1;
            let animState = anim.getAnimationState('role_r');
            if(!animState.isPlaying){
                anim.play("role_r");
            }
        }
        if(keyCode==cc.macro.KEY.w){
            this.directionY=-1;
            let animState = anim.getAnimationState('role_u');
            if(!animState.isPlaying){
                anim.play("role_u");
            }
        }
        if(keyCode==cc.macro.KEY.s){
            this.directionY=1;
            let animState = anim.getAnimationState('role_d');
            if(!animState.isPlaying){
                anim.play("role_d");
            }
        }
    },

    onKeyReleased(event){
        let keyCode=event.keyCode;
        let anim=this.role.getComponent(cc.Animation);
        if(keyCode==cc.macro.KEY.a){
            this.directionX=0;
            anim.pause('role_l');
        }
        if(keyCode==cc.macro.KEY.d){
            this.directionX=0;
            anim.pause('role_r');
        }
        if(keyCode==cc.macro.KEY.w){
            this.directionY=0;
            anim.pause('role_u');
        }
        if(keyCode==cc.macro.KEY.s){
            this.directionY=0;
            anim.pause('role_d');
        }
    },

    update (dt) { 
        //角色在原点时背景移动
        if(this.role.x==0){
            this.bg.x +=this.directionX*dt*this.speed;
        }
        if(this.role.y==0){
            this.bg.y +=this.directionY*dt*this.speed;
        }
        //计算x,y边界
        let sideX=(this.bg.width-cc.winSize.width)/2;
        let sideY=(this.bg.height-cc.winSize.height)/2;
        //背景到边界 角色移动
        if(this.bg.x>=sideX){
            this.bg.x=sideX;
            this.role.x -=this.directionX*dt*this.speed;
            if(this.role.x>0){
                this.role.x=0;
            }
        }
        if(this.bg.x<=-sideX){
            this.bg.x=-sideX;
            this.role.x -=this.directionX*dt*this.speed;
            if(this.role.x<0){
                this.role.x=0;
            }
        }
        if(this.bg.y>sideY){
            this.bg.y=sideY;
            this.role.y +=this.directionY*dt*this.speed;
            if(this.role.y<0){
                this.role.y=0;
            }
        }
        if(this.bg.y<-sideY){
            this.bg.y=-sideY;
            this.role.y +=this.directionY*dt*this.speed;
            if(this.role.y<0){
                this.role.y=0;
            }
        }
    },
});
