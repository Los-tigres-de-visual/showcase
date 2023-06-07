# Juego de la Serpiente en 3D

## Introducción

En el campo de la programación de videojuegos, la creación de juegos clásicos sigue siendo una práctica común para desarrolladores y entusiastas. En este contexto, el presente código representa la implementación de un emocionante juego de la Serpiente en un entorno 3D, utilizando el framework `p5.js`.

La serpiente, representada por una línea continua en movimiento, se desliza a través de un plano tridimensional en busca de su alimento. El objetivo del juego es controlar hábilmente la dirección de la serpiente para que pueda consumir los alimentos generados aleatoriamente, lo que a su vez aumenta la longitud de la serpiente. Sin embargo, el desafío radica en evitar colisionar con los bordes del plano o chocar contra sí misma, ya que esto resultaría en el fin del juego.

La representación visual del juego se ha mejorado significativamente gracias al entorno 3D creado con `p5.js`. Mediante el uso de transformaciones y cámara, el plano de juego se despliega en una perspectiva tridimensional, ofreciendo una sensación de profundidad y realismo. Además, se han aplicado efectos de iluminación y sombreado para resaltar la serpiente y el alimento, lo que añade un aspecto visual atractivo al juego.

## Antecedentes y Trabajo Previo
A lo largo de los años, el juego de la Serpiente ha sido objeto de diversas reinterpretaciones y mejoras, tanto en términos de gráficos como de mecánicas de juego. En su forma original, el jugador controlaba una serpiente en un plano bidimensional, tratando de recolectar alimentos mientras evitaba colisionar con las paredes del entorno o con su propio cuerpo.

En el ámbito de la programación de videojuegos, el desarrollo de versiones personalizadas y adaptaciones de la Serpiente ha sido una práctica común y una manera popular de aprender conceptos de programación y lógica de juego. Los lenguajes de programación y las bibliotecas gráficas han evolucionado, brindando a los desarrolladores herramientas más potentes para crear experiencias de juego visualmente impresionantes y envolventes.

Por otro lado, hay numerosos trabajos han abordado la implementación y mejora del juego de la Serpiente, explorando diversas tecnologías y enfoques para ofrecer una experiencia única a los jugadores. Estos trabajos previos han contribuido a la evolución del juego de la Serpiente, aportando mejoras tanto en términos de experiencia visual como de interacción con el jugador. Han demostrado la versatilidad del juego y han servido como base para la implementación de nuevas versiones y adaptaciones, como la que se presenta en el código actual utilizando p5.js.

## Juego de la Serpiente
![](/showcase/sketches/gifSerpiente.gif)
{{< hint info >}}
Para ofrecer una mejor visualización del juego, se desplegó en Github una versión estática del juego, en vez de usar un iframe-p5. Para visitar y probar el juego se debe ir a la siguiente página. <a href="https://johan15111.github.io/snake3d/" target="_blank">Página del Juego</a>
{{< /hint >}}

{{< hint warning >}}
**Derechos de Autor**  
Este código fue inspirado en el video <a href="https://www.youtube.com/watch?v=OMoVcohRgZA" target="_blank">The-Coding-Train Snake-Redux Video</a>, el cual presenta una versión en 2D. Posteriormente <a href="https://github.com/Milchreis" target="_blank">Milchreis</a> realizó una adaptación en 3D del juego, la cual se tomó como base para esta presentación, esto atendiendo a la licencia **GNU General Public License v3.0**
{{< /hint >}}

1. Para jugar este juego se deben usar las flechas del teclado para manejar la serpiente. Las reglas son las mismas del juego original, si la serpiente se choca con una pared o alguna parte de ella misma pierdes. 

2. En la esquina superior izquierda hay un botón para habilitar o silenciar la música de fondo. 

3. Por último, moviendo el mouse de arriba abajo, se puede tener una vista distinta del plano de juego.

## Código y Explicación
A continuación, presentamos el código utilizado para esta implementación. En este caso, se crearon 3 archivos distintos, el archivo principal `sketches.js`, el archivo con la clase `Snake` y el archivo con la clase `Food`.
{{< details "sketch.js" close >}}
{{< highlight js >}}
let snake;
let food;
let blockSize;
let planeSize;
let angle = 0;
let font;
let fontsize = 40;
let isGameOver = false;
let message;
let textColor1, textColor2, textColor3, textColor4;
let backgroundMusic;
let eatingEffect;
let rightEffect;
let leftEffect;
let upEffect;
let downEffect;
let isAudioPlaying = false;
let iconImage;
let score = -1;

