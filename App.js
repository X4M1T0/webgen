import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ActivityIndicator, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AgentsDialog from './components/agentsDialog';
import Ionicons from '@expo/vector-icons/Ionicons';
import { sendToGemini } from './scripts/sendToGemini';
import { agents } from './utils/agents';
import RenderMessage from './components/renderMessage';


export default function App() {

  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState(null);
  const [agent, setAgent] = useState(agents[0]);
  const [showMenu, setShowMenu] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);



  const handleSelectAgent = async (agent) => {
    setAgent(agent);
    setMessages([]);
  }


  const updateMessages = (from, value) => {
    setMessages((prev) => {
      const arr = [...prev];

      const id = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1;

      arr.push({
        id: id,
        from: from,
        value: value
      })

      return arr;
    })
  }

  const handleSendMessage = async () => {
    try {
      setLoadingMessage(true);

      const lastMessages = messages.length > 0 ? messages.slice(messages[messages.length - 10], messages[messages.length]) : null;

      updateMessages('user', prompt);

      setPrompt('');

      const res = await sendToGemini(prompt, agent, lastMessages);

      updateMessages('ai', res);


    } catch (error) {
      console.error('ERROR - SEND MESSAGE:', error);

    } finally {
      setLoadingMessage(false);
    }
  }





  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // ajuste se tiver header
    >
      <View style={styles.screen}>

        <View style={styles.agentSelector}>
          <View style={styles.agentSelectorTextArea}>
            <FontAwesome name='user-o' size={25} color='#fff' />
            <Text style={styles.agentName}>{agent.name}</Text>
          </View>

          <Pressable style={styles.selectAgentButton} onPress={() => setShowMenu(true)}>
            <Ionicons name='menu-sharp' size={30} color='#fff' />
          </Pressable>
        </View>

        <View style={styles.container}>
          {messages.length > 0 ? (
            <FlatList
              style={{ width: '90%', alignSelf: 'center' }}
              data={messages}
              renderItem={({ item }) => <RenderMessage msg={item} />}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <>
              <Text style={styles.title}>Como eu posso te ajudar hoje?</Text>
              <Text style={styles.subtitle}>Me envie uma mensagem que eu vou te ajudar com o que precisar!</Text>
            </>
          )}
        </View>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            value={prompt}
            placeholder='Do que precisa?'
            placeholderTextColor={'#a3a3a3'}
            onChangeText={(text) => setPrompt(text)}
          />

          <Pressable style={styles.sendButton} onPress={() => !loadingMessage && handleSendMessage()}>
            {loadingMessage ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <Feather name='send' size={24} color='#fff' />
            )}
          </Pressable>
        </View>

        <AgentsDialog
          show={showMenu}
          onClose={() => setShowMenu(false)}
          onSelect={(value) => handleSelectAgent(value)}
        />

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#444'
  },

  agentSelector: {
    width: '90%',
    height: 70,
    paddingHorizontal: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    backgroundColor: '#666',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#a3a3a3',
  },

  agentSelectorTextArea: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  agentName: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 600,
    color: '#fff'
  },

  selectAgentButton: {
    padding: 5,
    backgroundColor: '#999',
    borderRadius: 5,
  },

  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },

  title: {
    width: '80%',
    fontSize: 22,
    color: '#fff',
    fontWeight: 600,
    textTransform: 'uppercase',
    textAlign: 'center'
  },

  subtitle: {
    width: '70%',
    fontSize: 14,
    marginTop: 20,
    color: '#fff',
    textAlign: 'center'
  },


  inputArea: {
    width: '90%',
    height: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    // backgroundColor: 'red'
  },

  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 10,
    color: '#fff',
    backgroundColor: '#666'
  },

  sendButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: '#666',
  },
});
