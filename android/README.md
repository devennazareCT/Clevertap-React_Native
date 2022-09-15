# CleverTap Geo-Fencing Implementation
Clevertap Geo Fencing Integration with React Native for Android

## Steps :-
1) Add the below dependencies to app's build.gradle file - 

```

implementation 'com.clevertap.android:clevertap-geofence-sdk:1.1.0'
implementation 'com.clevertap.android:clevertap-android-sdk:4.*.*'; Version of CT you are using
implementation 'com.google.android.gms:play-services-location:18.0.0';
implementation 'androidx.work:work-runtime:2.7.0' ;
implementation 'androidx.concurrent:concurrent-futures:1.1.0' ;

```
2) Add the below permissions -

```
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>

<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" /> 
(Required only when requesting background location access on Android 10 (API level 29))
```

3) Import the below packages into your MainActivity.java or your CustomClass.java where ever you are initializing Clevertap sdk instance - 

```
import com.clevertap.android.geofence.interfaces.CTLocationUpdatesListener;

import com.clevertap.android.geofence.CTGeofenceAPI;
import com.clevertap.android.geofence.CTGeofenceSettings;
import com.clevertap.android.geofence.Logger;
import com.clevertap.android.geofence.interfaces.CTGeofenceEventsListener;

```


### Check [MainApplication.java](https://github.com/devennazareCT/Clevertap-React_Native/blob/master/android/app/src/main/java/com/ctreactnative/MainApplication.java) page for more information regarding how to initialize the Geo-Fencing and  use its callbacks .


### Required snippets 
For reverse ip lookup
```
 clevertapDefaultInstance.enableDeviceNetworkInfoReporting(true);

```
Initializing the Geofence objects and settings
```
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


```
### Please refer to  [Settings Page](https://github.com/devennazareCT/Clevertap-React_Native/blob/master/android/settings.md) page for more information regarding the above settings 
