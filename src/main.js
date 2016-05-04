var React = require('react-native');

var {
	Navigator,
	StyleSheet,
	ToolbarAndroid,
	View
} = React;

var Login = require('./pages/login');
var Channels = require('./pages/channels');
var Detail = require('./pages/detail');


var ROUTES = {
	login: Login,
    channels: Channels
    channels: Channels,
    detail: Detail,
};

var Main = React.createClass({
	renderScene: function(route, navigator){
		var Component = ROUTES[route.name];
		return <Component route={route} navigator={navigator} />;
		return <Component route={route} navigator={navigator} {...route.passProps} />;
	},
	render: function(){
		return(         
			<Navigator
				style={styles.container}
				initialRoute={ {name: 'login'} }
				renderScene={this.renderScene}
				configureScene={
					()=> {
						return Navigator.SceneConfigs.FloatFromRight
					}
				}
			/>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1
	},	
});

module.exports = Main;