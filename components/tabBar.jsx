import { Text, View, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';

 const TabBar =({state, descriptors, navigation})=>{

  const icons ={
    index: (props)=> <AntDesign name="home" size={28} color= 'black'{...props} />,
    Devices: (props)=> <MaterialCommunityIcons name="devices" size={28} color= 'black'{...props} />,
    Setting: (props)=> <Octicons name="tools" size={28} color= 'black'{...props} />
  }
  return (
    <View style={styles.TabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.TabBarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >{
            icons[route.name]({
              color: isFocused? 'red' : '#222'
            })
          }
            <Text style={{ color: isFocused ? 'red' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  TabBar:{
    position: 'absolute',
    bottom: 25,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#fffaf0',
    marginHorizontal:20,
    paddingVertical:15,
    borderRadius:25,
    borderCurve:'continuous',
    shadowColor:'black',
    shadowOffset:{width:0,height:10},
    shadowRadius:10,
    shadowOpacity:0.1,

  },
  TabBarItem: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})

export default TabBar