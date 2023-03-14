# Filtro para Daltónicos

<link rel="stylesheet" href="/showcase/sketches/colorBlindFilter/twentytwenty.css">
<script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
<script src="/showcase/sketches/colorBlindFilter/jquery.event.move.js"></script>
<script src="/showcase/sketches/colorBlindFilter/jquery.twentytwenty.js"></script>
<script src="/showcase/sketches/colorBlindFilter/script.js"></script>
<script>
    function mostrar(id){
        document.getElementById(id).style.display = "block";
    }
    function ocultar(id){
        document.getElementById(id).style.display = "none";
    }
    function mostrar_deuteranopia(){
        let elemento = document.getElementById("deuteranopiaDiv");
        if(elemento.style.display === "none"){
            mostrar("deuteranopiaDiv");
        } else {
            ocultar("deuteranopiaDiv");
        }
    }
    function mostrar_protanopia(){
        let elemento = document.getElementById("protanopiaDiv");
        if(elemento.style.display === "none"){
            mostrar("protanopiaDiv");
        } else {
            ocultar("protanopiaDiv");
        }
    }
    function mostrar_tritanopia(){
        let elemento = document.getElementById("tritanopiaDiv");
        if(elemento.style.display === "none"){
            mostrar("tritanopiaDiv");
        } else {
            ocultar("tritanopiaDiv");
        }
    }
</script>

<style>
    button{
        background: black;
        cursor: pointer;
        border: none;
        padding: 12px 25px;
        color: #FFF;
        font-size: 24;
        font-weight: bold;
        position: relative;
        border-radius: 12px;
        margin-right: 35px
    }

    button:focus {
        outline: none;
    }

    button::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            45deg,
            red, blue, deeppink, blue, red, blue, deeppink, blue
        );
        background-size: 800%;
        border-radius: 10px;
        filter: blur(8px);
        animation: glowing 20s linear infinite;
    }

    @keyframes glowing{
        0%{
            background-position: 0 0;
        }
        50%{
            background-position: 400% 0;
        }
        100%{
            background-position: 0% 0;
        }
    }

    div{
        margin-bottom: 15px;
    }

    .divButton{
        display: flex;
        justify-content: center;
    }
</style>

La percepción del color es un aspecto fundamental de nuestra vida diaria. Sin embargo, muchas personas sufren de daltonismo, una discapacidad visual que afecta la capacidad de distinguir ciertos colores. Para ayudar a estas personas a experimentar el mundo del color de una manera más completa, se han desarrollado herramientas y técnicas para simular cómo ven los daltónicos.

Una de estas técnicas es la aplicación de filtros para daltónicos en imágenes digitales. Estos filtros utilizan transformaciones de color que simulan la deficiencia en los conos del ojo humano que causa el daltonismo, y permiten a los daltónicos experimentar imágenes de una manera más completa.

En este caso desarrollamos una aplicación en `p5` que toma como base la siguiente imagen.

![](/showcase/sketches/colorBlindFilter/imagenBase.jpg)

Y aplicamos tres destinos tipos de filtros:

{{< hint warning >}}
**Deuteranopía**  
Es una deficiencia de los conos de longitud de onda media (M) en el ojo humano, lo que hace que se perciban menos los tonos de color verde y se confundan con tonos de color rojo. Las personas con deuteranopía suelen tener dificultades para distinguir los tonos de color verde y marrón, y pueden verlos como tonos de color rojo o amarillo.
{{< /hint >}}

{{< hint danger >}}
**Protanopía**  
Es una deficiencia de los conos de longitud de onda larga (L) en el ojo humano, lo que hace que se perciban menos los tonos de color rojo y se confundan con tonos de color verde. Las personas con protanopía suelen tener dificultades para distinguir los tonos de color rojo y naranja, y pueden verlos como tonos de color verde o amarillo.
{{< /hint >}}

{{< hint info >}}
**Tritanopía**  
Es una deficiencia de los conos de longitud de onda corta (S) en el ojo humano, lo que hace que se perciban menos los tonos de color azul y se confundan con tonos de color verde o amarillo. Las personas con tritanopía suelen tener dificultades para distinguir los tonos de color azul y verde, y pueden verlos como tonos de color gris o marrón.
{{< /hint >}}

## ¿Cómo las personas daltónicas ven los colores?

Antes de mostrar el filtro creado para corregir el daltonismo, queremos mostrarte cómo las personas con daltonismo aprecian los distintos colores.

Esto lo logramos mediante el siguiente código base.

{{< highlight js >}}
let img;

function preload() {
    img = loadImage('/showcase/sketches/colorBlindFilter/imagenBase.jpg');
}

function deuteranopiaFilter(img) {
    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
        // Se toma el RGB de cada pixel
        let r = img.pixels[i];
        let g = img.pixels[i + 1];
        let b = img.pixels[i + 2];

        // Cálculo de la nueva intensidad de los canales de color
        // En este caso, la matriz identidad representa la imagen original
        let newR = 1 * r + 0.0 * g + 0.0 * b;
        let newG = 0.0 * r + 1 * g + 0.0 * b;
        let newB = 0.0 * r + 0.0 * g + 1 * b;

        img.pixels[i] = newR;
        img.pixels[i + 1] = newG;
        img.pixels[i + 2] = newB;
    }

    //Se actualizan los pixeles con el nuevo RGB calculado anteriormente
    img.updatePixels();

    return img;
}

