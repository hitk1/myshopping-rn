import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore'

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

import { shoppingListExample } from '../../utils/shopping.list.data';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  //Busca em realtime
  // useEffect(() => {
  //   const subscription = firestore()
  //     .collection('products')
  //     .onSnapshot(query => {
  //       const data = query.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       })) as ProductProps[]

  //       setProducts(data)
  //     })

  //   return () => subscription()
  // })

  //busca de todos os documentos uma unica vez
  useEffect(() => {
    firestore()
      .collection('products')   //Caso seja necessário buscar somente um documento, acrescentar um .doc depois de 'collection', passando o ID como parametro
      .get()
      .then(response => {
        const data = response.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ProductProps[]

        setProducts(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
