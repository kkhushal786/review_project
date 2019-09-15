import React, { Component } from 'react'
// import Select from 'react-select';
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native'
// import { Image } from 'react-native'
// import PhoneInput from 'react-native-phone-input'
import { Rating, AirbnbRating } from 'react-native-ratings'
import { SliderBox } from 'react-native-image-slider-box';

class Inputs extends Component {
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

   login = (name, email, phone, review) => {
      if (name.trim() === "") {
        this.setState(() => ({ nameError: "First name required." }));
      } else {
        this.setState(() => ({ nameError: null }));
        // this.state.name.value = '';
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
   
   ratingCompleted(rating) {
     // console.log("Rating is: " + rating)
     handleReview: rating
   }
    
    componentWillMount() {
      fetch('http://review.nahlapure.in/api/getslider')
      .then(response => response.json()) // If it's a JSON response, you have to parse it firstly
      .then(responseJson => this.setState({ slider:responseJson.data })) // #2. After that you have to keep the images in the component's state.
      console.disableYellowBox = true;
    }

   render() {    
      return (
         <View style = {styles.container}>
            <View style = {{ alignItems: 'center' , backgroundColor : '#e84393', marginBottom: 10}} >
            <Image source = {{uri:'https://pmkscan.com/wp-content/uploads/2019/03/logo2x.png'}}
               style = {{ width: 100, height: 50, margin: 10 }}
            />
            </View>
            <SliderBox images={this.state.slider} autoPlay autoplayTimeout={2} infiniteLoop='true' sliderBoxHeight={200} circleLoop paginationBoxVerticalPadding={2} />

            <TextInput style = {styles.input}
               ref="name"
               underlineColorAndroid = "transparent"
               placeholder = " Name"
               placeholderTextColor = "#A6B3C1"
               autoCapitalize = "none"
               maxLength = {60}
               onChangeText = {this.handleName}
            />
             {!!this.state.nameError && (
                <Text style={{ color: "red", marginLeft:15, marginRight:15 }}>{this.state.nameError}</Text>
              )}
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = " Email"
               placeholderTextColor = "#A6B3C1"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            {!!this.state.emailError && (
             <Text style={{ color: "red", marginLeft:15, marginRight:15 }}>{this.state.emailError}</Text>
           )}
            <TextInput style = {styles.input}
               placeholder=" Mobile Number"  
               underlineColorAndroid='transparent' 
               placeholderTextColor = "#A6B3C1"
               autoCapitalize = "none"
               onChangeText = {this.handlePhone}
               maxLength = {10}
               keyboardType={'numeric'}
            />  
            {!!this.state.phoneError && (
             <Text style={{ color: "red", marginLeft:15, marginRight:15}}>{this.state.phoneError}</Text>
           )}      
 
            <Rating showRating startingValue={0} onFinishRating={this.handleReview} onChangeText = {this.handleReview} />
            {!!this.state.reviewError && (
             <Text style={{ color: "red", marginLeft:15, marginRight:15 }}>{this.state.reviewError}</Text>
           )}
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.name, this.state.email, this.state.phone, this.state.review)
               }>
               <Text style = {styles.submitButtonText}> Submit Review</Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Inputs

const {width, height}  = Dimensions.get('window');

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#A6B3C1',
      borderWidth: 1,
      borderRadius: 50,
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: '#ffffff',
   },
   submitButton: {
      backgroundColor: '#e84393',
      padding: 10,
      margin: 15,
      height: 40,
      borderRadius:50,
      alignItems: 'center',
   },
   submitButtonText:{
      color: '#ffffff'
   },
   image:{
      margin: 0,
      width: width
   }
})