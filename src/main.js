var React = require('react-native');

var {
	Navigator,
	StyleSheet,
} = React;

var Login = require('./components/login');
var Channels = require('./components/channels');

var ROUTES = {
	login: Login,
    channels: Channels
};

var Main = React.createClass({
	renderScene: function(route, navigator){
		var Component = ROUTES[route.name];
		return <Component route={route} navigator={navigator} />;
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
	}
});

module.exports = Main;