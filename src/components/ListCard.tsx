import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

import React, {FunctionComponent, useState} from 'react';

import {Input, Icon} from 'react-native-elements';
import {Item} from '../store';
import {useLists} from '../hooks/lists.hooks';
import {NMorph as NeuMorphic, NMorphHighlightable as NeuMorphicHighlightable} from './neumorphics';

export interface ListCardProps {
  item: Item;
  onPress: (item: Item) => void;
}

export interface NewCardProps {
  onAdd: (item: Item) => void;
}

export interface ListCardsProps {
  listCards: ListCardProps[];
}

const NewItemCard: FunctionComponent<NewCardProps> = ({onAdd}) => {
  const [title, setTitle] = useState<String>('');
  return (
    <NeuMorphic>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          alignContent:"center",
          justifyContent: 'space-between',
        }}>
        <View style={[styles.stretched]}>
          <Input
            style={[styles.stretched, {fontSize: 14, alignSelf: 'stretch'}]}
            placeholder="NEW ITEM"
            placeholderTextColor="#A3A3A3"
            onChangeText={(text) => setTitle(text)}></Input>
        </View>

        <NeuMorphicHighlightable
          onPress={() => title && onAdd({title})}
          style={[{width: 32, height: 32, borderRadius: 16}]}>
          <Icon
            name="add"
            size={24}
            color="black"
            style={{backgroundColor: 'transparent'}}
          />
        </NeuMorphicHighlightable>
      </View>
    </NeuMorphic>
  );
};

export const ItemCard: FunctionComponent<ListCardProps> = ({item, onPress}) => {
  return (
    <NeuMorphic>
      <TouchableWithoutFeedback
        onPress={() => {
          onPress(item);
        }}>
        <View style={styles.card}>
          <Text style={{textTransform: 'uppercase'}}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </NeuMorphic>
  );
};

export const ItemCards: FunctionComponent = () => {
  const [{items: lists}, addItemToList, removeItemFromList] = useLists();

  return (
    <FlatList<Item>
      data={lists}
      keyExtractor={(d, i) => i.toString()}
      renderItem={(list) => (
        <ItemCard item={list.item} onPress={removeItemFromList}></ItemCard>
      )}
      ListHeaderComponent={() => (
        <NewItemCard onAdd={addItemToList}></NewItemCard>
      )}></FlatList>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 50,
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stretched: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
