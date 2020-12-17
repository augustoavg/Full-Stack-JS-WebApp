import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as S from './styles';
import Qr from 'qrcode.react';

// Components Import
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

function QrCode() {

    const [ mac, setMac ] = useState();
    const [ redirect, setRedirect ] = useState(false);

    async function saveMac(){
        if(!mac){
            alert('Informe o número do celular.');
        }else{
            await localStorage.setItem('@ToDoAPP/mac_address', mac);
            setRedirect(true);
            window.location.reload();
        }
    }

    return (

        <S.Container>
            { redirect && <Redirect to="/" /> }
            <Header />

            <S.ValidationCode>
                <span align="center"> Informe seu celular </span>
                <h1></h1>
                <input type="text" onChange={ e => setMac(e.target.value) } value={ mac } />
                <button type="button" onClick={ saveMac }> Continuar </button>
            </S.ValidationCode>

            <Footer />
        </S.Container>
    );
}

export default QrCode;
