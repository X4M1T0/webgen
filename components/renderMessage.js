import { View, Text, StyleSheet } from "react-native";

export default function RenderMessage({msg}){

    const alignment = msg.from == 'user' ? 'flex-end' : 'flex-start';
    const bgColor = msg.from == 'user' ? '#fff' : '#d3d3d3ff';

    return (
        <View style={[styles.msgContainer, {alignSelf: alignment, backgroundColor: bgColor}]}>
            <Text style={styles.message}>{msg.value}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    msgContainer: {
        maxWidth: '75%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 10
    },

})