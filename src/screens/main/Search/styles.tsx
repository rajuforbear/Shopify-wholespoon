import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#e6f0f2'
    },
    input:{
        borderWidth:wp(.2),
        marginHorizontal:wp(6),
        marginTop:wp(3),
        flexDirection:'row',
        alignItems:'center',
        borderColor:'grey',
        paddingVertical:Platform.OS==='ios'? wp(2.8):0,
        borderRadius:wp(2),
        paddingLeft:wp(3),
        overflow:'hidden'
    },
    icon:{
        fontSize:wp(6),
        color:'grey'
    },
    textInput:{
        fontSize:wp(5),
        marginLeft:wp(3),
        color:'grey'
    },
    list:{
    
        height:hp(18),
        marginHorizontal:wp(3),
        marginVertical:wp(2),
        flexDirection:"row",
        alignItems:'center'
       
    },
    flatList:{
        marginTop:wp(3)
    },
    imgContainer:{
        width:wp(40),
        height:'100%'
    },
    img:{
        height:"100%",
        width:'100%'
    },
    title:{
        fontSize:wp(4),
        textAlign:'center',
        marginLeft:wp(3),
        width:wp(50),
        fontWeight:'600',
        color:'black',
       
    },
    price:{
        fontSize:wp(4),
        textAlign:'center',
        marginLeft:wp(3),
        width:wp(50),
        fontWeight:'600',
        color:'black',
        marginTop:wp(2)
    }
});
