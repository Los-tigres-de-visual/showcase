***
# **Depth Perception**

<div style="text-align: justify;">
Depth Perception o percepción de profundidad permite ver el mundo en tres dimensiones, además de medir de forma precisa la distancia de un objeto. Se basa principalmente en la visión binocular, pero tambiém utiliza recursos monoculares para lograr una percepción integrada final.
</div>
<br>

{{< details "Percepción" close >}}
<div style="text-align: center;">

## *¿Cómo se percibe la profundidad?*
</div>
<div style="text-align: justify;">
Para percibir la distancia y determinar la profundidad, los ojos utilizan tres métodos:

1. **Tamaño del objeto:** El cerebro por medio de la experiencia permite conocer el tamaño previo de los objetos, permitiendo así calcular la distancia.

2. **Movimiento de paralaje o Parallax:** Los objetos cercanos se mueven de manera más rápida que los objetos del fondo. Ésto ayuda al cerebro a calcular la distancia.

3. **Visión estereoscópica:** Cada ojo recibe una imagen distinta debido a la distancia que existe entre ellos, sin embargo, el cerebro se encarga de integrar dichas imágenes captando relieve y profundidad.
</div>
{{< /details >}}

<br>
<div style="text-align: justify;">
En esta sección se creará una escena que dará la ilusión de profundidad cercana a 3D, usando un efecto de Parallax.
</div>
<br>

{{< details "Paralaje" close >}}
<div style="text-align: center;">

## *Parallax*
</div>
<div style="text-align: justify;">
Ésta técnica se basa en una iliusion óptica en la que, cuanto más lejos están los elementos, más pequeños se ven, dando como resultado la sensación de que los objetos más distantes se mueven más lentamente que los que están más cerca. 

Se realiza a través de animación y desplazamiento en paralelo, permitiendo al usuario la interacción.

</div>
{{< /details >}}

{{< hint info >}}
<div style="text-align: center;">

## *Desarrollo*
</div>
{{< /hint  >}}

{{< details "Cámara" close >}}
<div style="text-align: center;">

### *Uso de WEBGL*
</div>

<div style="text-align: justify;">
Para crear este efecto se desarrollará una aplicación simple en <code>P5 JS</code>, aprovechando el estándar web denominado WEBGL, que permite activar el motor 3D, pasando de solo tener la posición horizontal y la vertical, a la de profundidad, la cuál apunta por defecto a la cámara. Sin embargo, en WEBGL, no existe ningún tipo de cámara que se pueda mover y rotar, por lo que se hace necesario encontrar la manera de <span style="font-style: italic;"><u>"fingir"</u></span> esos movimientos. Así pues, la cámara es un objeto virtual que, en lugar de representar un objeto físico en el mundo virtual, representa la posición y la dirección de visión de un espectador.
</div>
{{< /details >}}
<br>
<div style="text-align: justify;">
Para activar la cámara en <code>P5 JS</code>, dentro de la función setup se crea el canvas de la siguiente manera:

```tpl
function setup() {
  createCanvas(900, 600, WEBGL);
}
```

Y para poder utilizar la cámara, dentro de la función draw se utiliza la siguiente sintáxis:

```tpl
camera([x], [y], [z], [centerX], [centerY], [centerZ], [upX], [upY], [upZ]);
```

En dónde:

> * x {{< katex >}} \rightarrow {{< /katex >}} Número: valor de la posición de la cámara en el eje x 
> * y {{< katex >}} \rightarrow {{< /katex >}} Número: valor de la posición de la cámara en el eje y
> * z {{< katex >}} \rightarrow {{< /katex >}} Número: valor de la posición de la cámara en el eje z
> * centerX {{< katex >}} \rightarrow {{< /katex >}} Número: (Opcional) coordenada x que representa el centro del croquis
> * centerY {{< katex >}} \rightarrow {{< /katex >}} Número: (Opcional) coordenada y que representa el centro del croquis
> * centerZ {{< katex >}} \rightarrow {{< /katex >}} Número: (Opcional) coordenada z que representa el centro del croquis
> * upX {{< katex >}} \rightarrow {{< /katex >}} Número: (Opcional) componente x de la dirección 'hacia arriba' desde la cámara
> * upY {{< katex >}} \rightarrow {{< /katex >}} Número: (Opcional) componente y de la dirección 'hacia arriba' desde la cámara
> * upZ {{< katex >}} \rightarrow {{< /katex >}} Número: (Opcional) componente z de la dirección 'hacia arriba' desde la cámara
</div>
<br>
{{< details "Blur" close >}}
<div style="text-align: center;">

### *Efecto Blur*
</div>
<div style="text-align: justify;">
El efecto de difuminar o blur se suele utilizar para controlar la profundidad del campo de visión y dirigir al usuario hacia lo que importa en una imagen.
</div>
{{< /details >}}
<br>
<div style="text-align: justify;">
Para poder usarlo es necesario crear una función preload en donde se cargarán previamente las imágenes:

```tpl
function preload(){
  img = loadImage('assets/nombre_imagen.jpg');
}
```

Luego, en la función setup se activa el filtro:

```tpl
img.filter(BLUR, 10);
```

</div>
<br>
{{< details "Particles" close >}}
<div style="text-align: center;">

### *Sistema de partículas*
</div>
<div style="text-align: justify;">
Se hará necesario animar una gran cantidad de objetos que por medio de un algoritmo simple, simulará la profundidad de dichos objetos. Con este sistema se podrá crear, mover, cambiar y eliminar las partículas durante un tiempo determinado. 

Para este caso se creará una clase en <code>P5 JS</code>, que actuará como una plantilla, definiendo las características y conportamientos de una entidad.
</div>
{{< /details >}}
<div style="text-align: center;">
<video src="/showcase/sketches/depthPerception/Particles.mp4" controls style="max-width: 500px;" autoplay>
</video>
</div>

{{< details "Movement" close >}}
<div style="text-align: center;">

### *Movimiento*
</div>
<div style="text-align: justify;">
Además de ayudar a mantener el contacto visual, el movimiento sirve para generar interactividad y sensación de profundidad en una simple imagen 2D. 
</div>
{{< /details >}}
<div style="text-align: center;">
<img src="/showcase/sketches/depthPerception/Movement.gif" style="width:300px">
</div>


{{< details "Alpha" close >}}
<div style="text-align: center;">

### *Alpha*
</div>
<div style="text-align: justify;">
El valor alpha indica el nivel de transparencia de un píxel. Su uso en esta sección revelará la importancia de la manera de percepción de los colores y su papel en la captación de la profundidad.
</div>
{{< /details >}}
<div style="text-align: center;">
<img src="/showcase/sketches/depthPerception/Transparency.jpg" style="width:400px">
</div>

{{< p5-iframe ver="1.5.0" sketch="/showcase/sketches/Depth/sketch.js" lib1="/showcase/sketches/Depth/fish_particles.js"  width="925" height="625" >}}