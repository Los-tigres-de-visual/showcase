# Los modelos de color

Se trata de modelos usados para describir y definir colores al desintegrarlos en componentes diferentes representados usualmente por tuplas de  números. Las diferentes combinaciones de valores en dichas tuplas corresponden a colores específicos. Existen distintos modelos que trabajan sobre diferentes componentes del color y que se usan en diferentes aplicaciones. 

## RGB

Es quizá el modelo de color más conocido y se usa especialmente para representar colores en medios digitales. La tupla de este modelo está compuesta por tres valores cada uno entre 0 y 255 (o 0 y 1 después de normalizarlos) y corresponden a los tres colores primarios de la luz rojo, verde y azul (**R**ed, **G**reen, **B**lue de donde viene su nombre). El valor de cada componente se refiere a la “cantidad” o intensidad de dicho color, por lo que la combinación de diferentes intensidades de rojo, verde y azul es lo que genera todos los demás colores del espectro. La combinación de los tres colores al máximo (255, 255, 255) representa el color blanco, mientras que la ausencia total de estos (0,0,0) representa el negro.

El modelo rgb se suele representar por medio de un cubo construido a partir de un plano de tres dimensiones en el que cada eje corresponde a la intensidad de uno de los tres colores primarios. En este caso la tupla del color es las tres coordenadas en el plano que señalan un punto específico en el cubo donde se encuentra el color en cuestión.

![rgb cube](/showcases/ketches/colorModels/rgb.jpg)

## HSL
Se trata de un modelo usado principalmente en diseño gráfico y en edición de imagen. Surgió bajo la idea de representar el color separándolo en componentes que los humanos más fácilmente asocian como atributos del color. La tupla entonces tiene tres valores: matiz, saturación y luminosidad  o en inglés Hue, Saturation, Lightness (HSL). El matiz se refiere al color puro o tono que nos permite a simple vista diferenciar un color de otro. Si miramos el círculo cromático decimos que el matiz corresponde al punto del círculo en el que estamos; es por esto que su valor usualmente corresponde a los grados de un arco en un círculo ( es decir que toma valores entre 0° y 360°). Tradicionalmente 0° corresponde al rojo puro, 120° corresponde al verde puro y 240° al azul puro (desde ya podemos ver algunas ideas que relacionan al rgb con el hsl)

![color wheel](/showcases/ketches/colorModels/colorwheel.webp)

La saturación representa la intensidad o pureza del color. También se refiere como la cantidad de gris en el color y se describe usualmente como un porcentaje, siendo 0% gris y 100% el color puro. Este componente se asocia con qué tan vibrante o vívido es el color.

Finalmente tenemos la luminosidad, que a veces es más fácil de entender como brillo y se refiere a la cantidad de blanco o negro en el color ( o de otra manera que tan claro u oscuro es el color). Igual que la saturación se trata de un porcentaje, donde 0° corresponde a negro y 100° a blanco; se puede entender que cuando la luminosidad está en 50° tenemos un color medio o neutro, en cuanto a claridad se refiere.

El modelo HSL se suele representar como un cilindro, en el que la altura es la luminosidad, la distancia desde el eje al perímetro es la saturación y el matiz los grados alrededor del cilindro: 

![hsl cilinder](/showcases/ketches/colorModels/hsl.PNG)

## HSB

HSB (Hue, Saturation, Brigthness) o mejor conocido como HSV (Hue, Saturation, Value) es otro modelo de color muy similar a HSL, con la principal diferencia en el último valor de la tupla. En general H y S significan lo mismo que en el modelo anterior (aunque esto no quiere decir que sus valores sean equivalentes siempre), mientras que en HSB el último valor corresponde a la luz que brilla sobre el color; se entiende como la cantidad de luz proyectada sobre el color puro, por lo que en este modelo el 0% corresponde a negro como antes pero 100% corresponde al color puro, o al color completamente iluminado, y no al blanco. 

Por lo anterior, la representación del HSB es también un cilindro, pero con la parte superior representando los colores vistos a completa luz y no el blanco como en HSL: 

![hsb cilinder](/showcases/ketches/colorModels/hsv.PNG)

## Conversión

A pesar de que estos modelos sean diferentes y a veces no fácilmente comparables, al tratarse de modelos matemáticos, no debe sorprender que sea posible pasar de uno a otro mediante fórmulas matemáticas, y por ende obtener un mismo color de forma exacta en diferentes modelos.

Es entendible que el paso entre HSL y HSB sea corto (aunque no necesariamente intuitivo), pero la transformación de RGB a HSL o HSB quizá no es fácil de visualizar. Utilizando las representaciones que ya vimos de dichos modelos, el cubo y los cilindros, es más fácil seguir dicha transformación.

![transformation](/showcases/ketches/colorModels/Hsl-and-hsv.svg)

En la imagen podemos ver que en las esquinas del cubo de RGB se ubican los colores puros y mediante la transformación estos colores se unifican en un plano. En HSL el negro deciende mientras que el blanco sube situandose y expandiéndose en las bases del cilindro, dejado los colores puros en la sección media del cilindro. Por otro lado, en HSV los colores puros se mantienen al nivel del blanco y todos se mantienen en la parte superior del cilindro, con el blanco en el centro, y dejando el negro en la base inferior.

Aquí hay un par de videos que ilustran la transformación:

## Video

## Color Complementario, triada y análogos

En teoría del color se habla de conjuntos de colores que trabajan bien juntos y se combinan de tal forma que apelan al usuario? Algunas de estas combinaciones son los colores complementarios, la triada de un color y los colores análogos. Partimos del círculo cromático y nos situamos en un color. El color complementario de nuestro color principal será el que se encuentra completamente al otro lado del círculo, es decir a 180°. La combinación de estos dos colores debe dar como resultado el color neutro ( blanco en general?). En cambio si partiendo de nuestro color original nos desplazamos por el círculo 120° encontraremos nuestro primer color de la triada, y al movernos 120° de nuevo (240° desde el origen) encontraremos el segundo. Estos dos colores junto con el original describen un triángulo equilátero en el círculo. Finalmente, los colores análogos son aquellos continuos al color original, por lo que basta desplazarnos unos 30° en ambas direcciones del círculo para hallarlos y tener un gama más bien cercana de tonos.

Estas combinaciones de colores son muy utilizadas en diseño y se tiende a usarlas para generar gusto y equilibrio en las piezas visuales.

![color combination](/showcases/ketches/colorModels/transformation.png)
