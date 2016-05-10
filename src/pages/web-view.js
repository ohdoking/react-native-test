'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  WebView
} = ReactNative;

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://docswave.com/ko';

var WebViewExample = React.createClass({

  getInitialState: function() {
    this.state = {
      url: DEFAULT_URL,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true,
    };

    return this.state;
  },

  /*
    inputtext 함수를 초기화 시킴
 */
  inputText: '',

  /*
    Text가 들어올때 마다 처리 해주는 함수
   */
  handleTextInputChange: function(event) {
    var url = event.nativeEvent.text;
    if (!/^[a-zA-Z-_]+:/.test(url)) {
      url = 'http://' + url;
    }
    this.inputText = url;
  },

  /*
    
    this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton
    와같이 삼항 연산자로 사용할수도있음.

    TextInput 

    TextInput은 키보드에 의해 app에 text가 입력되는 기본적인 컴포넌트이다.
      ref
      autoCapitalize는 textInput에 자동으로 대문자화해줄지 여부를 정한다.
        characters: all characters,
        words: first letter of each word
        sentences: first letter of each sentence (default)
        none: don't auto capitalize anything
      defaultValue는 default값을 입력한다.
      onSubmitEditing은 input들의 submit 버튼을 눌렀을때 콜백함수를 호출한다.
      onChange는 input들의 text가 변경되었을때 콜백함수를 호출한다.
      clearButtonMode[IOS]는 textview의 오른쪽사이드에 버튼이 나타날지 여부를 정해준다.
          
    TouchableOpacity

    TouchableOpacity는 touch 의 view가 응답할수 있도록 감싸주는 컴포넌트이다.    


    WebView
    
    WebView는 native webview를 랜딩해준다.
      automaticallyAdjustContentInsets는 ?
      source는 webview 에서 static html 혹은 uri를 로드한다.
      javaScriptEnabled[android]는 webview에서 js의 사용 유무를 설정한다.
      onNavigationStateChange ?
      startInLoadingState ?
      scalesPageToFit는 web 페이지를 view 사이즈에 맞출지 여부를 설정한다.
      (그리고 유저가 크기를 바꿀수 있도록)


    ref란?

    ref에서 컴포넌트로

    컴포넌트를 빌드한 후에는 render에서 반환된 컴포넌트 인스턴스에 접근하거나 메소드를 호출할 방법이 필요할수 있다.
    그런경우 사용하는 refs 이다.

    ref(레퍼런스)
      컴포넌트에 의해 렌더된 DOM 마크업을 찾을때(인스턴스내의 절대적인 위치)
      큰 프로젝트의 일부에 React 컴포넌트를 사용하는 경우 
      기존 코드베이스를 React로 변경하는경우

    사용법

      var MyComponent = React.createClass({
        handleClick: function() {
          // 명시적으로 텍스트 인풋에 포커스하기 위해 raw DOM API를 사용합니다.
          this.myTextInput.focus();
        },
        render: function() {
          // ref 어트리뷰트는 컴포넌트가 마운트되면 
          // this.refs에 컴포넌트에 대한 참조를 추가합니다.
          return (
            <div>
              <input type="text" ref={(ref) => this.myTextInput = ref} />
              <input
                type="button"
                value="Focus the text input"
                onClick={this.handleClick}
              />
            </div>
          );
        }
      });

      ReactDOM.render(
        <MyComponent />,
        document.getElementById('example')
      );

      Refs는 반응적인 props와 state 스트리밍을 통해서는 불편했던 특정한 자식 인스턴스에 메시지 보내기를 수행하는 좋은 방법입니다.
      하지만 애플리케이션의 데이터 플로우 전반에 사용해도 되는 go-to 같은 개념은 아닙니다.
      기본적으로는 반응적인 데이터 플로우를 사용하고, ref는 근본적으로 반응적이지 않은 경우에만 사용하세요.

      

    refs 출처 : https://facebook.github.io/react/docs/more-about-refs-ko-KR.html
   */
  render: function() {
    this.inputText = this.state.url;

    return (
      <View style={[styles.container]}>
        <View style={[styles.addressBarRow]}>
          <TouchableOpacity
            onPress={this.goBack}
            style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
               {'<'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.goForward}
            style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
              {'>'}
            </Text>
          </TouchableOpacity>
          <TextInput
            ref={TEXT_INPUT_REF}
            autoCapitalize="none"
            defaultValue={this.state.url}
            onSubmitEditing={this.onSubmitEditing}
            onChange={this.handleTextInputChange}
            clearButtonMode="while-editing"
            style={styles.addressBarTextInput}
          />
          <TouchableOpacity onPress={this.pressGoButton}>
            <View style={styles.goButton}>
              <Text>
                 Go!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          onNavigationStateChange={this.onNavigationStateChange}
          startInLoadingState={true}
          scalesPageToFit={this.state.scalesPageToFit}
        />
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.status}</Text>
        </View>
      </View>
    );
  },

  goBack: function() {
    this.refs[WEBVIEW_REF].goBack();
  },

  goForward: function() {
    this.refs[WEBVIEW_REF].goForward();
  },

  reload: function() {
    this.refs[WEBVIEW_REF].reload();
  },

  /*
    NavigationState가 변경 되었을때 설정..?
   */
  onNavigationStateChange: function(navState) {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true
    });
  },

  onSubmitEditing: function(event) {
    this.pressGoButton();
  },

  pressGoButton: function() {
    var url = this.inputText.toLowerCase();
    if (url === this.state.url) {
      this.reload();
    } else {
      this.setState({
        url: url,
      });
    }
    // dismiss keyboard
    this.refs[TEXT_INPUT_REF].blur();
  },

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
  },
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
  addressBarTextInput: {
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 24,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 14,
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DISABLED_WASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  goButton: {
    height: 24,
    padding: 3,
    marginLeft: 8,
    alignItems: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    alignSelf: 'stretch',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    height: 22,
  },
  statusBarText: {
    color: 'white',
    fontSize: 13,
  },  
});


module.exports = WebViewExample;