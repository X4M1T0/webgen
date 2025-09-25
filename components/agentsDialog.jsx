import { View, ScrollView, StyleSheet, Text, Pressable, FlatList } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { agents } from "../utils/agents";
import Feather from '@expo/vector-icons/Feather';



export default function AgentsDialog({show, onClose, onSelect}){
    return show && (
        <View style={styles.screen}>
            <View style={styles.overflow}/>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{fontSize: 18, color: '#fff', fontWeight: 600}}>Agentes</Text>
                    <Pressable onPress={() => onClose()}>
                        <Ionicons name='close-circle' size={24} color='#fff'/>
                    </Pressable>
                </View>

                <FlatList
                    style={{width: '85%', height: 300, alignSelf: 'center', marginTop: 10}}
                    data={agents}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.agentContainer}>
                                <Text style={{fontSize: 15}}>{item.name}</Text>
                                <Pressable style={styles.selectAgentButton} onPress={() => {onSelect(item); onClose()}}>
                                    <Feather name='chevron-right' color='#fff' size={20}/>
                                </Pressable>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        // backgroundColor: 'red',
        zIndex: 10
    },

    overflow: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#333',
        opacity: 0.5,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 11
    },

    container: {
        width: '80%',
        minHeight: 450,
        paddingBottom: 40,
        borderRadius: 10,
        backgroundColor: '#fff',
        zIndex: 12,
        overflow: 'hidden'
    },

    header:{
        width: '100%',
        height: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#666'
    },

    agentContainer:{
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        borderWidth: 0.5,
        borderColor: '#a3a3a3',
        borderRadius: 5
    },

    selectAgentButton:{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#666',
        borderRadius: 5
    },
})