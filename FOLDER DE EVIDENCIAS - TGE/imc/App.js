import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView
} from 'react-native';

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');

  const calcularIMC = () => {
    // Validaciones
    if (!peso || !altura) {
      Alert.alert('Error', 'Ingresa peso y altura');
      return;
    }

    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (isNaN(pesoNum) || isNaN(alturaNum)) {
      Alert.alert('Error', 'Solo se permiten números');
      return;
    }

    if (pesoNum <= 0 || alturaNum <= 0) {
      Alert.alert('Error', 'Los valores deben ser mayores a 0');
      return;
    }

    if (pesoNum > 300) {
      Alert.alert('Error', 'El peso máximo es 300kg');
      return;
    }

    if (alturaNum > 250) {
      Alert.alert('Error', 'La altura máxima es 250cm');
      return;
    }

    // Cálculo
    const alturaMetros = alturaNum / 100;
    const imc = pesoNum / (alturaMetros * alturaMetros);
    const imcRedondeado = imc.toFixed(1);

    // Clasificación
    let clasificacion = '';
    if (imc < 18.5) {
      clasificacion = 'BAJO PESO';
    } else if (imc < 25) {
      clasificacion = 'NORMAL';
    } else if (imc < 30) {
      clasificacion = 'SOBREPESO';
    } else {
      clasificacion = 'OBESIDAD';
    }

    setResultado(`IMC: ${imcRedondeado} - ${clasificacion}`);
  };

  const limpiar = () => {
    setPeso('');
    setAltura('');
    setResultado('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Imagen en el inicio */}
      <Image 
        source={require('./assets/IMC.jpg')} 
        style={styles.imagen} 
      />

      <Text style={styles.titulo}>CALCULADORA IMC TGE 5IV8</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={peso}
          onChangeText={setPeso}
          placeholder="Peso en kg"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          value={altura}
          onChangeText={setAltura}
          placeholder="Altura en cm"
          keyboardType="numeric"
        />

        <View style={styles.botones}>
          <TouchableOpacity style={styles.boton} onPress={calcularIMC}>
            <Text style={styles.botonTexto}>CALCULAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.boton, styles.limpiar]} onPress={limpiar}>
            <Text style={styles.botonTexto}>LIMPIAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      {resultado !== '' && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTexto}>{resultado}</Text>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  imagen: {
    width: 200,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  limpiar: {
    backgroundColor: '#FF3B30',
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  resultadoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});