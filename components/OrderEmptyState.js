import { Image, StyleSheet, Text, View} from "react-native";

// Komponent reprezentujący stan, gdy brak zamówień
const EmptyState = () => {
  return (
    <View style={styles.emptyState}>
      {/* Obrazek reprezentujący pusty stan */}
      <Image style={styles.image} width="145" height="145" source={require('../assets/emptyState.png')}/>
      {/* Nagłówek informujący o braku zamówień */}
      <Text style={styles.title}>Nie dokonałeś jeszcze rzadnych zamówień</Text>
      {/* Podtytuł z dodatkowymi informacjami */}
      <Text style={styles.subtitle}>Będą tutaj jak jakieś zrobisz</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  emptyState: {
    minHeight: '40%',
    width: '100%',
    padding: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92AF96',
    borderRadius: 10
  },
  image: {
    width: 145,
    height: 145,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#363939',
    textAlign: 'center',
    marginTop: '3%'
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#797A7B',
    textAlign: 'center',
    marginBottom: '3%'
  },
  action: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 6
  }
})

export default EmptyState;