function setup() {
    createCanvas(984, 655);

    // Llamada a la función deuteranopiaFilter()
    img = deuteranopiaFilter(img);
}

function draw() {
    background(220);

    // Mostramos la imagen en nuestro sketch
    image(img, 0, 0);
}

{{< /highlight >}}

{{< hint warning >}}
**Derechos de Autor**  
Los distintos valores de la matrices para los filtros fueron tomados del siguiente [repositorio]( https://github.com/MaPePeR/jsColorblindSimulator) desarrollado por [MaPePeR]( https://github.com/MaPePeR). También tiene un simulador de daltonismo en la siguiente [página]( https://www.color-blindness.com/coblis-color-blindness-simulator/).
{{< /hint >}}

### Deuteranopía

Los valores de la matriz son.

{{< highlight js >}}
let newR = 0.80 * r + 0.2 * g + 0.0 * b;
let newG = 0.25833 * r + 0.74167 * g + 0.0 * b;
let newB = 0.0 * r + 0.14167 * g + 0.85833 * b;

{{< /highlight >}}

<div class="twentytwenty-container" >
    <img src="/showcase/sketches/colorBlindFilter/imagenBase.jpg" />
    <img src="/showcase/sketches/colorBlindFilter/imagenDeuteranopia.png" />
</div>

### Protanopía

Los valores de la matriz son.

{{< highlight js >}}
let newR = 0.56667 * r + 0.43333 * g + 0.0 * b;
let newG = 0.55833 * r + 0.44167 * g + 0.0 * b;
let newB = 0.0 * r + 0.24167 * g + 0.75833 * b;

{{< /highlight >}}

<div class="twentytwenty-container" >
    <img src="/showcase/sketches/colorBlindFilter/imagenBase.jpg" />
    <img src="/showcase/sketches/colorBlindFilter/imagenProtanopia.png" />
</div>

### Tritanopía

Los valores de la matriz son.

{{< highlight js >}}
let newR = 0.95 * r + 0.05 * g + 0.0 * b;
let newG = 0.0 * r + 0.43333 * g + 0.56667 * b;
let newB = 0.0 * r + 0.475 * g + 0.525 * b;

{{< /highlight >}}

<div class="twentytwenty-container" >
    <img src="/showcase/sketches/colorBlindFilter/imagenBase.jpg" />
    <img src="/showcase/sketches/colorBlindFilter/imagenTritanopia.png" />
</div>

## Filtro Correctivo

Para implementar dicho filtro, usamos un algoritmo sencillo que aplica un filtro de corrección de color, el cual toma una matriz de corrección de color para aplicarla a la imagen y compensar la pérdida de color. 

{{< hint info >}}
**Derechos de Autor**  
Estos valores también fueron tomados del siguiente [repositorio]( https://github.com/MaPePeR/jsColorblindSimulator) desarrollado por [MaPePeR]( https://github.com/MaPePeR).
{{< /hint >}}

{{< hint warning >}}
**Nota**  
Estos valores fueron obtenidos (según el autor) mediante prueba y error y no se pueden comparar con otros algoritmos muchos más avanzados como los Algoritmos de remapeo de color o de Aprendizaje automático. La calidad del filtro **dista** mucho de los algoritmos mencionados anteriormente.
{{< /hint >}}

El código utilizado es exactamente el mismo presentado en la sección anterior, lo único que cambia son los valores de la matriz que vamos a utilizar. A continuación, presentamos dichos valores con su gráfica comparativa.

### Deuteranopía

{{< highlight js >}}
let newR = 0.625 * r + 0.375 * g + 0.0 * b;
let newG = 0.7 * r + 0.3 * g + 0.0 * b;
let newB = 0.0 * r + 0.3 * g + 0.7 * b;

{{< /highlight >}}

<div class="twentytwenty-container" >
    <img src="/showcase/sketches/colorBlindFilter/imagenBase.jpg" />
    <img src="/showcase/sketches/colorBlindFilter/filtroDeuteranopia.png" />
</div>

### Protanopía

{{< highlight js >}}
let newR = 0.81667 * r + 0.18333 * g + 0.0 * b;
let newG = 0.33333 * r + 0.66667 * g + 0.0 * b;
let newB = 0.0 * r + 0.125 * g + 0.875 * b;

{{< /highlight >}}

<div class="twentytwenty-container" >
    <img src="/showcase/sketches/colorBlindFilter/imagenBase.jpg" />
    <img src="/showcase/sketches/colorBlindFilter/filtroProtanopia.png" />
</div>

### Tritanopía

{{< highlight js >}}
let newR = 0.96667 * r + 0.3333 * g + 0.0 * b;
let newG = 0.0 * r + 0.73333 * g + 0.26667 * b;
let newB = 0.0 * r + 0.18333 * g + 0.81667 * b;

{{< /highlight >}}

<div class="twentytwenty-container" >
    <img src="/showcase/sketches/colorBlindFilter/imagenBase.jpg" />
    <img src="/showcase/sketches/colorBlindFilter/filtroTritanopia.png" />
</div>
