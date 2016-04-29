# react-native-test
this project is react-native-test project


#React Native 튜토리얼

##요구사항

nodejs가 버전 4.0 이상이 설치되어 있어야 한다.

##Android 인 경우
	* Git을 설치 되어 있어야한다.
	* JAVA가 설치 되어 있어야한다.
	* Android SDK를 설치하여 ANDROID_HOME PATH를 지정되어 있어야한다.
	* Android 가상머신이 설치되어 있어야한다.
		* Android 가상 머신으로 genemotion 설치를 추천한다.
	* NodeJs 가 설치 되어 있어야한다.

##Android 튜토리얼 실행
```
	1. Reacti Native CLI를 설치한다.

		* npm install -g react-native-cli

	2. React Native 프로젝트를 생성한다.

		* react-native init ReactNativeTestProject

	3. 해당 생성된 폴더를 접근한다.

		1. cd ReactNativeTestProjct

	4. Android 가상 머신(Genemotion)을 실행한다.

		1. 가상머신 대신 실제 디바이스를 연결해도된다.(https://facebook.github.io/react-native/docs/running-on-device-android.html#content 참조)

	5. React native의 안드로이드 실행 명령을 한다.

		1. react-native start
		2. react-native run-android
```


##Android 튜토리얼 실행
``
	1. index.android.js 파일을 연다.
	2. adb logcat *:S ReactNative:V ReactNativeJS:V
``