package com.rndemo.nativemodules;

import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Nullable;

/**
 * 作者：Administrator on 2016/5/25 18:20
 * 邮箱：906514731@qq.com
 * 封装原声toast给rn调用
 */
public class MyToastModule extends ReactContextBaseJavaModule {
  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";


  public MyToastModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }


  //我们必须实现这个方法这个是用于在js端来根据返回的名字来进行调用（React.NativeModules.ToastAndroid）
  @Override public String getName() {
    return "MyToastModule";
  }


  //这个不是必须实现的方法,返回了需要导出给JavaScript使用的常量
  @Nullable @Override public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }


  /**
   * 这个方法是定义给rn调用的，React Native的跨语言访问是异步进行的，
   * 所以想要给JavaScript返回一个值的唯一办法是使用回调函数或者发送事件
   */
  @ReactMethod public void show(String message, int duration) {

    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }
}
