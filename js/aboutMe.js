import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  WebView,
} from 'react-native';


var WINDOW_WIDTH = Dimensions.get('window').width;
var Animated = require('Animated');
var aboutMeUri="https://github.com/l123456789jy";
//关于我的主页
class AboutMe extends Component {


  render() {
      return this.renderAboutMeView();
  }

  //加载关于我的界面
  renderAboutMeView(){
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: aboutMeUri}}
          style={{marginTop: 20}}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,  //总共评分布局为1份
  },
  thumbnail: {
    flex: 1,  //他自己就占了一份所以铺满全屏
    width: WINDOW_WIDTH,  //宽度设置为屏幕的宽度
    height: 1,
  },
});

//暴漏给其他模块调用
module.exports = AboutMe;
