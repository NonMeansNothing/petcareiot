import React from "react";
import { Text,View } from "react-native";
import { Tabs } from "expo-router";
import TabBar from "../components/tabBar";


export default function _layout(){
  return (
    <Tabs 
        tabBar ={props=> <TabBar {...props} />}
    >
        <Tabs.Screen
          name="index"
          options={{title:"Home"}}
        />
        <Tabs.Screen
          name="Devices"
          options={{title:"Devices"}}
        />
        <Tabs.Screen
          name="Setting"
          options={{title:"Setting "}}
        />
      </Tabs>
  );
}