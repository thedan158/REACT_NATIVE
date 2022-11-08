import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'
const KYCScreen = () => {
    return (
        <WebView allowsInlineMediaPlayback useWebKit
            originWhitelist={['*']} source={{ uri: 'https://e27a-116-110-40-83.ap.ngrok.io' }} />
    )
}

export default KYCScreen

const styles = StyleSheet.create({})