/**
 * @author kozakluke@gmail.com
 * @extends {ObjectRenderer}
 * @constructor
 */
function Sprite3DRenderer(renderer)
{
    PIXI.ObjectRenderer.call(this, renderer);
    
    this.vertSize = 6;
    
    this.vertByteSize = this.vertSize * 4;

    this.size = PIXI.SPRITE_BATCH_SIZE; // 2000 is a nice balance between mobile / desktop
    
    // the total number of bytes in our batch
    var numVerts = this.size * 4 * this.vertByteSize;
    // the total number of indices in our batch
    var numIndices = this.size * 7;
    
    this.vertices  = new ArrayBuffer(numVerts);
    this.positions = new Float32Array(this.vertices);
    this.colors    = new Uint32Array(this.vertices);
    this.indices   = new Uint16Array(numIndices);
    
    for (var i = 0, j = 0; i < numIndices; i += 6, j += 4)
    {
        this.indices[i + 0] = j + 0;
        this.indices[i + 1] = j + 1;
        this.indices[i + 2] = j + 2;
        this.indices[i + 3] = j + 0;
        this.indices[i + 4] = j + 2;
        this.indices[i + 5] = j + 3;
    }

    this.drawing = false;
    this.currentBatchSize = 0;
    
    this.textures   = [];
    this.shaders    = [];
    this.sprites    = [];

    this.shader = null;
    
    this.perspectiveMatrix = identity(1.5);
    this.projection3d = mat4.create();
    this.combinedMatrix = mat4.create();
    
    function identity(t) {
        return [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, t,
                0, 0, 0, 1]
    }
}

Sprite3DRenderer.prototype = Object.create(PIXI.ObjectRenderer.prototype);
Sprite3DRenderer.prototype.constructor = Sprite3DRenderer;
PIXI.WebGLRenderer.registerPlugin('sprite3d', Sprite3DRenderer);

Sprite3DRenderer.prototype.onContextChange = function()
{
    var gl = this.renderer.gl;

    // setup default shader
    this.shader = new Sprite3DShader(this.renderer.shaderManager);
    
    // create a couple of buffers
    this.vertexBuffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();

    // 65535 is max index, so 65535 / 6 = 10922.

    //upload the index data
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);

    this.currentBlendMode = 99999;
};

Sprite3DRenderer.prototype.render = function(sprite)
{
    var texture = sprite._texture;
    
    //TODO set blend modes..
    // check texture..
    if (this.currentBatchSize >= this.size)
    {
        this.flush();
        this.currentBaseTexture = texture.baseTexture;
    }
    
    // get the uvs for the texture
    var uvs = texture._uvs;
    
    // TODO trim??
    var aX = sprite.anchor.x;
    var aY = sprite.anchor.y;
    
    var w0, w1, h0, h1;
    
    if (texture.trim)
    {
        // if the sprite is trimmed then we need to add the extra space before transforming the sprite coords..
        var trim = texture.trim;
        
        w1 = trim.x - aX * trim.width;
        w0 = w1 + texture.crop.width;
        
        h1 = trim.y - aY * trim.height;
        h0 = h1 + texture.crop.height;
    
    }
    else
    {
        w0 = (texture._frame.width ) * (1-aX);
        w1 = (texture._frame.width ) * -aX;
        
        h0 = texture._frame.height * (1-aY);
        h1 = texture._frame.height * -aY;
    }
    
    
    var index = this.currentBatchSize * this.vertByteSize;
    var worldTransform = sprite.worldTransform,
        a = worldTransform.a,
        b = worldTransform.b,
        c = worldTransform.c,
        d = c.d,
        tx = c.tx,
        ty = c.ty,
        y = sprite.worldTransform3d,
        x = y[0],
        b = y[1],
        T = y[2],
        _ = (y[3], y[4]),
        E = y[5],
        w = y[6],
        S = y[12],
        A = y[13],
        C = y[14];
        
    var positions = this.positions;
    positions[index] = x * w1 + _ * h1 + S;
    positions[index + 1] = b * w1 + E * h1 + A;
    positions[index + 2] = T * w1 + w * h1 + C;

    positions[index + 6] = x * w0 + _ * h1 + S;
    positions[index + 7] = b * w0 + E * h1 + A;
    positions[index + 8] = T * w0 + w * h1 + C;

    positions[index + 12] = x * w0 + _ * h0 + S;
    positions[index + 13] = b * w0 + E * h0 + A;
    positions[index + 14] = T * w0 + w * h0 + C;

    positions[index + 18] = x * w1 + _ * h0 + S;
    positions[index + 19] = b * w1 + E * h0 + A;
    positions[index + 20] = T * w1 + w * h0 + C;
    
    
    // uv
    positions[index+3] = uvs.x0;
    positions[index+4] = uvs.y0;
    
    // uv
    positions[index+9] = uvs.x1;
    positions[index+10] = uvs.y1;
    
     // uv
    positions[index+15] = uvs.x2;
    positions[index+16] = uvs.y2;
    
    // uv
    positions[index+21] = uvs.x3;
    positions[index+22] = uvs.y3;
    
    var colors = this.colors;
    var tint = sprite.tint;
    colors[index+5]  =
    colors[index+11] =
    colors[index+17] =
    colors[index+23] = (tint >> 16) + (tint & 0xff00) + ((tint & 0xff) << 16) + (sprite.worldAlpha * 255 << 24);
    
    this.sprites[this.currentBatchSize++] = sprite;
};

