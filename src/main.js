var React = require('react-native');

/*
 *	사용하려는 ReactNative Module을 아래와 같이 불러온다. 
 */
var {
	Navigator,
	StyleSheet,
	ToolbarAndroid,
	View
} = React;

/*
	Custom ReactNative Module을 불러온다.
 */
var Login = require('./pages/login');
var Channels = require('./pages/channels');
var Detail = require('./pages/detail');
var WebView = require('./pages/web-view');

/*
	Navigator으로 조작할 View의 목록을 정의	
 */
var ROUTES = {
	login: Login,
    channels: Channels,
    detail: Detail,
    webview: WebView
};

/*
	Main React 컴포넌트를 생성
 */
var Main = React.createClass({
	/*
		{...route.passProps}를 추가해줘야 내부 컴포넌트에서 passProp로 데이터를 전달 가능
		변수에 require로 받아온 모듈의 이름으로 사용 할 수 있다.
	 */	
	renderScene: function(route, navigator){
		var Component = ROUTES[route.name];

		return <Component route={route} navigator={navigator} {...route.passProps} />;
	},

	/*
		화면을 뿌려주는 메서드

		Navigator
		
		Navigator 는 앱에서 장면들끼리 전환시킬수 있도록 도와주는 컴포넌트이다.
		style은 말 그대로 컴포넌트의 스타일을 정의해준다.
		initialRoute는 초기화시켜줄 화면을 정의하는 부분이다.
		renderScene은 라우트에서 주어진 장면을 랜딩하여 사용할 수 있도록 정의한다.
		configScene은 장면이 변할때 동작을 정의해준다.
	 */
	render: function(){
		return(         
			<Navigator
				style={styles.container}
				initialRoute={ {name: 'login'} }
				renderScene={this.renderScene}
				configureScene={
					()=> {
						return Navigator.SceneConfigs.FadeAndroid
					}
				}
			/>
		);
	}
});
/*
	Style을 정의한다.
 */
var styles = StyleSheet.create({
	container: {
		flex: 1
	},	
});

/*
	다른곳에서 사용 할 수 있도록 모듈화 시켜준다.
 */
module.exports = Main;