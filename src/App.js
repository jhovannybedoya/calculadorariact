import React, {useState} from 'react';
import './App.css';
import Container from './containers/Container';
import Buttons from './components/Buttons';
import {btn} from './API/infoButtons.json'
import Grid from './containers/Grid';
import Screen from './components/Screen';

function App() {
  //Creación de estado para el valor entrante en pantalla.
  const [num, setNum] = useState('');
  //Estado para validación del punto.
  const [point, setPoint] = useState(true);
  const raiz = '√';

  //Muestra en pantalla los datos ingresados.
  const numScreen = (e) => {
    setNum(e.target.value)
  }

  //Función que llama el click de cada botón.
  //Finalidad: Validar el dato que ingresa para ejecutar sus respectivas funciones.
  const addValue = (e) => {
    let value = e.target.value
    if (value === '.') {
      //Validación si ya hay punto.
      if (point) {
        setPoint(!point)
        setNum(num.concat(value));
      } else {}
    } else if (value === '=') {
      calculate()
    } else if (value === '+' || value === '-' || value === '*' || value=== '/') {
      setPoint(!point)
      setNum(num.concat(value));
    } else if (value === 'C') {
      clean()
    } else if (value === 'CE') {
      retro()
    } else {
      setNum(num.concat(value));
    }
  }

  //Estados a su valor inicial.
  const clean = () => {
    setNum('');
    setPoint(true)  
  }

  //Elimina el último dígito de la cadena.
  const retro = () => {
    setNum(num.slice(0, -1))
  }

  const calculate = () => {
    try {
      //Valida si hay potencia.
      if (num.includes('²')) {
        let copy = '';
        for (let i = 0; i < num.length; i++) {
          let digit = num[i];
          if (digit == '²') {
            copy += '**2';
          } else {
            copy += digit;
          }
        }
        let result = eval(copy);
        //Convierte result a string para continuar operandolo.
        setNum(result.toString())
      } else if (num.includes('%')) {
        let copy = '';
        for (let i = 0; i < num.length; i++) {
          let digit = num[i];
          if (digit == '%') {
            copy += '/100';
          } else {
            copy += digit;
          }
        }
        let result = eval(copy);
        setNum(result.toString())
      }
      //Busca la raíz en el estado num.
      else if (num.indexOf(raiz) >= 0) {
        let copy = '';
        //Ciclo para recorrer la cadena num.
        for (let i = 0; i < num.length; i++) {
          //Valida si num en el indice i es igual a raíz.
          if (num[i] === '√') {
            let cadenaRaiz = '';
            //Ciclo para recorrer después de el indice de la raíz.
            for (let j = i + 1; j < num.length; j++) {
              //Si num[j] NO es un operador agrega los números a cadenaRaiz.
              if (num[j] !== '+' && num[j] !== '*' && num[j] !== '-' && num[j] !== '/') {
                cadenaRaiz += num[j];
              }
              //Si num[j] es un operador sale ddel ciclo y asigna el valor de j a i.
              else {
                i = j-1;
                break
              }
              //Si llegamos al final de la cadena, asignamos j a i para que no continúe el ciclo.
              if (j === num.length -1) {
                i = j
              }
            }
            //Asigna a convertNum el resultado de la raíz.
            let convertNum = Math.sqrt(parseInt(cadenaRaiz))
            //Agrega a copy el resultado convertido en string.
            copy += convertNum.toString()
          }
          //Valida si num en el indice i NO es igual a raíz.
          else {
            copy += num[i]
          }
        }
        //Evaluando copy para después mostrarla en pantalla
        let result = eval(copy);
        setNum(result.toString())
      } 
      //Si no tiene raíz, potencia o porcentaje.
      else {
        console.log(num)
        let result = eval(num);
        setNum(result.toString())
      }      
    }
    //Manejo del error.
    catch (error) {
      //Muestra en pantalla un mensaje de Error.
      setNum('Error')
      //Después de 3 segs limpia la pantalla.
      setTimeout(() => {
          clean()
      }, 3000);
    }
  }
  const teclado = (e) => {
    let event = window.e;
    console.log(event);
    //Asigna el key en una variable.
    let keyString = event.key;
    console.log(keyString);
    //Asigna el key convertido en números para la validación.
    let keyNumber = parseInt(keyString);
    console.log(keyNumber)
  }

  return (
    <div className="App">
      <Container>
        <Screen num={num} numScreen={numScreen} onchange={teclado}/>
        <Grid>
        {btn.map((boton) => (
          <Buttons className={boton.className}
                   value={boton.value}
                   key={boton.value}
                   addValue={addValue} />
        ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;