function preload() {
  font = loadFont('font/Boba.ttf'); // Carga la fuente de texto personalizada
  backgroundMusic = loadSound('music/background.mp3'); // Carga la música de fondo
  eatingEffect = loadSound('music/eating.wav'); // Carga el efecto de sonido de comer
  rightEffect = loadSound('music/right.mp3'); // Carga el efecto de sonido de moverse a la derecha
  leftEffect = loadSound('music/left.mp3'); // Carga el efecto de sonido de moverse a la izquierda
  upEffect = loadSound('music/up.mp3'); // Carga el efecto de sonido de moverse hacia arriba
  downEffect = loadSound('music/down.mp3'); // Carga el efecto de sonido de moverse hacia abajo
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Crea el lienzo de juego en 3D

  angleMode(DEGREES); // Cambia el modo de ángulo a grados

  backgroundMusic.stop(); // Detiene la reproducción de la música de fondo

  textColor1 = color(255, 0, 0); // Define el color de texto 1 (rojo)
  textColor2 = color(0, 0, 255); // Define el color de texto 2 (azul)
  textColor3 = color(0, 0, 0); // Define el color de texto 3 (negro)
  textColor4 = color(245, 130, 27) // Define el color de texto 4 (naranja)

  blockSize = windowWidth * 0.04; // Calcula el tamaño de los bloques del juego en función del ancho de la ventana
  planeSize = {
    width: windowWidth,
    height: windowHeight
  };

  restartGame(); // Reinicia el juego y establece los valores iniciales

  setAttributes('antialias', true); // Activa el antialiasing para mejorar la calidad visual

  textFont(font); // Establece la fuente de texto
  textSize(fontsize); // Establece el tamaño de fuente
  textAlign(CENTER, CENTER); // Establece la alineación del texto en el centro

  let hammer = new Hammer(document.body, {
    preventDefault: false
  });

  hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
  });

  hammer.on("swipe", keyPressed); // Asigna la función keyPressed al evento de deslizamiento (swipe) del Hammer

  let audioButton = createButton(''); // Crea un botón de audio vacío
  audioButton.position(20, 20); // Establece la posición del botón en la ventana

  iconImage = createImg('music/HabilitarAudio.png'); // Crea una imagen para el ícono del botón de audio
  iconImage.size(24, 24); // Establece el tamaño de la imagen
  audioButton.elt.appendChild(iconImage.elt); // Agrega la imagen al botón

  audioButton.mousePressed(toggleAudio); // Asigna la función toggleAudio al evento de clic del botón
}

function restartGame() {
  isGameOver = false; // Reinicia el estado del juego a "no terminado"
  score = -1; // Reinicia el puntaje a -1

  snake = new Snake(windowWidth / 2, windowHeight / 2, blockSize); // Crea una nueva serpiente en el centro de la ventana
  food = createFood(); // Crea una nueva comida en una posición aleatoria
}

function draw() {
  background(138, 223, 253 ); // Establece el color de fondo del lienzo

  translate(-windowWidth / 2, -windowHeight / 2, 0); // Translada el origen al centro de la ventana

  let angle = map(mouseY, 0, height, 0, max(windowWidth, windowHeight) * 0.7); // Calcula el ángulo de la cámara en función de la posición vertical del mouse
  camera(
    0,
    angle,
    min(windowWidth, windowHeight) * 0.8,
    0, 0, 0, 0, 1, 0); // Establece la posición y orientación de la cámara

  pointLight(250, 250, 250, 0, 1000, 0); // Agrega una fuente de luz puntual al escenario

  // Dibuja el plano del juego
  push()
  fill(190, 253, 138)
  translate(windowWidth / 2, windowHeight / 2, 0);
  plane(planeSize.width, planeSize.height);
  pop();

  fill(textColor4); // Establece el color de relleno para el texto

  translate(0, 0, 80); // Translada el texto en el eje Z para que esté en frente del plano del juego

  text(`Puntaje: ${score}`, width / 2, height - 600); // Muestra el puntaje en la parte superior de la ventana

  snake.update(); // Actualiza la posición de la serpiente
  food.update(); // Actualiza la posición de la comida

  if (snake.isEating(food)) {
    snake.grow(); // Hace crecer a la serpiente cuando come la comida
    food = createFood(); // Crea una nueva comida
  }

  snake.render(); // Dibuja la serpiente en el lienzo
  food.render(); // Dibuja la comida en el lienzo

  checkGameOver(); // Verifica si el juego ha terminado
}

