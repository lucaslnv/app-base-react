import React, {Component} from 'react';
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';


export default class Tela2 extends Component {
	
  	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text>Tela 2</Text>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		marginTop:20
	}
});

