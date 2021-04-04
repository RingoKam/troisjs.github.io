import{f as t,n as e}from"./app.80aaf375.js";import{b as o}from"./tools.bf27e82e.js";var s=t({name:"Object3D",inject:["three","scene","rendererComponent"],emits:["created","ready"],props:{position:{type:Object,default:{x:0,y:0,z:0}},rotation:{type:Object,default:{x:0,y:0,z:0}},scale:{type:Object,default:{x:1,y:1,z:1}},lookAt:{type:Object,default:null},autoRemove:{type:Boolean,default:!0}},unmounted(){this.autoRemove&&this.removeFromParent()},methods:{initObject3D(t){this.o3d=t,this.$emit("created",this.o3d),o(this,"position",this.o3d),o(this,"rotation",this.o3d),o(this,"scale",this.o3d),this.lookAt&&this.o3d.lookAt(this.lookAt.x,this.lookAt.y,this.lookAt.z),e((()=>this.lookAt),(t=>{this.o3d.lookAt(t.x,t.y,t.z)}),{deep:!0}),this._parent=this.getParent(),this.addToParent()?this.$emit("ready",this):console.error("Missing parent (Scene, Group...)")},getParent(){let t=this.$parent;for(;t;){if(t.add)return t;t=t.$parent}return!1},addToParent(t){const e=t||this.o3d;return!!this._parent&&(this._parent.add(e),!0)},removeFromParent(t){const e=t||this.o3d;return!!this._parent&&(this._parent.remove(e),!0)},add(t){this.o3d.add(t)},remove(t){this.o3d.remove(t)}},render(){return this.$slots.default?this.$slots.default():[]},__hmrId:"Object3D"});export{s as O};