function keyPressed(event) {
  console.log(event)
  if (keyCode === LEFT_ARROW || (event && event.direction == 2)) {
    snake.moveLeft(); // Mueve la serpiente hacia la izquierda
    leftEffect.play(); // Reproduce el efecto de sonido de moverse a la izquierda
  } else if (keyCode === RIGHT_ARROW || (event && event.direction == 4)) {
    snake.moveRight(); // Mueve la serpiente hacia la derecha
    rightEffect.play(); // Reproduce el efecto de sonido de moverse a la derecha
  } else if (keyCode === UP_ARROW || (event && event.direction == 8)) {
    snake.moveUp(); // Mueve la serpiente hacia arriba
    upEffect.play(); // Reproduce el efecto de sonido de moverse hacia arriba
  } else if (keyCode === DOWN_ARROW || (event && event.direction == 16)) {
    snake.moveDown(); // Mueve la serpiente hacia abajo
    downEffect.play(); // Reproduce el efecto de sonido de moverse hacia abajo
  }
}

function createFood() {
  let newFood = new Food(
    random(planeSize.width * 0.2, planeSize.width * 0.8),
    random(planeSize.height * 0.2, planeSize.height * 0.8),
    blockSize); // Crea una nueva comida en una posición aleatoria dentro del plano del juego

  eatingEffect.play(); // Reproduce el efecto de sonido de comer

  // Ajusta la posición de la comida a la cuadrícula
  newFood.x = round(newFood.x / (blockSize + snake.spacing)) * (blockSize + snake.spacing);
  newFood.y = round(newFood.y / (blockSize + snake.spacing)) * (blockSize + snake.spacing);

  score++; // Aumenta el puntaje en 1

  if (snake.isInBody(newFood.x, newFood.y, newFood.size)){
    return createFood(); // Si la comida está dentro del cuerpo de la serpiente, vuelve a crear la comida en una nueva posición
  }
  else
    return newFood;
}

function checkGameOver() {
  let head = snake.getHead(); // Obtiene la posición de la cabeza de la serpiente

  // Verifica si la cabeza de la serpiente está fuera del plano del juego o choca con su propio cuerpo
  if (head.x <= 0 + blockSize || head.x >= planeSize.width - blockSize
    || head.y <= 0 + blockSize || head.y >= planeSize.height - blockSize / 2
    || snake.isInBody(head.x, head.y, snake.size)) {

    isGameOver = true; // Establece el estado del juego a "terminado"
    snake.stop(); // Detiene el movimiento de la serpiente
    backgroundMusic.stop(); // Detiene la reproducción de la música de fondo

    fill(10); // Establece el color de relleno en negro
    push();
    translate(0, 0, 80);
    fill(textColor1); // Establece el color de texto 1 (rojo)
    text(`Fin del Juego :(`, width / 2, height / 2); // Muestra un mensaje de "Fin del Juego"
    fill(textColor2); // Establece el color de texto 2 (azul)
    text(`Tu Puntaje: ${score} manzanas`, width / 2, height / 2 + 60); // Muestra el puntaje obtenido
    fill(textColor3); // Establece el color de texto 3 (negro)
    text(`Da clic para reiniciar el juego`, width / 2, height / 2 + 120); // Muestra un mensaje para reiniciar el juego
    pop();
  }
}

function mousePressed() {
  if (isGameOver) {
    backgroundMusic.stop(); // Detiene la reproducción de la música de fondo
    isAudioPlaying = false; // Establece el estado de reproducción de audio a "no reproduciendo"
    iconImage.attribute('src', 'music/HabilitarAudio.png'); // Cambia la imagen del ícono del botón de audio
    restartGame(); // Reinicia el juego
  }
}

