import { Text, View } from 'react-native'
import React, { Component } from 'react'

const DataTable =  [
    {
        id: 1,
        name: 'Table 1',
    },
    {
        id: 2,
        name: 'Table 2',
    },
    {
        id: 3,
        name: 'Table 3',
    },
    {

    }

]

export class TableListComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        
      </View>
    )
  }
}

export default TableListComponent

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexdirection: 'row',
    }

})