import React, {Component} from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';


export default class Tela1 extends Component {
	
	static navigationOptions = {
		header: null
	}

  	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text>Tela 1...</Text>
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

