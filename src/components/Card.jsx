import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Edit2Icon, Trash, Trash2Icon } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Card = ({expand,data,ondelete,onupdate}) => {
  const [linevalue, setlinevalue] = useState(1);
  const expandhandle = (check) => {
    if (check) {
      setlinevalue(0);
    } else {
      setlinevalue(1);
    }
  };
  useEffect(() => {
    expandhandle(expand);
  }, [expand]);
  //console.log(data.taskName);
  return (
    <View style={[styles.cardview, expand && {height: 'auto'}]}>
        <View style={{width:"92%"}}>
      <Text style={styles.text}>{data.taskName}</Text>
      <Text style={styles.text2} numberOfLines={linevalue} ellipsizeMode="tail">
        {data.description}
      </Text>
      <Text style={styles.text3}>{data.completed?`Completed`:`Incomplete`}</Text>
      </View>
      <View style={{gap:10}}>
      <TouchableOpacity onPress={ondelete}>
      <Trash size={24} color={"red"}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={onupdate}>
      <Edit2Icon size={24} color={"green"}/>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardview: {
    backgroundColor: '#e9e8ff',
    width: 300,
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    padding: 16,
    borderRadius: 10,
    shadowColor: 'purple',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
    flexDirection:"row"
  },
  text: {
    color: 'purple',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text2: {
    color: 'purple',
    fontSize: 16,
  },
  text3:{
    color:"green",
    fontSize:16,
    fontWeight:"medium"
  }
});
