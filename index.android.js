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
  DrawerLayoutAndroid,
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
      isOpenLeftDrawable:false,
    });
  }


  render() {
    //如果是第一打开加载就先打开欢迎界面
    if (!this.state.loaded) {
      return (
        <SplashScreen />
      );

    }

    //打开侧滑栏
    if (this.state.isOpenLeftDrawable) {
      this.state.isOpenLeftDrawable=false;
       return this.renderDrawableView();
    }


    return (
      <View style={styles.container2}>

        <ToolbarAndroid   //标题栏
          navIcon={back_bg}
          onIconClicked={this.onPenLeftDrawable.bind(this)}
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

  //打开侧滑栏
  onPenLeftDrawable(){
    this.setState({
      isOpenLeftDrawable:true,
    });
    ToastAndroid.show('This is a toast with short duration', ToastAndroid.SHORT)
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


  //返回侧滑栏
  renderDrawableView() {

    var navigationView = (
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        <Text style={{margin: 10,color:'#fff',fontSize: 15, textAlign: 'center'}}>我是导航功能栏标题</Text>
        <Text style={{marginTop: 10,marginLeft:20,color:'#fff',fontSize: 15, textAlign: 'left'}}>1.功能1</Text>
        <Text style={{marginTop: 10,marginLeft:20,color:'#fff',fontSize: 15, textAlign: 'left'}}>2.功能2</Text>
      </View>
    );

      return (
      <DrawerLayoutAndroid
        drawerWidth={250}
        drawerPosition={DrawerLayoutAndroid.positions.left}
        renderNavigationView={() => navigationView}
        >
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>我是主布局内容</Text>
              </View>
            </DrawerLayoutAndroid>
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
