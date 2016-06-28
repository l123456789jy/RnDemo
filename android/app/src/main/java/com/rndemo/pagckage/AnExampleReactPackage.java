package com.rndemo.pagckage;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.rndemo.nativemodules.MyToastModule;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 作者：Administrator on 2016/5/25 18:30
 * 邮箱：906514731@qq.com
 * 这个是封装原声组件的最后一步。我们需要在应用的Package类的createNativeModules方法中添加这个模块。
 * 如果模块没有被注册，它也无法在JavaScript中被访问到。
 */
public class AnExampleReactPackage implements ReactPackage {

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }


  @Override public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }


  /**
   * 在这个方法中返回自己封装的toast
   * @param reactContext
   * @return
   */
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new MyToastModule(reactContext));
    return modules;
  }
}
