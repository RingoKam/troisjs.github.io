import{P as e,a as t,b as n,c as i,R as s,d as o,S as r,e as a,T as m}from"./trois.module.99ddcb6e.js";import{f as h,n as d,r as l,o as c,c as p,w as u,b as v,a as f}from"./app.80aaf375.js";import{P as x,V as y,W as g,S as b,O as z,a as C,F as w,T as S}from"./OrbitControls.42fcbb91.js";import{m as N,M as T,s as M}from"./snoise2.glsl.cb060ac0.js";import"./Object3D.e03d1dd0.js";import"./tools.bf27e82e.js";const D=h({inject:["mesh"],props:{rotateX:Number,rotateY:Number,rotateZ:Number},created(){this.mesh||console.error("Missing parent Mesh"),this.watchProps=[],Object.entries(this.$props).forEach((e=>this.watchProps.push(e[0]))),this.createGeometry(),this.rotateGeometry(),this.mesh.setGeometry(this.geometry),this.addWatchers()},unmounted(){this.geometry.dispose()},methods:{addWatchers(){this.watchProps.forEach((e=>{d((()=>this[e]),(()=>{this.refreshGeometry()}))}))},rotateGeometry(){this.rotateX&&this.geometry.rotateX(this.rotateX),this.rotateY&&this.geometry.rotateY(this.rotateY),this.rotateZ&&this.geometry.rotateZ(this.rotateZ)},refreshGeometry(){const e=this.geometry;this.createGeometry(),this.rotateGeometry(),this.mesh.setGeometry(this.geometry),e.dispose()}},render:()=>[]});function j(e,t,n){return h({name:e,extends:D,props:t,methods:{createGeometry(){this.geometry=n(this)}}})}const _={width:{type:Number,default:1},height:{type:Number,default:1},widthSegments:{type:Number,default:1},heightSegments:{type:Number,default:1}};function G(e){return new x(e.width,e.height,e.widthSegments,e.heightSegments)}j("PlaneGeometry",_,G);var R=N("Plane",_,G),P=h({extends:R,props:{timeCoef:{type:Number,default:.001},noiseCoef:{type:Number,default:5},deltaCoef:{type:Number,default:1/512},displacementScale:{type:Number,default:5}},setup(e){const t={value:e.noiseCoef};d((()=>e.noiseCoef),(e=>{t.value=e}));const n={value:new y(e.deltaCoef,e.deltaCoef)};return d((()=>e.deltaCoef),(e=>{n.value.set(e,e)})),{uTime:{value:0},uNoiseCoef:t,uDelta:n}},mounted(){this.init(),d((()=>this.displacementScale),(e=>{this.material.displacementScale=e})),this.startTime=Date.now(),this.three.onBeforeRender(this.update)},unmounted(){this.three.offBeforeRender(this.update),this.fsQuad.dispose(),this.dispRT.dispose(),this.dispMat.dispose(),this.normRT.dispose(),this.normMat.dispose()},methods:{init(){this.fsQuad=new e.FullScreenQuad,this.dispRT=new g(512,512,{depthBuffer:!1,stencilBuffer:!1}),this.dispMat=new b({uniforms:{uTime:this.uTime,uNoiseCoef:this.uNoiseCoef},vertexShader:"\n          varying vec2 vUv;\n          void main() {\n            vUv = uv;\n            // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n            gl_Position = vec4(position, 1.0);\n          }\n        ",fragmentShader:"\n          uniform float uTime;\n          uniform float uNoiseCoef;\n          varying vec2 vUv;\n          \n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }\nvec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\n\nfloat snoise(vec3 v)\n{\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n  // First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n  // Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n  // Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n  // Gradients: 7x7 points over a square, mapped onto an octahedron.\n  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n  // Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n  // Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n}\n\n          void main() {\n            vec2 p = vec2(vUv * uNoiseCoef);\n            float noise = (snoise(vec3(p.x, p.y, uTime)) + 1.0) / 2.0;\n            gl_FragColor = vec4(noise, 0.0, 0.0, 1.0);\n          }\n        "}),this.normRT=new g(512,512,{depthBuffer:!1,stencilBuffer:!1}),this.normMat=new b({uniforms:{dispMap:{value:this.dispRT.texture},delta:this.uDelta},vertexShader:"\n          varying vec2 vUv;\n          void main() {\n            vUv = uv;\n            // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n            gl_Position = vec4(position, 1.0);\n          }\n        ",fragmentShader:"\n          uniform sampler2D dispMap;\n          uniform vec2 delta;\n          varying vec2 vUv;\n          void main() {\n            // gl_FragColor = vec4(0.5, 0.5, 1.0, 0.0);\n            float x1 = texture2D(dispMap, vec2(vUv.x - delta.x, vUv.y)).r;\n            float x2 = texture2D(dispMap, vec2(vUv.x + delta.x, vUv.y)).r;\n            float y1 = texture2D(dispMap, vec2(vUv.x, vUv.y - delta.y)).r;\n            float y2 = texture2D(dispMap, vec2(vUv.x, vUv.y + delta.y)).r;\n            gl_FragColor = vec4(0.5 + (x1 - x2), 0.5 + (y1 - y2), 1.0, 1.0);\n          }\n        "}),this.material.displacementMap=this.dispRT.texture,this.material.displacementScale=this.displacementScale,this.material.normalMap=this.normRT.texture,this.material.normalMapType=z},update(){this.uTime.value=(Date.now()-this.startTime)*this.timeCoef,this.renderDisp()},renderDisp(){this.renderMat(this.dispMat,this.dispRT),this.renderMat(this.normMat,this.normRT)},renderMat(e,t){const n=this.three.renderer;this.fsQuad.material=e;const i=n.getRenderTarget();n.setRenderTarget(t),this.fsQuad.render(n),n.setRenderTarget(i)}},__hmrId:"NoisyPlane"});const I={radius:{type:Number,default:1},widthSegments:{type:Number,default:12},heightSegments:{type:Number,default:12}};function A(e){return new C(e.radius,e.widthSegments,e.heightSegments)}j("SphereGeometry",I,A);var B=N("Sphere",I,A),Z=h({extends:B,props:{radius:{type:Number,default:20},widthSegments:{type:Number,default:128},heightSegments:{type:Number,default:128},timeCoef:{type:Number,default:.001},noiseCoef:{type:Number,default:.05},dispCoef:{type:Number,default:5}},setup(e){const t={value:e.noiseCoef};d((()=>e.noiseCoef),(e=>{t.value=e}));const n={value:e.dispCoef};return d((()=>e.dispCoef),(e=>{n.value=e})),{uTime:{value:0},uNoiseCoef:t,uDispCoef:n}},mounted(){this.updateMaterial(),this.startTime=Date.now(),this.three.onBeforeRender(this.updateTime)},unmounted(){this.three.offBeforeRender(this.updateTime)},methods:{updateMaterial(){this.material.onBeforeCompile=e=>{e.uniforms.uTime=this.uTime,e.uniforms.uNoiseCoef=this.uNoiseCoef,e.uniforms.uDispCoef=this.uDispCoef,e.vertexShader="\n          uniform float uTime;\n          uniform float uNoiseCoef;\n          uniform float uDispCoef;\n          varying float vNoise;\n          \n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nfloat mod289(float x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\nvec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }\nfloat permute(float x) { return mod289(((x*34.0)+1.0)*x); }\nvec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\nfloat taylorInvSqrt(float r) { return 1.79284291400159 - 0.85373472095314 * r; }\n\nvec4 grad4(float j, vec4 ip)\n{\n  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n  vec4 p,s;\n\n  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n  s = vec4(lessThan(p, vec4(0.0)));\n  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n  return p;\n}\n\n// (sqrt(5) - 1)/4 = F4, used once below\n#define F4 0.309016994374947451\n\nfloat snoise(vec4 v)\n{\n  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4\n                        0.276393202250021,  // 2 * G4\n                        0.414589803375032,  // 3 * G4\n                        -0.447213595499958); // -1 + 4 * G4\n\n  // First corner\n  vec4 i  = floor(v + dot(v, vec4(F4)) );\n  vec4 x0 = v -   i + dot(i, C.xxxx);\n\n  // Other corners\n\n  // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\n  vec4 i0;\n  vec3 isX = step( x0.yzw, x0.xxx );\n  vec3 isYZ = step( x0.zww, x0.yyz );\n  //  i0.x = dot( isX, vec3( 1.0 ) );\n  i0.x = isX.x + isX.y + isX.z;\n  i0.yzw = 1.0 - isX;\n  //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );\n  i0.y += isYZ.x + isYZ.y;\n  i0.zw += 1.0 - isYZ.xy;\n  i0.z += isYZ.z;\n  i0.w += 1.0 - isYZ.z;\n\n  // i0 now contains the unique values 0,1,2,3 in each channel\n  vec4 i3 = clamp( i0, 0.0, 1.0 );\n  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n  vec4 x1 = x0 - i1 + C.xxxx;\n  vec4 x2 = x0 - i2 + C.yyyy;\n  vec4 x3 = x0 - i3 + C.zzzz;\n  vec4 x4 = x0 + C.wwww;\n\n  // Permutations\n  i = mod289(i);\n  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\n  vec4 j1 = permute( permute( permute( permute (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n  // Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\n  // 7*7*6 = 294, which is close to the ring size 17*17 = 289.\n  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n  vec4 p0 = grad4(j0,   ip);\n  vec4 p1 = grad4(j1.x, ip);\n  vec4 p2 = grad4(j1.y, ip);\n  vec4 p3 = grad4(j1.z, ip);\n  vec4 p4 = grad4(j1.w, ip);\n\n  // Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n  p4 *= taylorInvSqrt(dot(p4,p4));\n\n  // Mix contributions from the five corners\n  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\n  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\n  m0 = m0 * m0;\n  m1 = m1 * m1;\n  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))\n               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\n\n}\n\n        "+e.vertexShader,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>","\n            vec4 p = vec4(vec3(position * uNoiseCoef), uTime);\n            vNoise = snoise(p);\n            vec3 transformed = vec3(position);\n            transformed += normalize(position) * vNoise * uDispCoef;\n          "),this.materialShader=e},this.material.needsupdate=!0},updateTime(){this.uTime.value=(Date.now()-this.startTime)*this.timeCoef}},__hmrId:"NoisySphere"});const E={text:String,fontSrc:String,size:{type:Number,default:80},height:{type:Number,default:5},depth:{type:Number,default:1},curveSegments:{type:Number,default:12},bevelEnabled:{type:Boolean,default:!1},bevelThickness:{type:Number,default:10},bevelSize:{type:Number,default:8},bevelOffset:{type:Number,default:0},bevelSegments:{type:Number,default:5},align:{type:[Boolean,String],default:!1}};var L=h({extends:T,props:E,data:()=>({loading:!0}),created(){["text","size","height","curveSegments","bevelEnabled","bevelThickness","bevelSize","bevelOffset","bevelSegments","align"].forEach((e=>{d((()=>this[e]),(()=>{this.font&&this.refreshGeometry()}))}));(new w).load(this.fontSrc,(e=>{this.loading=!1,this.font=e,this.createGeometry(),this.initMesh()}))},methods:{createGeometry(){this.geometry=new S(this.text,{font:this.font,size:this.size,height:this.height,depth:this.depth,curveSegments:this.curveSegments,bevelEnabled:this.bevelEnabled,bevelThickness:this.bevelThickness,bevelSize:this.bevelSize,bevelOffset:this.bevelOffset,bevelSegments:this.bevelSegments}),"center"===this.align&&this.geometry.center()}}});const U={components:{Camera:t,NoisyPlane:P,NoisySphere:Z,NoisyText:h({extends:L,props:{timeCoef:{type:Number,default:.001},noiseCoef:{type:Number,default:.015},zCoef:{type:Number,default:10}},setup(e){const t={value:e.noiseCoef};d((()=>e.noiseCoef),(e=>{t.value=e}));const n={value:e.zCoef};return d((()=>e.zCoef),(e=>{n.value=e})),{uTime:{value:0},uNoiseCoef:t,uZCoef:n}},mounted(){this.updateMaterial(),this.startTime=Date.now(),this.three.onBeforeRender(this.updateTime)},unmounted(){this.three.offBeforeRender(this.updateTime)},methods:{updateMaterial(){this.material.onBeforeCompile=e=>{e.uniforms.uTime=this.uTime,e.uniforms.uNoiseCoef=this.uNoiseCoef,e.uniforms.uZCoef=this.uZCoef,e.vertexShader=`\n          uniform float uTime;\n          uniform float uNoiseCoef;\n          uniform float uZCoef;\n          ${M}\n        `+e.vertexShader,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>","         \n            vec3 p = vec3(position * uNoiseCoef);\n            p.x += uTime;\n            float noise = snoise(p.xy);\n            vec3 transformed = vec3(position);\n            transformed.z += noise * uZCoef;\n          "),this.materialShader=e},this.material.needsupdate=!0},updateTime(){this.uTime.value=(Date.now()-this.startTime)*this.timeCoef}},__hmrId:"NoisyText"}),PhysicalMaterial:n,PointLight:i,RefractionMesh:s,Renderer:o,Scene:r,StandardMaterial:a,TorusGeometry:m},mounted(){const e=this.$refs.renderer,t=this.$refs.light1.light,n=this.$refs.light2.light,i=this.$refs.light3.light,s=this.$refs.light4.light,o=this.$refs.mesh.mesh;e.onBeforeRender((()=>{const e=.001*Date.now(),r=100;t.position.x=Math.sin(.1*e)*r,t.position.y=Math.cos(.2*e)*r,n.position.x=Math.cos(.3*e)*r,n.position.y=Math.sin(.4*e)*r,i.position.x=Math.sin(.5*e)*r,i.position.y=Math.sin(.6*e)*r,s.position.x=Math.sin(.7*e)*r,s.position.y=Math.cos(.8*e)*r,o.rotation.x+=.02,o.rotation.y+=.01}))}};U.render=function(e,t,n,i,s,o){const r=l("Camera"),a=l("PointLight"),m=l("PhysicalMaterial"),h=l("NoisyPlane"),d=l("TorusGeometry"),x=l("StandardMaterial"),y=l("RefractionMesh"),g=l("Scene"),b=l("Renderer");return c(),p(b,{ref:"renderer",antialias:"",resize:"","orbit-ctrl":{enableDamping:!0,dampingFactor:.05}},{default:u((()=>[v(r,{position:{x:-0,y:-100,z:30}}),v(g,{background:"#ffffff"},{default:u((()=>[v(a,{ref:"light1",color:"#0E09DC",intensity:.85,position:{x:0,y:0,z:50}},null,8,["intensity"]),v(a,{ref:"light2",color:"#1CD1E1",intensity:.85,position:{x:0,y:0,z:50}},null,8,["intensity"]),v(a,{ref:"light3",color:"#18C02C",intensity:.85,position:{x:0,y:0,z:50}},null,8,["intensity"]),v(a,{ref:"light4",color:"#ee3bcf",intensity:.85,position:{x:0,y:0,z:50}},null,8,["intensity"]),f(' <NoisyText\n        text="TroisJS"\n        font-src="helvetiker_regular.typeface.json"\n        align="center"\n        :size="10"\n        :height="2"\n        :noise-coef="0.03"\n        :z-coef="5"\n        :position="{ x: 0, y: 0, z: 30 }"\n        :rotation="{ x: Math.PI / 2, y: 0, z: 0 }"\n      >\n        <PhysicalMaterial />\n      </NoisyText> '),v(h,{width:200,"width-segments":100,height:200,"height-segments":100,"time-coef":3e-4,"noise-coef":5,"displacement-scale":15,"delta-coef":.005,position:{x:0,y:0,z:0}},{default:u((()=>[v(m)])),_:1},8,["time-coef"]),f(' <NoisySphere\n        :radius="10"\n        :time-coef="0.0003"\n        :noise-coef="0.07"\n        :disp-coef="2"\n        :position="{ x: 0, y: 0, z: 30 }"\n      >\n        <PhysicalMaterial flat-shading />\n      </NoisySphere> '),v(y,{ref:"mesh",position:{x:0,y:-20,z:20},"auto-update":""},{default:u((()=>[v(d,{radius:8,tube:3,"radial-segments":8,"tubular-segments":6}),v(x,{color:"#ffffff",metalness:1,roughness:0,"flat-shading":""})])),_:1},512)])),_:1})])),_:1},8,["orbit-ctrl"])};export default U;
