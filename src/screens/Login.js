import React, {Component} from 'react';
import { StyleSheet, ScrollView, View, Text, Button, Alert } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
//import Geolocation from 'react-native-geolocation-service';

console.disableYellowBox = true;

export default class Login extends Component {
	
	static navigationOptions = {
		header: null
	}

	constructor(props){
		super(props);
		this.state = {
			markers: [
				{key: 0, coords:{latitude: -15.8090374, longitude: -47.870231}, pintColor: 'orange'}
			],
			lat: -15.8080374,
			log: -47.8750231
		};
		
		this.pegarLocalizacao = this.pegarLocalizacao.bind(this);
		
	}

	pegarLocalizacao(){		
		let state = this.state;
		this.state.lat = -15.7100374;
		this.state.log = -47.8750231;
		this.map.animateToCoordinate({
			latitude: this.state.lat,
			longitude: this.state.log
		}, 2000);

		this.setState(state);
	}

  	render() {
		return (
			<View style={styles.container}>
				<MapView
					ref={(map)=>{ this.map = map}}
					style={{width: 300, height: 300, marginBottom: 20}}
					
					initialRegion={{
						latitude: this.state.lat,
						longitude: this.state.log,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121
					}}>

					<MapView.Marker
						coordinate={{latitude: this.state.lat, longitude: this.state.log}}
						title={"title"}
						description={"description"}
					/>

				</MapView>
				<View>
					<Button title="QR Code" onPress={()=> this.props.navigation.navigate('Camera')} />
					<Text>{this.props.navigation.getParam('qrCode')}</Text>
					<Button title="Localizacao" onPress={ this.pegarLocalizacao } />
					<Text>Lat: {this.state.lat} - Log: {this.state.log}</Text>
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

