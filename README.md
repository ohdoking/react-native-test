#React Native Test 실습

##요구사항

nodejs가 버전 4.0 이상이 설치되어 있어야 한다.

##Android 인 경우
```
	* Git을 설치 되어 있어야한다.
	* JAVA가 설치 되어 있어야한다.
	* Android SDK를 설치하여 ANDROID_HOME PATH를 지정되어 있어야한다.
	* Android 가상머신이 설치되어 있어야한다.
		* Android 가상 머신으로 genemotion 설치를 추천한다.
	* NodeJs 가 설치 되어 있어야한다.
```

##Android 튜토리얼 실행
```
	1. Reacti Native CLI를 설치한다.
		npm install -g react-native-cli

	2. React Native 프로젝트를 생성한다.
		react-native init ReactNativeTestProject

	3. 해당 생성된 폴더를 접근한다.
		cd ReactNativeTestProjct

	4. Android 가상 머신(Genemotion)을 실행한다.
		가상머신 대신 실제 디바이스를 연결해도된다.(https://facebook.github.io/react-native/docs/running-on-device-android.html#content 참조)

	5. React native의 안드로이드 실행 명령을 한다.
		react-native start
		react-native run-android
```



##React-Native 에서 사용하는 JS 문법

```
####ES5
```
Reserved Words: promise.catch(function() { });
```

####ES6
```
Arrow functions: <C onPress={() => this.setState({pressed: true})}
Block scoping: let greeting = 'hi';
Call spread: Math.max(...array);
Classes: class C extends React.Component { render() { return <View />; } }
Constants: const answer = 42;
Destructuring: var {isActive, style} = this.props;
for...of: for (var num of [1, 2, 3]) {}
Modules: import React, { Component } from 'react-native';
Computed Properties: var key = 'abc'; var obj = {[key]: 10};
Object Consise Method: var obj = { method() { return 10; } };
Object Short Notation: var name = 'vjeux'; var obj = { name };
Rest Params: function(type, ...args) { }
Template Literals: var who = 'world'; var str = `Hello ${who}`;
```

####ES7
```
Object Spread: var extended = { ...obj, a: 10 };
Function Trailing Comma: function f(a, b, c,) { }
Async Functions: async function doStuffAsync() { const foo = await doOtherStuffAsync(); };
```

####Specific
```
JSX: <View style={{color: 'red'}} />
Flow: function foo(x: ?number): string {}
```

####참고한 사이트 및 프로젝트

* http://blog.sendbird.com/ko/tutorialreact-native%EC%97%90%EC%84%9C-%EC%B1%84%ED%8C%85-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/

* http://facebook.github.io/react-native/

* https://github.com/race604/ZhiHuDaily-React-Native

* https://github.com/iSimar/HackerNews-React-Native/blob/master/index.android.js