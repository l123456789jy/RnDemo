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
  Dimensions,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';

var page = 1;
var REQUEST_URL = 'http://gank.io/api/data/Android/10/' + page;


//引入欢迎界面
var SplashScreen = require('./js/SplashScreen');
//引入关于我的界面
var AboutMe = require('./js/AboutMe');


//引入返回图标
var back_bg = require('./img/menu.png');
//侧滑栏顶部的背景
var drawable_bg = require('./img/drawerlayout.png');


//存放返回的数据的数组
var movieData = new Array();

//主界面
class Home extends Component {
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

    }

    //初始化侧边栏
    return this.renderDrawableView();

  }

  //打开侧滑栏
  onPenLeftDrawable() {
    this.drawer.openDrawer();
  }

  //加载网络数据
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
    //侧滑列表显示的布局
    var navigationView = (
      <View style={styles.drawableContainer}>

        <View style={styles.drawableHeard}>

          <Image
            style={styles.drawableHeard}
            source={drawable_bg}
          />

          <Text style={styles.drawableHeardItem1}>
            Lazy
          </Text>

          <Text style={styles.drawableHeardItem1}>
            让生活更精彩
          </Text>

        </View>

        <TouchableOpacity onPress={this.onPressDraweraboutMeItem.bind(this)}>
        <View style={styles.drawableContainer2}>
          <Text style={styles.drawableHeardItem2}>关于我</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={this.onPressDrawerCloseItem.bind(this)}>
        <View style={styles.drawableContainer2}>
        <Text style={styles.drawableHeardItem2}>关闭</Text>
        </View>
        </TouchableOpacity>
      </View>
    );




    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer; }}
        drawerWidth={Dimensions.get('window').width / 5 * 3}
        drawerPosition={DrawerLayoutAndroid.positions.left}
        //这个是加载侧边划出的布局
        renderNavigationView={() => navigationView}
      >

        <View style={styles.container2}>
          <ToolbarAndroid   //标题栏
            navIcon={back_bg}
            onIconClicked={this.onPenLeftDrawable.bind(this)} //左上角打开侧划栏点击方法
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
      </DrawerLayoutAndroid>
    );
  }

  //关于我
  onPressDraweraboutMeItem(){
    this.drawer.closeDrawer();
    //延长在执行回调方法，提高体验
    InteractionManager.runAfterInteractions(() => {
      this.props.navigator.push({
        component: AboutMe,
      });
    });

  }


  //关闭侧滑栏
  onPressDrawerCloseItem(){
    this.drawer.closeDrawer();
  }




  //显示干活数据的具体逻辑
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


  drawableContainer2: {
    marginTop:5,
    height: 30,
    backgroundColor: '#838383'
  },


  drawableHeardItem2: {
    color: '#fcfcfc',
    fontSize: 15,
    marginLeft: 10,
    marginTop:5,
  },


  drawableContainer: {
    flex: 1,
    backgroundColor: '#fcfcfc'
  },



  drawableHeard: {
    width: Dimensions.get('window').width / 5 * 3,
    height: 120,
    justifyContent: 'flex-end',  //与父组件的底部对齐。
    paddingBottom: 10,
    backgroundColor: '#3e9ce9'
  },



  drawableHeardItem1: {
    fontSize: 20,
    textAlign: 'left',  //靠左
    color: '#fcfcfc',
    marginLeft: 10,
  },



  toolbar: {
    backgroundColor: 'blue',
    height: 56,

  },


  container2: {
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

//暴漏给其他模块调用
module.exports = Home;
