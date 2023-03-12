# Los modelos de color

Se trata de modelos usados para describir y definir colores al desintegrarlos en componentes diferentes representados usualmente por tuplas de  números. Las diferentes combinaciones de valores en dichas tuplas corresponden a colores específicos. Existen distintos modelos que trabajan sobre diferentes componentes del color y que se usan en diferentes aplicaciones. 

## RGB

Es quizá el modelo de color más conocido y se usa especialmente para representar colores en medios digitales. La tupla de este modelo está compuesta por tres valores cada uno entre 0 y 255 (o 0 y 1 después de normalizarlos) y corresponden a los tres colores primarios de la luz rojo, verde y azul (**R**ed, **G**reen, **B**lue de donde viene su nombre). El valor de cada componente se refiere a la “cantidad” o intensidad de dicho color, por lo que la combinación de diferentes intensidades de rojo, verde y azul es lo que genera todos los demás colores del espectro. La combinación de los tres colores al máximo (255, 255, 255) representa el color blanco, mientras que la ausencia total de estos (0,0,0) representa el negro.

El modelo rgb se suele representar por medio de un cubo construido a partir de un plano de tres dimensiones en el que cada eje corresponde a la intensidad de uno de los tres colores primarios. En este caso la tupla del color es las tres coordenadas en el plano que señalan un punto específico en el cubo donde se encuentra el color en cuestión.

![rgb cube](/showcases/content/sketches/colorModels/rgb.jpg)

## HSL
Se trata de un modelo usado principalmente en diseño gráfico y en edición de imagen. Surgió bajo la idea de representar el color separándolo en componentes que los humanos más fácilmente asocian como atributos del color. La tupla entonces tiene tres valores: matiz, saturación y luminosidad  o en inglés Hue, Saturation, Lightness (HSL). El matiz se refiere al color puro o tono que nos permite a simple vista diferenciar un color de otro. Si miramos el círculo cromático decimos que el matiz corresponde al punto del círculo en el que estamos; es por esto que su valor usualmente corresponde a los grados de un arco en un círculo ( es decir que toma valores entre 0° y 360°). Tradicionalmente 0° corresponde al rojo puro, 120° corresponde al verde puro y 240° al azul puro (desde ya podemos ver algunas ideas que relacionan al rgb con el hsl)

![color wheel](/showcases/sketches/colorModels/colorwheel.webp)

La saturación representa la intensidad o pureza del color. También se refiere como la cantidad de gris en el color y se describe usualmente como un porcentaje, siendo 0% gris y 100% el color puro. Este componente se asocia con qué tan vibrante o vívido es el color.

Finalmente tenemos la luminosidad, que a veces es más fácil de entender como brillo y se refiere a la cantidad de blanco o negro en el color ( o de otra manera que tan claro u oscuro es el color). Igual que la saturación se trata de un porcentaje, donde 0° corresponde a negro y 100° a blanco; se puede entender que cuando la luminosidad está en 50° tenemos un color medio o neutro, en cuanto a claridad se refiere.

El modelo HSL se suele representar como un cilindro, en el que la altura es la luminosidad, la distancia desde el eje al perímetro es la saturación y el matiz los grados alrededor del cilindro: 

![hsl cilinder](/showcases/sketches/colorModels/hsl.PNG)

## HSB

HSB (Hue, Saturation, Brigthness) o mejor conocido como HSV (Hue, Saturation, Value) es otro modelo de color muy similar a HSL, con la principal diferencia en el último valor de la tupla. En general H y S significan lo mismo que en el modelo anterior (aunque esto no quiere decir que sus valores sean equivalentes siempre), mientras que en HSB el último valor corresponde a la luz que brilla sobre el color; se entiende como la cantidad de luz proyectada sobre el color puro, por lo que en este modelo el 0% corresponde a negro como antes pero 100% corresponde al color puro, o al color completamente iluminado, y no al blanco. 

Por lo anterior, la representación del HSB es también un cilindro, pero con la parte superior representando los colores vistos a completa luz y no el blanco como en HSL: 

![hsb cilinder](/showcases/sketches/colorModels/hsv.PNG)

## Conversión

