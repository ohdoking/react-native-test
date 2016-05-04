var React = require('react-native');

var {
	View,
	Text,
	TextInput,
  	TouchableHighlight,
	StyleSheet,
	ToastAndroid
} = React;


var Login = React.createClass({
	/*
		state를 초기화 하는 곳이다.
	 */
	getInitialState: function(){
	    this.state = {
			username: ''
		}
		return this.state;
	},
	/*
		View

		View는 대부분의 UI 가 만들어지는 근본적인 컴포넌트이다.
		View는 flexbox, style, 터치동작, 접근 컨트롤 디자인응의 레이아웃을 지원한다.
		(View is a container that supports layout with flexbox, style, some touch handling, and accessibility controls, and is designed to be nested inside other views and to have 0 to many children of any type.)
		View는 2개 이상의 자식 뷰를 포함할수 있다.

		TextInput

		TextInput은 말그대로 글을 넣을 수 있는 input 컴포넌트이다.
		onChangeText은 텍스트가 변할때마다 호출하여 실행된다.

		TouchableHighlight

		TouchableHighlight는 View가 터치에 반응 할 수 있도록 감싸 만들어주는 컴포넌트이다.
		TouchableHighlight는 오직 하나의 자식 뷰만 지원 가능하다!
		underlayColor는 터치가 되었을때 변할 색을 정의해준다.

	 */
	render: function(){
		return (
			<View style={styles.container}>
				<View style={styles.loginContainer}>
					<TextInput
			            style={styles.input}
			            value={this.state.username}
			            onChangeText={(text) => this.setState({username: text})}
			            placeholder={'Enter User Nickname'}
			            maxLength={12}
			            multiline={false}
		            />
		 
		            <TouchableHighlight
			            style={styles.button}
			            underlayColor={'#328FE6'}
			            onPress={this.onPress}
		            >
		            <Text style={styles.label}>LOGIN!!</Text>
		          </TouchableHighlight>
				</View>
			</View>
		);
	},

	/*
		함수를 이와 같이 정의하여 View 컴포넌트에서 사용 할 수 있다.

		 this.props.navigator.push 를 사용하면 navigator의 Route에 등록된 다른 화면으로 전환 가능하다.
		 name : [Route에 등록된 View 이름]

		 ToastAndroid 는 Toast 컴포넌트이다. 
		 안드로이드에서 사용하는 Toast와 정의하는 방법이 비슷하다.

	 */
	onPress: function() {
	    console.log(this.state.username);
	    if(this.state.username == "ohdoking"){
	    	console.log(this.props.navigator);
	    	this.props.navigator.push({ 
	    		name: 'channels'
	    	});
	    }
	    else{
	    	ToastAndroid.show(this.state.username + "은 존재하지 않는 ID 입니다.", ToastAndroid.SHORT)
	    }
    }
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#6e66aa'
	},
	loginContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		width: 250,
	    color: '#555555',
	    padding: 10,
	    height: 50,
	    borderColor: '#32C5E6',
	    borderWidth: 1,
	    borderRadius: 4,
	    alignSelf: 'center',
	    backgroundColor: '#ffffff'
  	},
    button: {
	    justifyContent: 'center',
	    alignItems: 'center',
	    borderWidth: 1,
	    borderRadius: 5,
	    borderColor: '#328FE6',
	    padding: 10,
	    marginTop: 10,
	    backgroundColor: '#32c5e6'
    },
    label: {
	    width: 230,
	    flex: 1,
	    alignSelf: 'center',
	    textAlign: 'center',
	    fontSize: 20,
	    fontWeight: '600',
	    color: '#ffffff'
    }
});

module.exports = Login;