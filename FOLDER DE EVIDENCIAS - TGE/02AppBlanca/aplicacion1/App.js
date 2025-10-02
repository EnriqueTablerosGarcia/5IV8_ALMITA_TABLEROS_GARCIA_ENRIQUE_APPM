import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "react-native-web";

export default function Contador() {
  const [contador, setContador] = useState(0);

  const incrementar = () => setContador(contador + 1);
  const decrementar = () => setContador(contador - 1);

   return (
    <><View style={styles.outerContainer}>
       <Text style={styles.titulo}>Contador bien papas con chile TGE</Text>
       <View style={styles.container}>
         <View style={styles.subcontainer}>

           <TouchableOpacity style={styles.btn} onPress={decrementar}>

             <Text style={styles.textoBoton}>-</Text>

           </TouchableOpacity>

           <View style={styles.cuentaContainer}>
             <Text style={styles.textcuenta}>{contador}</Text>
           </View>
           <TouchableOpacity style={styles.btn} onPress={incrementar}>

             <Text style={styles.textoBoton}>+</Text>

           </TouchableOpacity>
         </View>

        

         <Text style={styles.description}>
           ¡Bienvenido al hermoso mundo de la música! Aumenta o di9sminuye armonía con los botones + y -.
         </Text>
       </View>
     </View>
     <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#B2DFDB', // pastel teal
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 38,
    color: '#3949AB', // pastel indigo
  },
  container: {
    backgroundColor: '#FFF9C4', // pastel yellow
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#FFCCBC', // pastel orange
    padding: 30,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  textoBoton: {
    fontSize: 33,
    color: '#FF7043', // deep orange
  },
  cuentaContainer: {
    backgroundColor: '#C8E6C9', // pastel green
    padding: 30,
    marginHorizontal: 29,
    borderRadius: 15,
  },
  textcuenta: {
    fontSize: 33,
    color: '#388E3C', // light green
  },
  imagen: {
    width: 200,
    height: 500,
    marginTop: 20,
    borderRadius: 10,
  },
  description: {
    fontSize: 18,
    color: '#F8BBD0', // pastel pink
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '600', // semi-bold
  },
});

 

