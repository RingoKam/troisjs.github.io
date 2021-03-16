import{o as a,c as t,d as s}from"./app.daac61c3.js";const n='{"title":"ShaderMaterial","description":"","frontmatter":{},"headers":[{"level":3,"title":"Props","slug":"props"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Adding textures","slug":"adding-textures"}],"relativePath":"guide/materials/shader-material.md","lastUpdated":1615893692528}',e={},p=s('<h1 id="shadermaterial"><a class="header-anchor" href="#shadermaterial" aria-hidden="true">#</a> ShaderMaterial</h1><p>Creates a <a href="https://threejs.org/docs/#api/en/materials/ShaderMaterial" target="_blank" rel="noopener noreferrer">THREE.ShaderMaterial</a> rendered with custom shaders.</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Box</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ShaderMaterial</span> <span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Box</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><p>Source : <a href="https://github.com/troisjs/trois/blob/master/src/materials/ShaderMaterial.js" target="_blank" rel="noopener noreferrer">https://github.com/troisjs/trois/blob/master/src/materials/ShaderMaterial.js</a></p><h3 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h3><table><tbody><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr><tr><td><code>uniforms</code></td><td>Uniforms to pass to shader</td><td>Object</td><td></td></tr><tr><td><code>vertexShader</code></td><td>Vertex shader, as string</td><td>String</td><td></td></tr><tr><td><code>fragmentShader</code></td><td>Fragment shader, as string</td><td>String</td><td></td></tr></tbody></table><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2><h3 id="adding-textures"><a class="header-anchor" href="#adding-textures" aria-hidden="true">#</a> Adding textures</h3><p>You can pass textures to shaders by adding a <code>Texture</code> with the prop <code>uniform</code> as a child of the material:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ShaderMaterial</span> <span class="token attr-name">:fragmentShader</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>...<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Texture</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/my/texture/src.png<span class="token punctuation">&quot;</span></span> <span class="token attr-name">uniform</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>myCustomTexture<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ShaderMaterial</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><p>The texture will be set as a uniform sampler2D in the shader. The fragment shader in the example above would have access to the texture as:</p><div class="language-glsl"><pre><code><span class="token keyword">uniform</span> <span class="token keyword">sampler2D</span> myCustomTexture<span class="token punctuation">;</span>\n\n<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n  gl_FragColor <span class="token operator">=</span> <span class="token function">texture2D</span><span class="token punctuation">(</span>myCustomTexture<span class="token punctuation">,</span> <span class="token comment">/* your UV vec2 */</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div>',12);e.render=function(s,n,e,o,r,l){return a(),t("div",null,[p])};export default e;export{n as __pageData};
