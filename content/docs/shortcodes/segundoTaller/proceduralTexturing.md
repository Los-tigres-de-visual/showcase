# Procedural Texturing

## Introducción:
A grandes rasgos se refiere al proceso de generar texturas de forma automática basándose en algoritmos y procesos matemáticos, en lugar de depender de texturas concretas. Esta técnica da ventajas como mejor rendimiento, alta resolución y flexibilidad para aplicar dichas texturas y adicionalmente permite manipular algunas características de las texturas de forma dinámica.
## Antecedentes:
### Textura
### Shader
### Texturas procedurales
### Figuras 3D

A continuación se muestra un ejemplo de figura 3D construída en P5 a partir de las figuras primitivas disponibles. Al jugar con la escala, rotación y posición de las primitivas se puede conseguir figuras nuevas. Adicionalmente podemos manejar diferentes niveles dentro de la consrtucción 3D para aplicar modificaciones a diferentes secciones de la figura, como rotar algunas partes hacia un lado y otras partes hacia otro. Usando las funciones **push()** y  **pull()** podemos cambiar el marco de referencia y trabajar a diferentes niveles para aplicar los cambios a las partes específicas que deseamos:

{{< p5-iframe sketch="/showcase/sketches/proceduralTexturing/model.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="425" height="450" >}}
{{< hint warning >}}
Notese como toda la construcción gira sobre el eje Y, mientras que el anillo mayor lo hace sobre su propio eje Z y la esfera pequeña sobre su propio eje X. Finalmente la estrella central conformada por cubos superpuestos gira en sus tres ejes simultaneamente
{{< /hint >}}
## Implementación:

Inicialmente se tiene una esfera en el centro del canvas sobre la que se a aplicado una textra creada a partir de tríangulos negros y blancos siguiendo un patrón específico. Se ilustra claramente la habilidad de modificar de forma dinámica este tipo de texturas cuando movemos de izquierda a derecha el mouse y notamos que la textura cambia en tiempo real. En este caso estamos modificando el valor del *zoom* en la textura, es decir el tamaño de las baldosas que la componen; obviamente entre más pequeñas las baldosas, mayor cantidad serán necesarias para cubrir la esfera. 
El programa permite explorar diferentes texturas presionando la tecla "s" (recuerde hacer click en el canvas para permitir la entrada de comandos por teclado). Note que cuando se aplica la nueva textura, no se está reconstruyendo la esfera, solamente se está cubriendo con una textura diferente. Las nuevas texturas están construidas con baldosas de formas y colores diferentes, y todas cambian de tamaño al mover el mouse.

{{< hint info >}}
Los shaders utilizados para generar las texturas se adaptaron del libro: [The Book of Shaders](https://thebookofshaders.com/09/)
{{< /hint >}}

Adicionalmente podemos ver cómo se cubren diferentes figuras 3D con las diferentes texturas disponibles. Presione la tecla "f" para cambiar el modelo 3D. Vemos entonces que se conserva la textura pero ahora esta se aplica sobre un cilindro, un toroide, un cubo, una "estrella" construida con una esfera y conos, y sobre la figura más compleja mostrada arriba. Puede entonces observar cualquier combinación de textura y figura disponible.

presione "s" para cambiar la textura y "f" para cambiar la figura:
{{< p5-iframe sketch="/showcase/sketches/proceduralTexturing/proceduralTexturing.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="425" height="425" >}}

{{< hint info >}}
Puede rotar la figura arrastrándola con el mouse presionado para ver los diferentes lados
{{< /hint >}}
{{< hint warning >}}
Note cómo cada textura *envuelve* cada figura de diferente manera y de forma individual. Esto se aprecia de mejor manera al mínimo de baldosas en la textura, es decir hubicando el mouse todo a la izquierda del canvas
{{< /hint >}}
## Conclusiones y trabajo futuro:
