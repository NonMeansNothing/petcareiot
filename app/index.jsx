import React from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AnimatedCircularProgress } from 'react-native-circular-progress';


function getNumberOfTemp() {
  return Math.floor(Math.random() * 10);
}

function getHumidity() {
  return Math.floor(Math.random() * 100);
}

function getMedicinePercentage() {
  return Math.floor(Math.random() * 100);
}

export default function Home() {
  const NumberOfTemp = getNumberOfTemp();
  const Humidity = getHumidity();
  const MedicinePercentage = getMedicinePercentage();

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.scrollView}>
        <TouchableOpacity>
          <View style={styles.imageWrapper}>
            <ImageBackground source={require('../imgs/Wallpaper_Blue_Sky.png')} style={styles.image}>
              <View style={styles.containersd}>
                <Text style={styles.text}>
                  Temperature:
                </Text>
                <Text style={styles.textshowb}>{NumberOfTemp} c°</Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity style={styles.halfSizeWrapper}>
            <ImageBackground source={require('../imgs/water.jpg')} style={styles.image}>
              <View style={styles.halfContainer}>
                <Text style={styles.textunder}>
                  Humidity:
                </Text>
                <View style={styles.circularWrapper}>
                  <AnimatedCircularProgress
                    size={60}
                    width={10}
                    fill={Humidity}
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875"
                    rotation={180}
                    lineCap="round"
                  />
                  <Text style={styles.textshow}>
                    {Humidity} % s
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={styles.halfSizeWrapper}>
            <ImageBackground source={require('../imgs/ox.jpeg')} style={styles.image}>
              <View style={styles.halfContainer}>
                <Text style={styles.textunder}>
                  Oxygen{"\n"}percentages
                </Text>
                <View style={styles.circularWrapper}>
                  <AnimatedCircularProgress
                    size={60}
                    width={10}
                    fill={MedicinePercentage}
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875"
                    rotation={180}
                    lineCap="round"
                  />
                  <Text style={styles.textshow}>
                    {MedicinePercentage} % s
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  containersd: {
    justifyContent: "center",
    height: 150,
    width: 360,
  },
  halfContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 175,
  },
  scrollView: {
    width: '100%',
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fffaf0'
  },
  textunder: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fffaf0'
  },
  textshow: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fffaf0',
    marginLeft: 10, 
  },
  textshowb: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fffaf0',
    marginLeft: 10,
  },
  imageWrapper: {
    height: 150,
    width: 360,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    marginBottom: 10,
  },
  halfSizeWrapper: {
    height: 150,
    width: 175,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 360,
  },
  circularWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  }
});