function toggleAudio() {
  if (isAudioPlaying) {
    backgroundMusic.stop(); // Detiene la reproducción de la música de fondo
    isAudioPlaying = false; // Establece el estado de reproducción de audio a "no reproduciendo"
    iconImage.attribute('src', 'music/HabilitarAudio.png'); // Cambia la imagen del ícono del botón de audio
  } else {
    backgroundMusic.loop(); // Reproduce la música de fondo en bucle
    isAudioPlaying = true; // Establece el estado de reproducción de audio a "reproduciendo"
    iconImage.attribute('src', 'music/SilenciarAudio.png'); // Cambia la imagen del ícono del botón de audio
  }
}

{{< /highlight >}}
{{< /details >}}

{{< details "Snake.js" close >}}
{{< highlight js >}}
class Snake {
    constructor(x, y, size) {
        this.body = []; // Cuerpo de la serpiente
        this.size = size || 10; // Tamaño de cada segmento de la serpiente
        this.spacing = 3; // Espacio entre cada segmento de la serpiente
        this.xdir = 0; // Dirección horizontal de movimiento (-1: izquierda, 0: sin movimiento, 1: derecha)
        this.ydir = 0; // Dirección vertical de movimiento (-1: arriba, 0: sin movimiento, 1: abajo)
        this.slowness = 13; // Velocidad de movimiento de la serpiente (número mayor = más lenta)
        this.allowMoving = true; // Indicador de si se permite el movimiento de la serpiente

        // Ajustar a la cuadrícula
        x = round(x / (this.size + this.spacing)) * (this.size + this.spacing);
        y = round(y / (this.size + this.spacing)) * (this.size + this.spacing);

        this.body.push(createVector(x, y, 0)); // Agregar la cabeza de la serpiente al cuerpo
    }

    moveLeft() {
        this.xdir = -1; // Cambiar la dirección de movimiento hacia la izquierda
        this.ydir = 0;
    }

    moveRight() {
        this.xdir = 1; // Cambiar la dirección de movimiento hacia la derecha
        this.ydir = 0;
    }

    moveUp() {
        this.ydir = -1; // Cambiar la dirección de movimiento hacia arriba
        this.xdir = 0;
    }

    moveDown() {
        this.ydir = 1; // Cambiar la dirección de movimiento hacia abajo
        this.xdir = 0;
    }

    length() {
        return this.body.length; // Devuelve la longitud actual del cuerpo de la serpiente
    }

    grow() {
        let head = this.getHead(); // Obtener la posición de la cabeza de la serpiente
        // Agregar un nuevo segmento al cuerpo de la serpiente en la dirección actual de movimiento
        this.body.push(
            createVector(
                head.x + (this.size * this.xdir) + (this.spacing * this.xdir),
                head.y + (this.size * this.ydir) + (this.spacing * this.ydir),
                0
            )
        );

        this.slowness = constrain(this.slowness - 0.5, 1, this.slowness); // Reducir la velocidad de la serpiente (hacerla más rápida)
    }

    isEating(food) {
        let dist = this.getDistance(this.getHead(), food.x, food.y, food.size); // Calcular la distancia entre la cabeza de la serpiente y la comida
        return dist <= this.size * 0.5; // Devolver verdadero si la distancia es menor o igual a la mitad del tamaño de la serpiente
    }

    isInBody(x, y, size) {
        for (let i = 0; i < this.body.length - 2; i++) {
            let dist = this.getDistance(this.body[i], x, y, size); // Calcular la distancia entre un segmento del cuerpo de la serpiente y una posición dada
            if (dist <= this.size * 0.5) {
                return true; // Devolver verdadero si la distancia es menor o igual a la mitad del tamaño de la serpiente
            }
        }
        return false; // Devolver falso si no se encuentra ninguna coincidencia
    }

    move() {
        let head = this.getHead(); // Obtener la posición de la cabeza de la serpiente
        // Agregar un nuevo segmento al cuerpo de la serpiente en la dirección actual de movimiento
        this.body.push(
            createVector(
                head.x + (this.size * this.xdir) + (this.spacing * this.xdir),
                head.y + (this.size * this.ydir) + (this.spacing * this.ydir),
                0
            )
        );
        this.body.shift(); // Eliminar el segmento más antiguo del cuerpo de la serpiente
    }

    getHead() {
        return this.body[this.body.length - 1]; // Devolver la posición de la cabeza de la serpiente
    }

