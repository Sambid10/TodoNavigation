import { StyleSheet, View } from 'react-native';
import { MyTabs } from '../../navigation/TopTabNavigation';

export default function History() {
  return (
    <View style={styles.maincontainer}>
      <MyTabs/>
    </View>
  );
}
const styles=StyleSheet.create({
    maincontainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#FAF7F3',
  },
})