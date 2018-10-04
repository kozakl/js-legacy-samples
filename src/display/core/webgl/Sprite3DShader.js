/**
 * @constructor
 */
function Sprite3DShader(shaderManager)
{
    this.uniforms = {
        uSampler: {type: 'sampler2D', value: 0},
        projectionMatrix3d: {
            type: 'mat4',
            value: new Float32Array([1, 0, 0, 0,
                                     0, 1, 0, 0,
                                     0, 0, 1, 0,
                                     0, 0, 0, 1])
        }
    };
    this.attributes = {
        aVertexPosition: 0,
        aTextureCoord: 0,
        aColor: 0
    };
    
    this.vertexSrc = [
        'precision lowp float;',
        
        'attribute vec3 aVertexPosition;',
        'attribute vec2 aTextureCoord;',
        'attribute vec4 aColor;',
        
        'uniform mat4 projectionMatrix3d;',
        
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        
        'void main(void) {',
        '   gl_Position = projectionMatrix3d * vec4(aVertexPosition, 1.0);',
        
        '   vTextureCoord = aTextureCoord;',
        '   vColor        = vec4(aColor.rgb * aColor.a, aColor.a);',
        '}'
    ].join('\n');
    
    this.fragmentSrc = [
        'precision lowp float;',
        
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        
        'uniform sampler2D uSampler;',
        
        'void main(void) {',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;',
        '}'
    ].join('\n');
    
    PIXI.Shader.call(this, shaderManager, this.vertexSrc,
                                          this.fragmentSrc,
                                          this.uniforms,
                                          this.attributes);
}

Sprite3DShader.prototype = Object.create(PIXI.Shader.prototype);
Sprite3DShader.prototype.constructor = Sprite3DShader;
