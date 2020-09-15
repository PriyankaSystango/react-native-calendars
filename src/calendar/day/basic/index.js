import React, {Component} from 'react';
import {TouchableOpacity, Text, View, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import {shouldUpdate} from '../../../component-updater';
import Dot from '../../dot';
import styleConstructor from './style';
import { Platform } from "react-native";


class Day extends Component {
  static displayName = 'IGNORE';

  static propTypes = {
    // TODO: disabled props should be removed
    state: PropTypes.oneOf(['disabled', 'today', '']),
    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marking: PropTypes.any,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    date: PropTypes.object,
    disableAllTouchEventsForDisabledDays: PropTypes.bool,
    isOffPeakFare: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      circleType:0,
      isOutBounded: this.props.isOutBounded,
      classSelected: this.props.classSelected,
      selectedDate: this.props.classSelected,
    }
    
    this.style = styleConstructor(props.theme);

    this.onDayPress = this.onDayPress.bind(this);
    this.onDayLongPress = this.onDayLongPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.forceUpdate()
    if (this.props !== nextProps) {
      this.setState({
        classSelected : nextProps.classSelected,
        isOutBounded: nextProps.isOutBounded,
        selectedDate: nextProps.selectedDate,
        
      })
      this.forceUpdate()
      var classData = this.props.classSelected
      var availabilityData = this.props.theme.availabilityData.availability
    var availabilityArray = []
    if(availabilityData){
    Object.entries(availabilityData).map(item => {
      availabilityArray.push(item[1])
    })

    let flag = 0
    for (let index = 0; index < classData.length; index++) {
      if(classData[index] && availabilityArray[index]){
        flag = flag+1
      }
    }
    this.setState({
      circleType : flag
    })}
    }
  }

  componentWillMount(){
    var classData = this.props.classSelected
    var availabilityData = this.props.theme.availabilityData.availability
    var availabilityArray = []
    if(availabilityData){
    Object.entries(availabilityData).map(item => {
      availabilityArray.push(item[1])
    })

    let flag = 0

    for (let index = 0; index < classData.length; index++) {
      
      if(classData[index] && availabilityArray[index] ){
        flag = flag+1
      }
    }
    this.setState({
      circleType : flag
    })
  }

  }
  componentDidMount(){
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }
  onDayLongPress() {
    this.props.onLongPress(this.props.date);
  }

  shouldComponentUpdate(nextProps) {
    return shouldUpdate(this.props, nextProps, [
      'state',
      'children',
      'marking',
      'onPress',
      'onLongPress',
    ]);
  }
  getBackgroundColor(details){
    
    var data 
    if(this.state.isOutBounded){
      data =  this.props.theme.availabilityData.outbound_availability
     }else{
       data =  this.props.theme.availabilityData.inbound_availability
      }
    if(data[details.dateString]){
      if(data[details.dateString].peak){
        return 'rgb(231,237,241)'
      }else{
          return '#132C52'
      }
  }
  }

  getTextColor(details){
    var data
    if(this.state.isOutBounded){
      data =  this.props.theme.availabilityData.outbound_availability
     }else{
       data =  this.props.theme.availabilityData.inbound_availability
      }
    if(data[details.dateString]){
      if(data[details.dateString].peak){
        return '#132C52'
      }else{
          return 'rgb(231,237,241)'
          
      }
  }

  }
  
  getFullCircelColor(details){
    var data;
    if(this.state.isOutBounded){
   data =  this.props.theme.availabilityData.outbound_availability
  }else{
    data =  this.props.theme.availabilityData.inbound_availability
   }
   
      let classes = this.state.classSelected
      let index = -1
      for(i = 0; i< classes.length; i++){
        if(classes[i]==true){
          index = i
        }
      }
      if(!data[details.dateString]){
        return 'white'
      }else{
      switch(index){
        case 0 :{
          if(data[details.dateString] && data[details.dateString].economy){
            return '#2044FF'
          }else{
              return 'rgb(231,237,241)'}

        }
        case 1 :{
          if(data[details.dateString] && data[details.dateString].premium){
            return '#FEA41D'
          }else{
              return 'rgb(231,237,241)'}

        }
        case 2 :{
          if(data[details.dateString] && data[details.dateString].business){
            return '#A905F6'
          }else{
              return 'rgb(231,237,241)'}

        }
        case 3 :{
          if(data[details.dateString] && data[details.dateString].first){
            return '#ED1870'
          }else{
              return 'rgb(231,237,241)'}

          }
          default:{
            return 'rgb(231,237,241)'
          }
      }}
  }

  getQuarterCircleColor(details, index){
    var data;
    if(this.state.isOutBounded){
   data =  this.props.theme.availabilityData.outbound_availability
  }else{
    data =  this.props.theme.availabilityData.inbound_availability
  }
  color = this.getBackgroundColor(details)
  if(!data[details.dateString]){
    return 'white'
  }else{
    switch(index){
      case 1 : {
        if(data[details.dateString] && data[details.dateString].business){
          return '#A905F6'
        }else{
            return 'rgb(231,237,241)'
            
        }
      }
      case 2 : {
        if(data[details.dateString] && data[details.dateString].premium){
          return '#FEA41D'
        }else{
            return 'rgb(231,237,241)'
            
        }
      }
      case 3 : {
        if(data[details.dateString] && data[details.dateString].first){
          return '#EB186F'
        }else{
            return 'rgb(231,237,241)'
            
        }
      }
      case 4 : {
        if(data[details.dateString] && data[details.dateString].economy){
          return '#2044FF'
        }else{
            return 'rgb(231,237,241)'
            
        }
      }
      
    }
    }
  }

  getHalfCircleColor(details, index){
    var data;
    if(this.state.isOutBounded){
   data =  this.props.theme.availabilityData.outbound_availability
  }else{
    data =  this.props.theme.availabilityData.inbound_availability

   }
      let classes = this.state.classSelected
      var availabilityData = this.props.theme.availabilityData.availability
      var availabilityArray = []
      if(availabilityData){
    Object.entries(availabilityData).map(item => {
      availabilityArray.push(item[1])
    })}
      let indexArray = []
      for(i = 0; i< classes.length; i++){
        if(classes[i]  && availabilityArray[i]){
          indexArray.push(i) 
        }
      }
      if(!data[details.dateString]){
        return 'white'
      }else{
      switch(index){
        case 1 :{
          switch (indexArray[0]){
            case 0 : {
              if(data[details.dateString] && data[details.dateString].economy){
                return '#2044FF'
              }else{
                  return 'rgb(231,237,241)'
               }
            }
            case 1 : {
              if(data[details.dateString] && data[details.dateString].premium){
                return '#FEA41D'
              }else{
                  return 'rgb(231,237,241)'
                  
              }
            }
            case 2 : {
              if(data[details.dateString] && data[details.dateString].business){
                return '#AC05FA'
              }else{
                  return 'rgb(231,237,241)'
                  
              }
            }
            case 3 : {
              if(data[details.dateString] && data[details.dateString].first){
                return '#ED1870'
              }else{
                  return 'rgb(231,237,241)'
                  
              }
            }

          }
        }
        case 2 :{
          switch (indexArray[1]){
            case 0 : {
              if(data[details.dateString] && data[details.dateString].economy){
                return '#2044FF'
              }else{
                  return 'rgb(231,237,241)'
                  
              }
            }
            case 1 : {
              if(data[details.dateString] && data[details.dateString].premium){
                return '#FEA41D'
              }else{
                  return 'rgb(231,237,241)'
                  
              }
            }
            case 2 : {
              if(data[details.dateString] && data[details.dateString].business){
                return '#A905F6'
              }else{
                  return 'rgb(231,237,241)'
                  
              }
            }
            case 3 : {
              if(data[details.dateString] && data[details.dateString].first){
                return '#ED1870'
              }else{
                  return 'rgb(231,237,241)'
                  
              }
            }

          }
        }
      }
      }

  }

  threePartCircleColor(details,index){
    var data;
    if(this.state.isOutBounded){
   data =  this.props.theme.availabilityData.outbound_availability
  }else{
    data =  this.props.theme.availabilityData.inbound_availability

   }
    let classes = this.state.classSelected
    let indexArray = []
    for(i = 0; i< classes.length; i++){
      if(classes[i]==true){
        indexArray.push(i) 
      }
    }
    if(!data[details.dateString]){
      return 'white'
    }else{
    switch(index){
      case 1 :{
        switch (indexArray[0]){
          case 0 : {
            if(data[details.dateString] && data[details.dateString].economy){
              return '#2044FF'
            }else{
                return 'rgb(231,237,241)'
             }
          }
          case 1 : {
            if( data[details.dateString] && data[details.dateString].premium){
              return '#FEA41D'
            }else{
                return 'rgb(231,237,241)'
                
            }
          }
          case 2 : {
            if(data[details.dateString] && data[details.dateString].business){
              return '#AC05FA'
            }else{
                return 'rgb(231,237,241)'
                
            }
          }
          case 3 : {
            if(data[details.dateString] && data[details.dateString].first){
              return '#ED1870'
            }else{
                return 'rgb(231,237,241)'
                
            }
          }

        }
      }
      case 2 :{
        switch (indexArray[1]){
          case 0 : {
            if(data[details.dateString] && data[details.dateString].economy){
              return '#2044FF'
            }else{
                return 'rgb(231,237,241)'
                
            }
          }
          case 1 : {
            if(data[details.dateString] && data[details.dateString].premium){
              return '#FEA41D'
            }else{
                return 'rgb(231,237,241)'
                
            }
          }
          case 2 : {
            if(data[details.dateString] && data[details.dateString].business){
              return '#A905F6'
            }else{
                return 'rgb(231,237,241)'
                
            }
          }
          case 3 : {
            if(data[details.dateString] && data[details.dateString].first){
              return '#ED1870'
            }else{
                return 'rgb(231,237,241)'
                
            }
          }

        }
      }
      case 3 :{
        switch (indexArray[2]){
          case 0 : {
            if(data[details.dateString] && data[details.dateString].economy){
              return '#2044FF'
            }else{
                return 'rgb(231,237,241)'
                
            }
          }
          case 1 : {
            if(data[details.dateString] && data[details.dateString].premium){
              return '#FEA41D'
            }else{
                return 'rgb(231,237,241)'
                
            }
          }
          case 2 : {
            if(data[details.dateString] && data[details.dateString].business){
              return '#A905F6'
            }else{
                return 'rgb(231,237,241)'
                
            }
          }
          case 3 : {
            if(data[details.dateString] && data[details.dateString].first){
              return '#ED1870'
            }else{
                return 'rgb(231,237,241)'
                
            }
          }

        }
      }
    }
  }


  }

  

  halfCirclesView(date, detail, isDisabled){
    let i = 0.75
    return(
      <TouchableOpacity onPress={()=>{
        this.onDayPress()
      }}>
        <View style={{ borderColor:this.state.selectedDate && this.state.selectedDate.dateString == detail.dateString ? '#03B2D8' : 'white', borderWidth:this.state.selectedDate && this.state.selectedDate.dateString == detail.dateString ? 2 : 0, borderRadius:20, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
        <View>
          <View style={{flexDirection:'row'}}>
            <View style={{height:40*i, width:20*i, backgroundColor:'transparent', overflow:'hidden'}}>
              <View style={{position:'absolute',top:0, left:0, height:40*i, width:40*i, borderRadius:20*i, borderWidth:2, borderColor:isDisabled && isDisabled.color !== '#00adf5' ? 'white' : this.getHalfCircleColor(detail,1)}}/>
            </View>
            <View style={{height:40*i, width:20*i, backgroundColor:'transparent', overflow:'hidden'}}>
              <View style={{position:'absolute',top:0, right:0, height:40*i, width:40*i, borderRadius:20*i, borderWidth:2, borderColor:isDisabled && isDisabled.color !== '#00adf5' ? 'white' : this.getHalfCircleColor(detail,2)}}/>
            </View>
          </View>
          <View style={{position:'absolute',left:18*i, height:40*i, width:4*i, backgroundColor:'white'}}/>
         <View style={{position:'absolute', top:(5.5)*i, left:5*i, justifyContent:'center', alignItems:'center',backgroundColor:isDisabled && isDisabled.color !== '#00adf5' ? 'white' : this.getBackgroundColor(detail), borderRadius:15*i,height:29*i, width:29*i,}}>
          <Text style={{fontSize: isDisabled && isDisabled.color !== '#00adf5' ? 16 : 14*i, color:isDisabled && isDisabled.color !== '#00adf5' ? '#E1E4E7' : this.getTextColor(detail)}}>
            {String(date)}
            </Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    )
}

  threePartCirclesView(date, detail,isDisabled){
    let i = 0.75
    return(
      <TouchableOpacity onPress={()=>{
        this.onDayPress()
      }}>
        <View style={{borderColor:this.state.selectedDate && this.state.selectedDate.dateString == detail.dateString ? '#03B2D8' : 'white', borderWidth:this.state.selectedDate && this.state.selectedDate.dateString == detail.dateString ? 2 : 0, borderRadius:20,  justifyContent:'center', alignItems:'center', backgroundColor:'white', padding:1,transform:[{rotate:'0deg'}]}}>
          <View>
            <View style={{flexDirection:'row'}}>
              <View style={{height:26.6*i, width:20*i, backgroundColor:'transparent', overflow:'hidden'}}>
                <View style={{position:'absolute',top:0, left:0, height:40*i, width:40*i, borderRadius:20*i, borderWidth:2, borderColor:isDisabled && isDisabled.color !== '#00adf5' ? 'white' : this.threePartCircleColor(detail,1)}}/>
              </View>
              <View style={{height:26.6*i, width:20*i, backgroundColor:'transparent', overflow:'hidden'}}>
                <View style={{position:'absolute',top:0, right:0, height:40*i, width:40*i, borderRadius:20*i, borderWidth:2, borderColor:isDisabled && isDisabled.color !== '#00adf5' ? 'white' : this.threePartCircleColor(detail,2)}}/>
              </View>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={{height:13.3*i, width:40*i, backgroundColor:'transparent', overflow:'hidden'}}>
                <View style={{position:'absolute',bottom:0, left:0, height:40*i, width:40*i, borderRadius:20*i, borderWidth:2, borderColor:isDisabled && isDisabled.color !== '#00adf5' ? 'white' : this.threePartCircleColor(detail,3)}}/>
              </View>
            </View>
            <View style={{position:'absolute',left:18*i, height:2*i, width:4*i, backgroundColor:'white'}}/>
            <View style={{position:'absolute', height:2*i, top:26*i, width:4*i, backgroundColor:'white', transform:[{rotate:'70deg'}]}}/>
            <View style={{position:'absolute', height:2*i, top:26*i, left:36*i, width:4*i, backgroundColor:'white', transform:[{rotate:'-70deg'}]}}/>
            <View style={{position:'absolute', height:30*i, width:30*i,justifyContent:'center', alignItems:'center', backgroundColor:isDisabled && isDisabled.color !== '#00adf5' ? 'white' : this.getBackgroundColor(detail), borderRadius:15*i, top:5*i, left:5*i}}>
              <Text style={{fontSize:isDisabled && isDisabled.color !== '#00adf5' ? 16 : 14*i, color:isDisabled &&  isDisabled.color !== '#00adf5' ? '#E1E4E7' : this.getTextColor(detail)}}>
              {String(date)}
              </Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
    )
}

noCircleView(date, detail, isDisabled) {
  let i = 0.75
    return (
      <TouchableOpacity onPress={()=>{
        this.onDayPress()
      }}>
        <View
          style={{
            borderColor:isDisabled && isDisabled.color == '#00adf5' ? 'white' : 'white', borderWidth:isDisabled && isDisabled.color == '#00adf5' ? 2 : 0, borderRadius:20, 
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 40 * i,
                  width: 40 * i,
                  backgroundColor: 'transparent',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: 40 * i,
                    width: 40 * i,
                    borderRadius: 20 * i,
                    borderWidth: 2,
                    borderColor: isDisabled && isDisabled.color !== '#00adf5' ? 'white' : this.getFullCircelColor(detail),
                  }}
                />
              </View>
            </View>
            {/* <View style={{position:'absolute',left:18*i, height:40*i, width:4*i, backgroundColor:'white'}}/> */}
            <View
              style={{
                position: 'absolute',
                top: 5.5 * i,
                left: 5 * i,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isDisabled && isDisabled.color !== '#00adf5' ? 'white' : this.getBackgroundColor(detail),
                borderRadius: 15 * i,
                height: 29 * i,
                width: 29 * i,
              }}>
              <Text style={{fontSize:isDisabled && isDisabled.color !== '#00adf5' ? 16 : 14 * i, color: isDisabled && isDisabled.color !== '#00adf5'? '#E1E4E7' : this.getTextColor(detail)}}>
                {String(date)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }


fullCircle(date, detail, isDisabled) {
  let i = 0.75
  return (
      <TouchableOpacity onPress={()=>{
        this.onDayPress()
      }}>
        <View
          style={{
            borderColor:this.state.selectedDate && this.state.selectedDate.dateString == detail.dateString ? '#03B2D8' : 'white', borderWidth:this.state.selectedDate && this.state.selectedDate.dateString == detail.dateString ? 2 : 0, borderRadius:20, 
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 40 * i,
                  width: 40 * i,
                  backgroundColor: 'transparent',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: 40 * i,
                    width: 40 * i,
                    borderRadius: 20 * i,
                    borderWidth: 2,
                    borderColor: isDisabled && isDisabled.color !== '#00adf5' ? 'white' : this.getFullCircelColor(detail),
                  }}
                />
              </View>
            </View>
             <View
              style={{
                position: 'absolute',
                top: 5.5 * i,
                left: 5 * i,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf:'center',
                backgroundColor: isDisabled && isDisabled.color !== '#00adf5' ? 'white' : this.getBackgroundColor(detail),
                borderRadius:Platform.OS == 'android' ?  16 * i : 15 * i,
                height: Platform.OS == 'android' ? 30 * i : 29 * i,
                width: Platform.OS == 'android' ? 30 * i : 29 * i,
              }}>
              <Text style={{fontSize:isDisabled && isDisabled.color !== '#00adf5' ? 16 : 14 * i, color: isDisabled && isDisabled.color !== '#00adf5'? '#E1E4E7' : this.getTextColor(detail), alignSelf:'center'}}>
                {String(date)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  quarterCirclesView(date, detail, isDisabled){
    let i = 0.75
    return (
      <TouchableOpacity onPress={()=>{
        this.onDayPress()
      }}>
        <View style={{ 
          borderColor:this.state.selectedDate && this.state.selectedDate.dateString == detail.dateString ? '#03B2D8' : 'white', borderWidth:this.state.selectedDate && this.state.selectedDate.dateString == detail.dateString ? 2 : 0, borderRadius:20,
          justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
          <View>
            <View style={{flexDirection:'row'}}>
              <View style={{height:20*i, width:20*i, backgroundColor:'transparent', overflow:'hidden'}}>
                <View style={{position:'absolute',top:0, left:0, height:40*i, width:40*i, borderRadius:20*i, borderWidth:2, borderColor:isDisabled && isDisabled.color !== '#00adf5' ? 'white':this.getQuarterCircleColor(detail,1)}}/>
              </View>
              <View style={{height:20*i, width:20*i, backgroundColor:'transparent', overflow:'hidden'}}>
                <View style={{position:'absolute',top:0, right:0, height:40*i, width:40*i, borderRadius:20*i, borderWidth:2, borderColor:isDisabled && isDisabled.color !== '#00adf5' ? 'white':this.getQuarterCircleColor(detail,2)}}/>
              </View>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={{height:20*i, width:20*i, backgroundColor:'transparent', overflow:'hidden'}}>
                <View style={{position:'absolute',bottom:0, left:0, height:40*i, width:40*i, borderRadius:20*i, borderWidth:2, borderColor:isDisabled && isDisabled.color !== '#00adf5' ? 'white':this.getQuarterCircleColor(detail,3)}}/>
              </View>
              <View style={{height:20*i, width:20*i, backgroundColor:'transparent', overflow:'hidden'}}>
                <View style={{position:'absolute',bottom:0, right:0, height:40*i, width:40*i, borderRadius:20*i, borderWidth:2, borderColor:isDisabled && isDisabled.color !== '#00adf5' ? 'white':this.getQuarterCircleColor(detail,4)}}/>
              </View>
            </View>
            <View style={{position:'absolute',left:18*i, height:40*i, width:4*i, backgroundColor:'white'}}/>
            <View style={{position:'absolute',top:18*i, height:4*i, width:40*i, backgroundColor:'white'}}/>
            <View style={{position:'absolute', top:5*i, left:5*i, justifyContent:'center', alignItems:'center',backgroundColor: isDisabled && isDisabled.color !== '#00adf5' ? 'white' : this.getBackgroundColor(detail), borderRadius:15*i,height:29*i, width:29*i, }}>
            <Text style={{fontSize:isDisabled && isDisabled.color !== '#00adf5' ? 16 : 14 * i, color: isDisabled && isDisabled.color !== '#00adf5'? '#E1E4E7' : this.getTextColor(detail)}}>
                {String(date)}
              </Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
    )
}
  getAppropriateCircle(textStyle, containerStyle){
    if(this.state.circleType == 4){
      return this.quarterCirclesView(this.props.children, this.props.date, textStyle[1])
    }else if(this.state.circleType == 3){
      return this.threePartCirclesView(this.props.children, this.props.date, textStyle[1])
    }else if(this.state.circleType == 2){
      return this.halfCirclesView(this.props.children, this.props.date, textStyle[1])
    }else if(this.state.circleType == 1){
      return this.fullCircle(this.props.children, this.props.date, textStyle[1])
    }else{
     // return this.noCircleView(this.props.children, this.props.date, textStyle[1])
      return  <TouchableOpacity
        testID={this.props.testID}
        style={containerStyle}
        onPress={this.onDayPress}
        onLongPress={this.onDayLongPress}
        activeOpacity={activeOpacity}
        disabled={shouldDisableTouchEvent}
        accessibilityRole={isDisabled ? undefined : 'button'}
        accessibilityLabel={this.props.accessibilityLabel}
      >
        <Text allowFontScaling={false} style={textStyle}>{String(this.props.children)}</Text>
        <Dot
          theme={theme}
          isMarked={marked}
          dotColor={dotColor}
          isSelected={selected}
          isToday={isToday}
          isDisabled={isDisabled}
        />
      </TouchableOpacity>
    }
  }

  render() {
    // console.log("#### Day render classSelected", this.props.classSelected)
    const {theme, disableAllTouchEventsForDisabledDays} = this.props;
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];
   let marking = this.props.marking || {};
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true,
      };
    }

    const isDisabled =
      typeof marking.disabled !== 'undefined'
        ? marking.disabled
        : this.props.state === 'disabled';
    const isToday = this.props.state === 'today';

    const {
      marked,
      dotColor,
      selected,
      selectedColor,
      selectedTextColor,
      activeOpacity,
      disableTouchEvent,
    } = marking;

    if (selected) {
      containerStyle.push(this.style.selected);
      textStyle.push(this.style.selectedText);

      if (selectedColor) {
        containerStyle.push({backgroundColor: selectedColor});
      }

      if (selectedTextColor) {
        textStyle.push({color: selectedTextColor});
      }
    } else if (isDisabled) {
      textStyle.push(this.style.disabledText);
    } else if (isToday) {
      containerStyle.push(this.style.today);
      textStyle.push(this.style.todayText);
    }

    let shouldDisableTouchEvent = false;
    if (typeof disableTouchEvent === 'boolean') {
      shouldDisableTouchEvent = disableTouchEvent;
    } else if (
      typeof disableAllTouchEventsForDisabledDays === 'boolean' &&
      isDisabled
    ) {
      shouldDisableTouchEvent = disableAllTouchEventsForDisabledDays;
    }
    if(this.state.circleType > 1 || this.state.circleType == 1 ){
      return(
        this.getAppropriateCircle(textStyle, containerStyle)

      )
    }else{
    return (
      <TouchableOpacity
      testID={this.props.testID}
      style={containerStyle}
      onPress={this.onDayPress}
      onLongPress={this.onDayLongPress}
      activeOpacity={activeOpacity}
      disabled={shouldDisableTouchEvent}
      accessibilityRole={isDisabled ? undefined : 'button'}
      accessibilityLabel={this.props.accessibilityLabel}
    >
      <Text allowFontScaling={false} style={textStyle}>{String(this.props.children)}</Text>
      <Dot
        theme={theme}
        isMarked={marked}
        dotColor={dotColor}
        isSelected={selected}
        isToday={isToday}
        isDisabled={isDisabled}
      />
    </TouchableOpacity>
    )
  }
}
}

export default Day;
