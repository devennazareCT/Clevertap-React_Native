package com.ctreactnative;

import android.Manifest;
import android.app.Application;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.util.Log;

import androidx.core.app.ActivityCompat;

import com.clevertap.android.geofence.interfaces.CTLocationUpdatesListener;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.clevertap.react.CleverTapPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.clevertap.react.CleverTapPackage;
import com.clevertap.android.pushtemplates.PushTemplateNotificationHandler;
import com.clevertap.android.sdk.interfaces.NotificationHandler;
import com.clevertap.android.sdk.CleverTapAPI;
import com.clevertap.android.sdk.ActivityLifecycleCallback;

/*GEOFENCE */

import com.clevertap.android.geofence.CTGeofenceAPI;
import com.clevertap.android.geofence.CTGeofenceSettings;
import com.clevertap.android.geofence.Logger;
import com.clevertap.android.geofence.interfaces.CTGeofenceEventsListener;

import org.json.JSONObject;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
        CleverTapAPI.setNotificationHandler((NotificationHandler)new PushTemplateNotificationHandler());
      Log.d("logdup","upside oncreate");
        ActivityLifecycleCallback.register(this);   
        CleverTapAPI.setDebugLevel(CleverTapAPI.LogLevel.DEBUG); // default is CleverTapAPI.LogLevel.INFO



      super.onCreate();

      CleverTapAPI clevertapDefaultInstance = CleverTapAPI.getDefaultInstance(getApplicationContext());
      CleverTapAPI.setDebugLevel(3);

      Log.d("networkinfo","added");

      //Required by geofence reverse ip lookup
      clevertapDefaultInstance.enableDeviceNetworkInfoReporting(true);
      //GEOFENCE CODE STARTS

      CTGeofenceSettings ctGeofenceSettings = new CTGeofenceSettings.Builder()
              .enableBackgroundLocationUpdates(true)//boolean to enable background location updates
              .setLogLevel(Logger.DEBUG)//Log Level
              .setLocationAccuracy(CTGeofenceSettings.ACCURACY_HIGH)//byte value for Location Accuracy
              .setLocationFetchMode(CTGeofenceSettings.FETCH_LAST_LOCATION_PERIODIC)//byte value for Fetch Mode
              .setGeofenceMonitoringCount(50)//int value for number of Geofences CleverTap can monitor
              .setInterval(1800000)//long value for interval in milliseconds
              .setFastestInterval(1800000)//long value for fastest interval in milliseconds
              .setSmallestDisplacement(200F)//float value for smallest Displacement in meters
              .setGeofenceNotificationResponsiveness(0)// int value for geofence notification responsiveness in milliseconds
              .build();
      CTGeofenceAPI.getInstance(getApplicationContext()).init(ctGeofenceSettings,clevertapDefaultInstance);
      CTGeofenceAPI.getInstance(getApplicationContext()).triggerLocation();

      Log.d("geo1","down oncreate");

      //callbacks to check if geofence initialized

      CTGeofenceAPI.getInstance(getApplicationContext())
              .setOnGeofenceApiInitializedListener(() -> {
                  //App is notified on the main thread that CTGeofenceAPI is initialized
                  Log.d("geofence","geofence initialized2");

              });
      Log.d("above geo","down oncreate");





      CTGeofenceAPI.getInstance(getApplicationContext())
              .setCtGeofenceEventsListener(new CTGeofenceEventsListener() {

                  //callback for geofence area entered
                  @Override
                  public void onGeofenceEnteredEvent(JSONObject jsonObject) {
                      Log.d("entered","geofence entered");
                      //Callback on the main thread when user enters Geofence with info in jsonObject
                  }

                  //callback for geofence exited
                  @Override
                  public void onGeofenceExitedEvent(JSONObject jsonObject) {
                      Log.d("entered","geofence exited");

                      //Callback on the main thread when user exits Geofence with info in jsonObject
                  }
              });

      CTGeofenceAPI.getInstance(getApplicationContext())
              .setCtLocationUpdatesListener(location -> {
                  Log.d("updated","geofence updated");
                  //New location on the main thread as provided by the Android OS
              });


      //GEOFENCE IMPLEMENTATION ENDS


  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.ctreactnative.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
