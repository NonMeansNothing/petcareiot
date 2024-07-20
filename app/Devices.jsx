import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, PermissionsAndroid, FlatList, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WifiManager from "react-native-wifi-reborn";

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default function Devices() {
  const [wifiList, setWifiList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWifiList = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        try {
          WifiManager.loadWifiList(
            (wifiStringList) => {
              var wifiArray = JSON.parse(wifiStringList);
              setWifiList(wifiArray);
              setLoading(false);
            },
            (error) => {
              console.log(error);
              setLoading(false);
            }
          );
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchWifiList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.scrollView}>
        <View style={styles.containersd}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : wifiList.length > 0 ? (
            <FlatList
              data={wifiList}
              keyExtractor={(item) => item.BSSID}
              renderItem={({ item }) => (
                <Text style={styles.text}>
                  {item.SSID} - {item.level} dBm
                </Text>
              )}
            />
          ) : (
            <Text style={styles.text}>No WiFi networks available</Text>
          )}
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
    backgroundColor: '#fffaf0',
    justifyContent: "center",
    height: 150,
    width: 360,
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    height: 100,
    width: 360,
  },
  text: {
    fontSize: 16,
    alignSelf: 'center',
  },
});
