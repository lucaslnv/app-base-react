import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet,Slider, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Camera extends Component {
    
    static navigationOptions = {
		header: null
    }
    
    constructor(props) {
        super(props);
        this.state = {
            cameraZoom: 0,
            barCodeData:''
        }

        this.trocarZoom = this.trocarZoom.bind(this);
        this.lerBarCode = this.lerBarCode.bind(this);
        this.consumirApi = this.consumirApi.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    trocarZoom(v) {
        let state = this.state;
        state.cameraZoom = v;
        this.setState(state);
    }

    lerBarCode(obj){
        if( obj.type != null ){
            let state = this.state;
            state.barCodeData = obj.data;
            this.setState(state);
            console.log(obj.data);
            //this.props.navigation.navigate('Login', {qrCode: obj.data} );
        }
    }

    consumirApi(){
        
        fetch('https://web.gruposol.com.br/ws/abastecimento/api/buscarMotoristasOrm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "chave" : "095d0754-9ed5-4da9-aa16-cdd3b2dc42b1"
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
             alert(responseJson);
             let state = this.state;
             state.barCodeData = 'API consumida com sucesso.';
             this.setState(state);
        })
        .catch((error) => {            
            alert(error);
        });

    }
    
    render() {
        
        return (
            <View style={styles.container}>
                <RNCamera 
                    style={ styles.camera }
                    ref={(camera) =>{
                        this.camera = camera;
                    }}
                    type={ RNCamera.Constants.Type.back }
                    zoom={ this.state.cameraZoom }
                    onBarCodeRead={ this.lerBarCode }
                    flashMode={ RNCamera.Constants.FlashMode.auto }
                    captureAudio={ false }
                    androidCameraPermissionOptions={{
                        title: 'Permissão para utilizar a câmera',
                        message: 'Precisamos da sua permissão para utilizar a câmera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancelar',
                    }}
                />
                <View style={styles.controlArea}>
                    <View style={styles.controlAreaItem}>
                        <Slider style={styles.slider} minimumValue={0} maximumValue={1} onValueChange={ this.trocarZoom }/>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate('Login')} >
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}  onPress={()=> this.consumirApi()}  >
                        <Text style={styles.buttonText}>Consumir API</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.texto}>
                    <Text style={styles.texto}>QR CODE: </Text>
                    <Text style={styles.texto}>{this.state.barCodeData}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000'
    },
    camera: {
        flex: 1
    },
    controlArea: {
        flexDirection: 'row',
        marginBottom: 25
    },
    controlAreaItem: {
        flex: 1,
        padding: 5
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#1976D2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderWidth: 1
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF'
    },
    slider: {
        width: '100%',
        height: 50,
        backgroundColor: '#CCC',
        borderRadius: 6,
        borderWidth: 1
    },
    texto:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        backgroundColor: '#FFF8DC'
    }
});
