import{f as e,n as t,r as s,o as r,c as a,w as i,b as n}from"./app.80aaf375.js";import{Y as o,P as h,S as g,M as l,V as m}from"./OrbitControls.42fcbb91.js";import{C as u,R as c,S as p,u as d,g as v,P as f}from"./useTextures.e305659d.js";import{b as P,c as y,l as x}from"./tools.bf27e82e.js";var b=e({extends:u,name:"OrthographicCamera",inject:["three"],props:{left:{type:Number,default:-1},right:{type:Number,default:1},top:{type:Number,default:1},bottom:{type:Number,default:-1},near:{type:Number,default:.1},far:{type:Number,default:2e3},zoom:{type:Number,default:1},position:{type:Object,default:{x:0,y:0,z:0}}},created(){this.camera=new o(this.left,this.right,this.top,this.bottom,this.near,this.far),P(this,"position",this.camera),["left","right","top","bottom","near","far","zoom"].forEach((e=>{t((()=>this[e]),(()=>{this.camera[e]=this[e],this.camera.updateProjectionMatrix()}))})),this.three.camera=this.camera},__hmrId:"OrthographicCamera"});function C(e){let t,s,r;const a={value:null},i={value:new m(.5,.5)},n={value:0},o={value:new m(0,0)},u={value:new m(1,1)};return t=new h(2,2,1,1),s=new g({transparent:!0,uniforms:{map:a,center:i,strength:n,uvOffset:o,uvScale:u},vertexShader:"\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",fragmentShader:"\n        uniform sampler2D map;\n        uniform vec2 center;\n        uniform float strength;\n        uniform vec2 uvOffset;\n        uniform vec2 uvScale;\n        varying vec2 vUv;\n\n        float random(vec3 scale, float seed) {\n          /* use the fragment position for a different seed per-pixel */\n          return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n        }\n        \n        void main() {\n          vec2 tUv = vUv * uvScale + uvOffset;\n          if (abs(strength) > 0.001) {\n            vec4 color = vec4(0.0);\n            float total = 0.0;\n            vec2 toCenter = center * uvScale + uvOffset - tUv;\n            \n            /* randomize the lookup values to hide the fixed number of samples */\n            float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n            \n            for (float t = 0.0; t <= 20.0; t++) {\n              float percent = (t + offset) / 20.0;\n              float weight = 2.0 * (percent - percent * percent);\n              vec4 texel = texture2D(map, tUv + toCenter * percent * strength);\n\n              /* switch to pre-multiplied alpha to correctly blur transparent images */\n              texel.rgb *= texel.a;\n\n              color += texel * weight;\n              total += weight;\n            }\n\n            gl_FragColor = color / total;\n\n            /* switch back from pre-multiplied alpha */\n            gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n            gl_FragColor.a = 1.0 - abs(strength);\n          } else {\n            gl_FragColor = texture2D(map, tUv);\n          }\n        }\n      "}),r=new l(t,s),{geometry:t,material:s,mesh:r,uCenter:i,uStrength:n,setMap:function(e){a.value=e,c()},updateUV:c};function c(){const t=e.size.ratio,s=a.value.image.width/a.value.image.height;o.value.set(0,0),u.value.set(1,1),s>t?(u.value.x=t/s,o.value.x=(1-u.value.x)/2):(u.value.y=s/t,o.value.y=(1-u.value.y)/2)}}const w=e({components:{OrthographicCamera:b,Renderer:c,Scene:p},props:{images:Array,events:{type:Object,default:()=>({wheel:!0,click:!0,keyup:!0})}},setup(){const e=new m;return{loader:d(),center:e,progress:0,targetProgress:0}},mounted(){this.three=this.$refs.renderer.three,this.images.length<2?console.error("This slider needs at least 2 images."):this.loader.loadTextures(this.images,this.init)},unmounted(){this.loader.dispose();const e=this.three.renderer.domElement;e.removeEventListener("click",this.onClick),e.removeEventListener("wheel",this.onWheel),document.removeEventListener("keyup",this.onKeyup)},methods:{init(){this.initScene(),v.fromTo(this.image1.uStrength,{value:-2},{value:0,duration:2.5,ease:f.easeOut});const e=this.three.renderer.domElement;this.events.click&&e.addEventListener("click",this.onClick),this.events.wheel&&e.addEventListener("wheel",this.onWheel),this.events.keyup&&document.addEventListener("keyup",this.onKeyup),this.three.onBeforeRender(this.animate),this.three.onAfterResize(this.onResize)},initScene(){const e=this.$refs.scene.scene;this.image1=new C(this.three),this.image1.setMap(this.loader.textures[0]),this.image2=new C(this.three),this.image2.setMap(this.loader.textures[1]),this.setImagesProgress(0),e.add(this.image1.mesh),e.add(this.image2.mesh)},animate(){const{positionN:e}=this.three.pointer;this.center.copy(e).divideScalar(2).addScalar(.5),y(this.image1.uCenter.value,this.center,.1),y(this.image2.uCenter.value,this.center,.1),this.updateProgress()},onResize(){this.image1.updateUV(),this.image2.updateUV()},onWheel(e){e.deltaY>0?this.setTargetProgress(this.targetProgress+.05):this.setTargetProgress(this.targetProgress-.05)},onClick(e){e.clientY<this.three.size.height/2?this.navPrevious():this.navNext()},onKeyup(e){37===e.keyCode||38===e.keyCode?this.navPrevious():39!==e.keyCode&&40!==e.keyCode||this.navNext()},navNext(){Number.isInteger(this.targetProgress)?this.setTargetProgress(this.targetProgress+1):this.setTargetProgress(Math.ceil(this.targetProgress))},navPrevious(){Number.isInteger(this.targetProgress)?this.setTargetProgress(this.targetProgress-1):this.setTargetProgress(Math.floor(this.targetProgress))},setTargetProgress(e){this.targetProgress=e,this.targetProgress<0&&(this.progress+=this.images.length,this.targetProgress+=this.images.length)},updateProgress(){const e=x(this.progress,this.targetProgress,.1),t=e-this.progress;if(0===t)return;const s=this.progress%1,r=e%1;if(t>0&&r<s||t<0&&s<r){const t=Math.floor(e)%this.images.length,s=(t+1)%this.images.length;this.image1.setMap(this.loader.textures[t]),this.image2.setMap(this.loader.textures[s])}this.progress=e,this.setImagesProgress(this.progress%1)},setImagesProgress(e){this.image1.uStrength.value=e,this.image2.uStrength.value=-1+e}}});w.render=function(e,t,o,h,g,l){const m=s("OrthographicCamera"),u=s("Scene"),c=s("Renderer");return r(),a(c,{ref:"renderer",antialias:"",resize:"",pointer:""},{default:i((()=>[n(m,{ref:"camera",position:{z:10}},null,512),n(u,{ref:"scene"},null,512)])),_:1},512)};const S={components:{Slider:w},data:()=>({images:[{src:"/assets/images/img10.jpg"},{src:"/assets/images/img6.jpg"},{src:"/assets/images/img7.jpg"},{src:"/assets/images/img8.jpg"},{src:"/assets/images/img2.jpg"}]})};S.render=function(e,t,i,n,o,h){const g=s("Slider");return r(),a(g,{images:o.images},null,8,["images"])};export default S;
