import React,{Component} from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default class HomeScreen extends Component{

    state = {
        name: '',
        email: '',
        review: '',
        phone: '',
        slider : [],
        data: ''
     }
  
     handleName = (text) => {
        this.setState({ name: text })
     }
     handleEmail = (text) => {
        this.setState({ email: text })
     }
     handleReview = (text) => {
        this.setState({ review: text})
     }
     handlePhone = (text) => {
        this.setState({ phone: text})
     }
  
     login = () => {

        const {name,
        email,
        review,
        phone} = this.state;

        if (name.trim() === "") {
          this.setState(() => ({ nameError: "First name required." }));
        } else {
          this.setState(() => ({ nameError: null }));
        }
  
        if (email.trim() === "") {
          this.setState(() => ({ emailError: "Email address required." }));
        } else {
          this.setState(() => ({ emailError: null }));
        }
        
        if (phone.trim() === "") {
          this.setState(() => ({ phoneError: "Mobile number required." }));
        } else {
          this.setState(() => ({ phoneError: null }));
        }
  
        if (review === "") {
          this.setState(() => ({ reviewError: "Review required." }));
        } else {
          this.setState(() => ({ reviewError: null }));
        }
        
        var url = "http://review.nahlapure.in/api/postreview?name="+name+"&email="+email+"&mobile="+phone+"&rating="+review;
        fetch(url, {
           method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           // console.log(responseJson);
           alert(responseJson.message);
           this.setState({ name: ''});
           this.setState({ email: ''});
           this.setState({ phone: ''});
           this.setState({ review: ''});
        })
        .catch((error) => {
           console.error(error);
        });
     }
   
     
     UNSAFE_componentWillMount(){
        // fetch('http://review.nahlapure.in/api/getslider')
        // .then(response => response.json()) // If it's a JSON response, you have to parse it firstly
        // .then(responseJson => this.setState({ slider:responseJson.data })) // #2. After that you have to keep the images in the component's state.
      
        const data = '[{"image":"http:\/\/review.nahlapure.in\/uploads\/slider\/04.jpg"},{"image":"http:\/\/review.nahlapure.in\/uploads\/slider\/2.jpeg"}]';
        const val = JSON.parse(data);        
        this.setState({ slider : val });
     }

    getImagesData = () =>{
      
    }

    renderButton = () =>{
      return (
          <TouchableOpacity onPress={()=>{
            this.login();
          }}>
          <View style={{borderWidth: 1, borderRadius:10, backgroundColor: '#A6B3C1', justifyContent:'center', alignItems:'center'}}>
             <Text>Submit</Text>
          </View>
          </TouchableOpacity>
      );
    }

    // renderItem = ({item}) =>
    //   (
    //     <Image source={{uri: item.image}} style={{width:, height: 100}}></Image>
    //   )

    renderItem ({item}) {
      return (
          <View >
            <Image source={{uri: item.image}} style={{width:100, height: 100}}></Image>
          </View>
      );
  }
    
    
    _carousel=null;
    render(){
        return(
        <View style={{flex:1, backgroundColor:'#fff'}}>
          <View style = {{ alignItems: 'center' ,justifyContent:'center', backgroundColor : '#e84393', marginBottom: 10, padding:10}} >
            <Image source = {{uri:'https://pmkscan.com/wp-content/uploads/2019/03/logo2x.png'}}
               style = {{ width: 100, height: 50 }}
            />
            </View>
          <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.slider}
              renderItem={this.renderItem(item)}
              sliderWidth={1080}
              itemWidth={1080}
            />
        </View>);  
    }
}