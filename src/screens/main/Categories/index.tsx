import React, {useEffect} from 'react';
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../compoents/Loader';
import { StackScreenProps } from '@react-navigation/stack';
import { HelperNavigationParams } from '../../../navigation/Helper';
import { RootState } from '../../../sopify/Redux/store';
type Props = StackScreenProps<HelperNavigationParams, 'Categories'>;
const Categories:React.FC<Props> = ({navigation}) => {
  const data = useSelector((state:RootState) => state.data.collection);
  const isLoading = useSelector((state:RootState) => state.data.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length <= 0) getData();
  }, [dispatch]);

  const getData = () => {
    dispatch({
      type: 'sopify/getCollection',
    });
  };

  const fetchProductById = (id:string, title:string) => {
    dispatch({
      type: 'sopify/fetchProductById',
      prId: id,
      navigation,
      title: title,
      page: 'home',
    });
  };
  return (
    <View style={{flex: 1}}>
      {isLoading ? <Loader /> : null}
      <View
        style={{
          flex: 1,

          width: wp(100),
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => fetchProductById(item.id, item.title)}
                style={styles.card}>
                <ImageBackground
                  style={{
                    height: '100%',
                    width: '100%',
                    alignSelf: 'center',
                    //resizeMode: 'contain',
                    borderRadius: wp(0),
                    justifyContent: 'center',
                  }}
                  source={
                    item?.image
                      ? {uri: item?.image?.src}
                      : require('../../../assests/noimg.jpeg')
                  }>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: wp(6),
                    }}>
                    {item.title}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
export default Categories;
