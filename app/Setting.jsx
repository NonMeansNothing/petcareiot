import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ref, update } from 'firebase/database';
import  { database }  from '../components/firebaseConfig';

export default function Devices() {
  const [lightTimeSetting, setLightTimeSetting] = useState("");
  const [heaterTimeSetting, setHeaterTimeSetting] = useState("");
  const [gasMilligramSetting, setGasMilligramSetting] = useState("");
  const [liquidMilligramSetting, setLiquidMilligramSetting] = useState("");

  const [lightTimeLeft, setLightTimeLeft] = useState(null);
  const [heaterTimeLeft, setHeaterTimeLeft] = useState(null);
  const [gasMilligram, setGasMilligram] = useState(null);
  const [liquidMilligram, setLiquidMilligram] = useState(null);

  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isCountingDown) {
      interval = setInterval(() => {
        setLightTimeLeft((prevTime) => prevTime > 0 ? prevTime - 1 : null);
        setHeaterTimeLeft((prevTime) => prevTime > 0 ? prevTime - 1 : null);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCountingDown]);

  const startCountdown = (type) => {
    let timeInSeconds = 0;
    switch (type) {
      case 'light':
        timeInSeconds = parseInt(lightTimeSetting) * 60;
        setLightTimeLeft(timeInSeconds);
        //ส่งข้อมูลไปยัง database โหนด lightTimeSetting
        const lightTimeRef = ref(database);
        update(lightTimeRef, {lightTimeSetting});
        break;
      case 'heater':
        timeInSeconds = parseInt(heaterTimeSetting) * 60;
        setHeaterTimeLeft(timeInSeconds);
        //ส่งข้อมูลไปยัง database โหนด heaterTimeSetting
        const heaterTimeRef = ref(database);
        update(heaterTimeRef, {heaterTimeSetting});
        break;
      default:
        return;
    }
    setIsCountingDown(true);
  };

  const setMilligrams = (type) => {
    switch (type) {
      case 'gas':
        setGasMilligram(gasMilligramSetting);
        //ส่งข้อมูลไปยัง database โหนด gasMilligramSetting
        const gasMilligramRef = ref(database);
        update(gasMilligramRef, {gasMilligramSetting});
        break;
      case 'liquid':
        setLiquidMilligram(liquidMilligramSetting);
        //ส่งข้อมูลไปยัง database โหนด liquidMilligramSetting
        const liquidMilligramRef = ref(database);
        update(liquidMilligramRef, {liquidMilligramSetting});
        break;
      default:
        return;
    }
  };

  const formatTime = (seconds) => {
    if (seconds === null) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.scrollView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.containersd}>
            <View style={styles.settingContainer}>
              <View style={styles.sideContainer1}>
                <Text style={styles.text}>Set Light Delay </Text>
              </View>
              <View style={styles.sideContainer2}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value={lightTimeSetting}
                    onChangeText={setLightTimeSetting}
                    placeholder="Enter Time setup"
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity style={styles.startButton} onPress={() => startCountdown('light')}>
                  <Text style={styles.buttonText}>Set </Text>
                </TouchableOpacity>
              </View>
              {lightTimeLeft !== null && (
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>{formatTime(lightTimeLeft)}</Text>
                </View>
              )}
              <View style={styles.separator} />
            </View>

            <View style={styles.settingContainer}>
              <View style={styles.sideContainer1}>
                <Text style={styles.text}>Set Heater Delay </Text>
              </View>
              <View style={styles.sideContainer2}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value={heaterTimeSetting}
                    onChangeText={setHeaterTimeSetting}
                    placeholder="Enter Time setup"
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity style={styles.startButton} onPress={() => startCountdown('heater')}>
                  <Text style={styles.buttonText}>Set </Text>
                </TouchableOpacity>
              </View>
              {heaterTimeLeft !== null && (
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>{formatTime(heaterTimeLeft)}</Text>
                </View>
              )}
              <View style={styles.separator} />
            </View>

            <View style={styles.settingContainer}>
              <View style={styles.sideContainer1}>
                <Text style={styles.text}>Set Gas Injection (mg) </Text>
              </View>
              <View style={styles.sideContainer2}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value={gasMilligramSetting}
                    onChangeText={setGasMilligramSetting}
                    placeholder="Enter milligrams"
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity style={styles.startButton} onPress={() => setMilligrams('gas')}>
                  <Text style={styles.buttonText}>Set </Text>
                </TouchableOpacity>
              </View>
              {gasMilligram !== null && (
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>{gasMilligram} mg</Text>
                </View>
              )}
              <View style={styles.separator} />
            </View>

            <View style={styles.settingContainer}>
              <View style={styles.sideContainer1}>
                <Text style={styles.text}>Set Liquid Inject (mg) </Text>
              </View>
              <View style={styles.sideContainer2}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    value={liquidMilligramSetting}
                    onChangeText={setLiquidMilligramSetting}
                    placeholder="Enter milligrams"
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity style={styles.startButton} onPress={() => setMilligrams('liquid')}>
                  <Text style={styles.buttonText}>Set </Text>
                </TouchableOpacity>
              </View>
              {liquidMilligram !== null && (
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>{liquidMilligram} mg</Text>
                </View>
              )}
              <View style={styles.separator} />
            </View>
            <View style={styles.blankspace}/>
          </View>
        </ScrollView>
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
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    flexDirection: 'column',
  },
  settingContainer: {
    marginBottom: 20,
  },
  sideContainer1: {
    backgroundColor: '#e9967a',
    alignContent: 'center',
    width: 360,
    height: 80,
    borderRadius: 30,
    marginVertical: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sideContainer2: {
    borderRadius: 30,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#3cb371',
    borderRadius: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    flex: 1,
  },
  textInput: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: 360,
    flexDirection: 'column',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  text: {
    fontSize: 19,
    alignSelf: 'center',
    flexShrink: 1,
  },
  timerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#cd5c5c',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 19,
    color: '#fff',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  blankspace:{
    height:80,
  }
});