Sprite3DRenderer.prototype.flush = function()
{
    if (this.currentBatchSize === 0)
        return;
    
    var gl = this.renderer.gl;
    
    if (this.currentBatchSize > this.size * 0.5)
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
    else {
        var view = this.positions.subarray(0, this.currentBatchSize * this.vertByteSize);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
    }
    
    var nextTexture, nextShader;
    var batchSize = 0;
    var start = 0;
    
    var currentBaseTexture = null;
    var currentShader = null;
    var sprite;
    
    var projectionMatrix = this.renderer.currentRenderTarget.projectionMatrix;
    this.projection3d[0]  = projectionMatrix.a;
    this.projection3d[5]  = projectionMatrix.d;
    this.projection3d[10] = 2 / 2700;
    this.projection3d[12] = projectionMatrix.tx;
    this.projection3d[13] = projectionMatrix.ty;
    
    this.combinedMatrix = mat4.multiply(this.combinedMatrix, this.perspectiveMatrix, this.projection3d);
    
    for (var i = 0, j = this.currentBatchSize; i < j; i++)
    {
        sprite = this.sprites[i];
        
        nextTexture = sprite._texture.baseTexture;
        nextShader  = sprite.shader || this.shader;
        
        var shaderSwap = currentShader != nextShader;
        if (currentBaseTexture != nextTexture)
        {
            this.renderBatch(currentBaseTexture, batchSize, start);
            
            start = i;
            batchSize = 0;
            currentBaseTexture = nextTexture;

            if (shaderSwap)
            {
                currentShader = nextShader;
                var shader = currentShader.shaders ? currentShader.shaders[gl.id] : currentShader;
                
                if (!shader)
                    shader = currentShader.getShader(this.renderer);
                
                // set shader function???
                this.renderer.shaderManager.setShader(shader);
                
                shader.uniforms.projectionMatrix3d.value = this.combinedMatrix;
                shader.syncUniforms();
                gl.activeTexture(gl.TEXTURE0);
            }
        }
        
        batchSize++;
    }
    
    this.renderBatch(currentBaseTexture, batchSize, start);
    this.currentBatchSize = 0;
};

/**
 * @private
 */
Sprite3DRenderer.prototype.renderBatch = function(texture, size, startIndex)
{
    if (size == 0)
        return;
    var gl = this.renderer.gl;
    if (!texture._glTextures[gl.id])
        this.renderer.updateTexture(texture);
    else
        gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);
    
    gl.drawElements(gl.TRIANGLES, size * 6, gl.UNSIGNED_SHORT, startIndex * 6 * 2);
    this.renderer.drawCount++;
};

Sprite3DRenderer.prototype.start = function()
{
    var gl = this.renderer.gl;
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindBuffer(gl.ARRAY_BUFFER,         this.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    
    gl.vertexAttribPointer(this.shader.attributes.aVertexPosition, 3, gl.FLOAT, false, this.vertByteSize, 0);
    gl.vertexAttribPointer(this.shader.attributes.aTextureCoord,   2, gl.FLOAT, false, this.vertByteSize, 3 * 4);
    
    gl.vertexAttribPointer(this.shader.attributes.aColor, 4, gl.UNSIGNED_BYTE, true, this.vertByteSize, 5 * 4);
};

Sprite3DRenderer.prototype.destroy = function ()
{
    this.renderer.gl.deleteBuffer(this.vertexBuffer);
    this.renderer.gl.deleteBuffer(this.indexBuffer);
    
    this.shader.destroy();
    this.shader = null;
    
    this.renderer = null;
    
    this.vertices = null;
    this.positions = null;
    this.indices = null;
    
    this.vertexBuffer = null;
    this.indexBuffer = null;
    
    this.drawing = false;
    
    this.textures = null;
    this.shaders = null;
    this.sprites = null;
    
};
