var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} = React;
  
var Detail = React.createClass({
  getInitialState: function() {
    console.log(this.props.movie);
    this.state = {};

    return this.state;
  },
  onBackPress: function() {
    this.props.navigator.pop();
  },

  componentDidMount: function() {
    /*this.fetchData();*/

  },  


  render: function() {

    console.log(this.props,"!!!");
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <TouchableHighlight
            underlayColor={'#4e4273'}
            onPress={this.onBackPress}
            style={styles.toolbarText}
            >
            <Text style={{color: '#fff'}}>&lt; Back!</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.chatContainer}>
          <Text style={{color: '#000'}}>{this.props.movie.title} // {this.props.movie.year}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{color: '#000'}}>Footer!</Text>
        </View>
      </View>
    );
  }
});
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff'
  },
  toolbar: {
    height: 56,
    backgroundColor: '#FF6600'
  },
  toolbarText: {
    marginLeft: 15,
    marginTop: 20
  },
  chatContainer: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});

module.exports = Detail;