    getTail() {
        return this.body[0]; // Devolver la posición de la cola de la serpiente
    }

    getDistance(element, x, y, size) {
        // Calcular la distancia entre un punto dado y un elemento (segmento de la serpiente o comida)
        return (
            abs((element.x + this.size) / 2 - (x + size) / 2) +
            abs((element.y + this.size) / 2 - (y + size) / 2)
        );
    }

    stop() {
        this.allowMoving = false; // Detener el movimiento de la serpiente
    }

    update() {
        // Actualizar el movimiento de la serpiente (llamar a esta función en cada fotograma)
        if (this.allowMoving && frameCount % floor(this.slowness) == 0) {
            this.move();
        }
    }

    render() {
        noStroke(); // Sin bordes
        ambientLight(100); // Luz ambiental

        // Renderizar la cabeza de la serpiente en color rojo
        let head = this.getHead();
        push();
        translate(head.x, head.y, this.size / 2);
        ambientMaterial(253, 86, 106); // Material en color rojo
        box(this.size);
        pop();

        // Renderizar el resto del cuerpo de la serpiente en color negro
        ambientMaterial(0); // Material en color negro
        for (let i = 0; i < this.body.length - 1; i++) {
            let bodyPart = this.body[i];
            push();
            translate(bodyPart.x, bodyPart.y, this.size / 2);
            box(this.size);
            pop();
        }
    }
}

{{< /highlight >}}
{{< /details >}}

{{< details "Food.js" close >}}
{{< highlight js >}}
class Food {
    constructor(x, y, size) {
        this.x = x; // Coordenada x de la posición de la comida
        this.y = y; // Coordenada y de la posición de la comida
        this.size = size || 10; // Tamaño de la comida (valor predeterminado: 10)
        this.color = color(0, 128, 255); // Color de la comida (azul)
    }

    update() {
        // Actualización de la comida (no realiza ninguna acción en este caso)
    }

    render() {
        noStroke(); // Sin bordes
        ambientLight(100); // Luz ambiental
        ambientMaterial(this.color); // Material con el color de la comida

        push();
        translate(this.x, this.y, this.size / 2);
        box(this.size); // Renderizar un cubo con el tamaño de la comida
        pop();
    }
}

{{< /highlight >}}
{{< /details >}}

### Archivo Sketch.js
El archivo `sketch.js` contiene el código principal del juego de la serpiente en 3D implementado con la biblioteca `p5.js`.

En la parte superior del archivo, se declaran las variables y objetos necesarios para el juego, como la serpiente (snake), la comida (food), el tamaño de los bloques (blockSize), etc. También se cargan los archivos de música y efectos de sonido mediante la función preload().

La función `setup()` se encarga de configurar el lienzo y otras configuraciones iniciales. Aquí se crea el lienzo de juego en 3D, se establece el modo de ángulo en grados, se cargan las fuentes y se establece el tamaño y la alineación del texto. También se configura un gesto de deslizamiento (swipe) utilizando la biblioteca Hammer.js para permitir el control táctil del juego en dispositivos móviles. Además, se crea un botón de audio para habilitar/desactivar el sonido del juego.

La función `restartGame()` reinicia el juego, restableciendo las variables y objetos del juego a sus valores iniciales.

La función `draw()` dibuja el fondo, establece la cámara y la iluminación, dibuja el plano, muestra el puntaje, actualiza y renderiza la serpiente y la comida, y verifica si el juego ha terminado.

La función `keyPressed()` se activa cuando se presiona una tecla o se realiza un gesto de deslizamiento. Dependiendo de la tecla presionada o el gesto realizado, se mueve la serpiente en la dirección correspondiente y se reproduce el efecto de sonido correspondiente.

La función `createFood()` se encarga de crear un nuevo objeto de comida en una posición aleatoria dentro del plano de juego. Se asegura de que la comida no esté generada dentro del cuerpo de la serpiente y la ajusta a una cuadrícula para que se alinee correctamente.

La función `checkGameOver()` verifica si el juego ha terminado. Comprueba si la cabeza de la serpiente ha chocado contra los límites del plano de juego o su propio cuerpo. Si el juego ha terminado, se detiene la serpiente, se detiene la música de fondo y se muestra un mensaje de fin de juego en la pantalla.

