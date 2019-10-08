import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet,Slider } from 'react-native';
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
        }
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
                    <View style={styles.controlAreaItem}>
                        <TouchableOpacity style={styles.button} onPress={() => this.tirarFoto(imagemId) }>
                            <Text style={styles.buttonText}>Capturar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.texto}>
                    <Text>Qr Code: </Text>
                    <Text>{this.state.barCodeData}</Text>
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
        backgroundColor: '#E5C799'
    }
});
