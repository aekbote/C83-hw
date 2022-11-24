import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};


export default class CreatePostScreen extends Component {
     constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: 'image_3',
      dropdownHeight: 70,
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  };

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
      if (!this.state.fontsLoaded) {
        return <AppLoading />;
      } else {
        let preview_images = {
          image_1: require('../assets/image_1.jpg'),
          image_2: require('../assets/image_2.jpg'),
          image_3: require('../assets/image_3.jpg'),
          image_4: require('../assets/image_4.jpg'),
          image_5: require('../assets/image_5.jpg'),
        };
        return (
           <View styles={styles.container}>
            <SafeAreaView style={styles.droidSafeArea} />
              <View style={style.appTitle}>
                  <View style={styles.appIcon}>
                    <Image
                    source={require("../assets/logo.png")} style={styles.iconImage}></Image>
                  </View>
                        <View style={styles.appTitleTextContainer}>
                          <Text style={styles.appTitleText}>New Post</Text>
                        </View>
              </View>
              <View style={styles.fieldsContainer}>
                <ScrollView>
                  <Image source={preview_images[this.state.previewImage]}
                  style={styles.previewImage}></Image>
                  <View style={{height: RFValue(this.state.dropdownHeight)}}>
                  <DropDownPicker
                   items={[
                    { label: 'Image 1', value: 'image_1' },
                    { label: 'Image 2', value: 'image_2' },
                    { label: 'Image 3', value: 'image_3' },
                    { label: 'Image 4', value: 'image_4' },
                    { label: 'Image 5', value: 'image_5' },
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 10
                  }}
                  onOpen={()=>{
                    this.setState({dropDownHeight:170})
                  }}
                  onClose={()=>{
                    this.setState({dropdownHeight: 40})
                  }}
                  style={{backgroundCOlor: "transparent"}}
                  itemStyle={{
                    justifyCOntent: "flex-start"
                  }}
                  dropDownStyle={{ backgroundColor: "2a2a2a"}}
                  labelStyle={{color: "white"}}
                  arrowStyle={{color: "white"}}
                  onChangeItem={item=>this.setState({previewImage: item.value})}
                  /></View>
                  <TextInput
                  style={styles.inputFont}
                  onChangeText={caption=> this.setState({caption})}
                  
                  placeholder={"Caption"}
                  placeholderTextColor="white"
                  />
                  </ScrollView>
                  <View
                  style={{flex: 0.08}}></View>
              </View>
          </View>
        );
      }
  }
}