A pesar de que estos modelos sean diferentes y a veces no fácilmente comparables, al tratarse de modelos matemáticos, no debe sorprender que sea posible pasar de uno a otro mediante fórmulas matemáticas, y por ende obtener un mismo color de forma exacta en diferentes modelos.

Es entendible que el paso entre HSL y HSB sea corto (aunque no necesariamente intuitivo), pero la transformación de RGB a HSL o HSB quizá no es fácil de visualizar. Utilizando las representaciones que ya vimos de dichos modelos, el cubo y los cilindros, es más fácil seguir dicha transformación.

![transformation](/showcases/sketches/colorModels/Hsl-and-hsv.svg)

En la imagen podemos ver que en las esquinas del cubo de RGB se ubican los colores puros y mediante la transformación estos colores se unifican en un plano. En HSL el negro deciende mientras que el blanco sube situandose y expandiéndose en las bases del cilindro, dejado los colores puros en la sección media del cilindro. Por otro lado, en HSV los colores puros se mantienen al nivel del blanco y todos se mantienen en la parte superior del cilindro, con el blanco en el centro, y dejando el negro en la base inferior.

Aquí hay un par de videos que ilustran la transformación:

## Video

## Color Complementario, triada y análogos

En teoría del color se habla de conjuntos de colores que trabajan bien juntos y se combinan de tal forma que apelan al usuario? Algunas de estas combinaciones son los colores complementarios, la triada de un color y los colores análogos. Partimos del círculo cromático y nos situamos en un color. El color complementario de nuestro color principal será el que se encuentra completamente al otro lado del círculo, es decir a 180°. La combinación de estos dos colores debe dar como resultado el color neutro ( blanco en general?). En cambio si partiendo de nuestro color original nos desplazamos por el círculo 120° encontraremos nuestro primer color de la triada, y al movernos 120° de nuevo (240° desde el origen) encontraremos el segundo. Estos dos colores junto con el original describen un triángulo equilátero en el círculo. Finalmente, los colores análogos son aquellos continuos al color original, por lo que basta desplazarnos unos 30° en ambas direcciones del círculo para hallarlos y tener un gama más bien cercana de tonos.

Estas combinaciones de colores son muy utilizadas en diseño y se tiende a usarlas para generar gusto y equilibrio en las piezas visuales.

![color combination](/showcases/sketches/colorModels/transformation.png)



En el siguiente ejercicio representamos los conceptos e ideas anteriormente de forma que partimos de un color *principal* en el modelo **rgb** que puede ser construido modificando sus tres componentes (r, g ,b) por medio de deslizadores. El color se actualiza en tiempo real. En cualquier momento podemos seleccionar una de las opciones en la parte superior para cambiar el modelo de color, lo que ocasionará que a partir de los valores del modelo actual se realicen cálculos matemáticos para encontrar los valores de los componentes del nuevo modelo que producen el mismo color. El cambio se refleja en los deslizadores, que ahora describirán los componentes del nuevo modelo y que tomarán los valores que corresponden al color seleccionado.
El programa permite cambiar entre RGB, HSL y HSB en cualquier orden para explorar las equivalencias entre ellos.

{{< hint warning >}}
notese que al cambiar de modelo, el color principal no cambia, pues se calcula exactamente el mismo color en el nuevo modelo
{{< /hint >}}
Estando en un modelo diferente también se puede interactuar con los deslizadores para cambiar el color y explorar cómo funcionan los componentes de dicho modelo.

{{< hint warning >}}
use esta opción para evidenciar las diferencias entre los modelos, en especial entre HSL y HSB
{{< /hint >}}

Aquí se muestran algunos de los procesos matemáticos utilizados para calcular las equivalencias entre modelos:

### RGB a HSL
{{< highlight js >}}
function rgbToHSL(rgba){
  let min=1
  let max=0
  
  //cálculo min max
  for (var c=0;c<rgba.length;c++){
    if (rgba[c] > max){
      max=rgba[c]
    }
    if (rgba[c] < min){
      min=rgba[c]
    }
  }
  
  //h
  if (min==max){
    h=0
  }
  else if(max==rgba[0]){
    h=60*(((((rgba[1]-rgba[2])/(max-min))%6)+6)%6)}
  else if(max==rgba[1]){
    h=60*(((rgba[2]-rgba[0])/(max-min))+2)}
  else if(max==rgba[2]){
    h=60*(((rgba[0]-rgba[1])/(max-min))+4)}

  //l
  l=(max+min)/2
  
  //s
  if (min==max){
    s=0
  }
  else if (l<=1/2){
    s=(max-min)/(2*l)
  }
  else if (l>1/2){
    s=(max-min)/(2-2*l)
  }

  //redondeo 
  let hsl=[Math.round(h * 100) / 100,Math.round(s * 100) / 100,Math.round(l * 100) / 100]
  return hsl
}
{{< /highlight >}}

