import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ToastAndroid,
  ToolbarAndroid,
} from 'react-native';

var page = 1;
var REQUEST_URL = 'http://gank.io/api/data/Android/10/' + page;


//引入欢迎界面
var SplashScreen = require('./js/SplashScreen');
//引入返回图标
var back_bg = require('./img/back.png');

//存放返回的数据的数组
var movieData = new Array();
class RnDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  //界面开始加载获取数据
  componentDidMount() {
    this.fetchData(REQUEST_URL);
  }


  //接受请求成功的回调的结果
  onResoutData(responseData) {
    var concat = movieData.concat(responseData.results);
    movieData = concat;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(movieData),
      loaded: true,
    });
  }


  render() {
    //如果是第一打开加载就先打开欢迎界面
    if (!this.state.loaded) {
      return (
        <SplashScreen />
      );
      // return this.renderLoadingView();
    }

    return (
      <View style={styles.container2}>

        <ToolbarAndroid   //标题栏
          navIcon={back_bg}
          titleColor='#ffffff'  //只支持RGB数值，设置标题的字体颜色
          style={styles.toolbar}
          title="Android资源列表"></ToolbarAndroid>

        <ListView
          initialListSize={1}
          onEndReachedThreshold={10}
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie}
          onEndReached={this.loadmore.bind(this)}
          style={styles.listviewstyle}
        />

      </View>

    );

  }

  //返回的监听
  onBack(){
    // ToastAndroid.show('This is a toast with short duration', ToastAndroid.SHORT)
  }


  fetchData(REQUEST_URL) {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.onResoutData(responseData)
      })
  }

  //监听滑动到底部
  loadmore() {
    page++;
    var REQUEST_URL = 'http://gank.io/api/data/Android/10/' + page;
    this.fetchData(REQUEST_URL);

  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(results) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: results.url}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{results.desc}</Text>
          <Text style={styles.year}>{results.createdAt}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  toolbar: {
    backgroundColor: 'blue',
    height: 56,

  },

  container2:{
    flex: 1,
    flexDirection: 'column', //竖直按顺序从上往下排列
  },

  container: {
    flexDirection: 'row', //按顺序从左往右排列
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listviewstyle: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',

  },
});
AppRegistry.registerComponent('RnDemo', () => RnDemo);