La función `mousePressed()` se activa cuando se hace clic en la pantalla. Si el juego ha terminado, reinicia el juego cuando se hace clic en la pantalla.

La función `toggleAudio()` se activa cuando se hace clic en el botón de audio. Controla la reproducción y pausa de la música de fondo y actualiza la imagen del botón de audio.

### Archivo Snake.js
Contiene la definición de la clase Snake. Esta clase representa la serpiente en el juego y tiene varias propiedades y métodos para controlar su comportamiento.

Estas propiedades incluyen el cuerpo de la serpiente, el tamaño de cada segmento del cuerpo, el espaciado entre los segmentos, la dirección de movimiento, la lentitud de movimiento y una bandera para permitir o detener el movimiento.

Los métodos y funciones permiten mover la serpiente en diferentes direcciones (izquierda, derecha, arriba y abajo), obtener la longitud de la serpiente, hacer que la serpiente crezca, verificar si la serpiente ha comido, y verificar si la serpiente ha colisionado consigo misma. También hay métodos para detener el movimiento de la serpiente, actualizar su posición en función de la dirección y renderizarla en el lienzo del juego.

En el método `render()`, la serpiente se representa visualmente en el lienzo del juego. La cabeza de la serpiente se dibuja en color rojo, mientras que el resto del cuerpo se dibuja en color negro. Se utilizan primitivas 3D como `box()` para dibujar los segmentos del cuerpo de la serpiente.

### Archivo Food.js
Contiene la definición de la clase Food, que representa la comida en el juego de la serpiente en 3D. Esta clase tiene propiedades como la posición (coordenadas x e y) y el tamaño de la comida.

La clase Food tiene métodos para actualizar y renderizar la comida en el lienzo del juego. En el método `render()`, la comida se dibuja como un cubo en el lienzo.

## Conclusiones
La implementación del juego de la serpiente en 3D ha proporcionado varias observaciones importantes sobre el uso de gráficos tridimensionales y su aplicabilidad en juegos y aplicaciones interactivas. A continuación, se presentan las conclusiones obtenidas:

1. La perspectiva 3D permite un mejor uso del espacio en pantalla. Al tener una vista en 3D, los objetos pueden ser posicionados y visualizados en diferentes planos y distancias, lo que agrega más desafío y estrategia al juego de la serpiente. Además, facilita la detección de colisiones y la interacción con los elementos del juego.

2. La implementación de gráficos 3D puede requerir un nivel de conocimiento y experiencia adicional en comparación con gráficos 2D. La manipulación de coordenadas tridimensionales, el cálculo de perspectivas y la representación adecuada de los objetos pueden ser más complejos.

3. La biblioteca `p5.js` proporciona una abstracción y una interfaz sencilla para trabajar con gráficos 3D. A través de sus funciones y métodos, se facilita la creación y manipulación de objetos en un espacio tridimensional. Esto permite a los desarrolladores aprovechar las ventajas del 3D sin la necesidad de conocer detalles técnicos complejos.

## Trabajo Futuro
A pesar de la implementación exitosa del juego de la serpiente en 3D, existen diversas áreas que podrían explorarse en trabajos futuros para mejorar y expandir aún más la experiencia del juego. A continuación, se presentan algunas posibles direcciones para futuras investigaciones y mejoras:

1. **Mejoras en la jugabilidad:** Se pueden implementar nuevas mecánicas de juego para aumentar el desafío y la diversión. Esto podría incluir elementos como obstáculos en movimiento, power-ups, niveles de dificultad ajustables, modos de juego adicionales, entre otros.

2. **Diseño de niveles y escenarios:** Actualmente, el juego de la serpiente se desarrolla en un plano bidimensional. Una dirección interesante para el trabajo futuro sería la creación de niveles y escenarios en entornos tridimensionales.

3. **Mejoras visuales y gráficas:** Aunque el juego de la serpiente en 3D ya cuenta con una representación visual atractiva, se podrían realizar mejoras adicionales en términos de efectos visuales, modelado de objetos y animaciones.

4. **Integración de interacción con dispositivos:** Una posible área de trabajo futuro es la incorporación de interacción con dispositivos externos, como sensores de movimiento o realidad virtual. Esto permitiría a los jugadores controlar la serpiente mediante movimientos corporales o explorar el entorno tridimensional del juego de manera más inmersiva.