### HSL a HSB
{{< highlight js >}}
function HSLToHSB(hslarray){
  //h
  H=hslarray[0]
  
  //b
  B=hslarray[2]+hslarray[1]*Math.min(hslarray[2],1-hslarray[2])
  
  //s
  if (B==0){
    S=0
  } else{
    S=2*(1-hslarray[2]/B)
  }
  
  //redondeo
  let hsb=[Math.round(H * 100) / 100,Math.round(S * 100) / 100,Math.round(B * 100) / 100]
  return hsb
}
{{< /highlight >}}

### HSB to RGB
{{< highlight js >}}
function HSBTorgb(hsbarray){
  
  //variables intermedias
  let C=hsbarray[1]*hsbarray[2]
  let X=C*(1-Math.abs(((((hsbarray[0]/60)%2)+2)%2)-1))
  let m=hsbarray[2]-C
  
  let r_
  let g_
  let b_
  
  //cálculo r' g' b'
  if (hsbarray[0]<60){
    r_=C
    g_=X
    b_=0  
  } else if(60<= hsbarray[0] && hsbarray[0]<120){
    r_=X
    g_=C
    b_=0 
  } else if(120<= hsbarray[0] && hsbarray[0]<180){
    r_=0
    g_=C
    b_=X 
  }else if(180<= hsbarray[0] && hsbarray[0]<240){
    r_=0
    g_=X
    b_=C 
  }else if(240<= hsbarray[0] && hsbarray[0]<300){
    r_=X
    g_=0
    b_=C 
  }else if(300<= hsbarray[0] && hsbarray[0]<360){
    r_=C
    g_=0
    b_=X 
  }
  
  //cálculo y redondo de r g b
  let rgbarray=[Math.round((r_+m)*100)/100,Math.round((g_+m)*100)/100,Math.round((b_+m)*100)/100]
  
  return rgbarray
}
{{< /highlight >}}

Como se puede observar, el programa además muestra el color complementario, la triada y los análogos del color principal todo el tiempo, y estos también se calculan y actualizan en tiempo real a medida que jugamos con el color principal.

### complementario

Dentro de la investigación se encontraron dos formas de calcular el color complementario por un lado en rgb y por otro en HSL/HSB.

El primero corresponde a restar de 255 (blanco) el valor de cada componente del color principal para hallar los valores del complemento. La teoría es que para que dos colores sean complementarios, la suma de ambos debe ser el color blanco.

//código 

La segunda forma consiste en desplazarnos 180° en el círculo cromático para encontrar el color físicamente opuesto al principal, por lo que en HSL/HSB basta con sumar 180° al valor del matiz.

//código

{{< hint warning >}}
En este programa se usaron ambas técnicas, por lo que en cada modelo se utiliza el método correspondiente. Nótese que estos no son 100% equivalentes pues al cambiar entre rgb y cualquiera de los otros dos modelos podemos ver cambios en el color complementario, siendo la diferencia más o menos drástica dependiendo del color.
{{< /hint >}}

### análogos

Para el cálculo de análogos nos basamos en el círculo cromático y nos desplazamos 30° a lado y lado del color principal para hallarlos. En HSL/HSB esto se hace sobre el valor del matiz.

//código

{{< hint warning >}}
nótese la similitud de los análogos y el color principal por su cercanía en el circulo cromático
{{< /hint >}}

### triada de color

Finalmente encontramos la triada de color seleccionando los dos colores que sean equidistantes entre sí y con el color principal sobre el círculo cromático. Puesto que el círculo tiene 360°, basta con aumentar el matiz en pasos de 120° para hallarlos.

//código

{{< hint warning >}}
nótese las diferencias más drásticas entre la triada y los análogos.
{{< /hint >}}