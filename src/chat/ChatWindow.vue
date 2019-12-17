<template>
  <v-card class="chat-room">
    <v-toolbar card dense flat class="white chat-room--toolbar" light>
      <template v-if="chat.users">
        <v-avatar size="32" class="avatar-stack" v-for="(user_id, index) in chat.users" :key="index">
          <img :src="getAvatar(user_id)" alt="" />
        </v-avatar>
      </template>
      <v-spacer></v-spacer>
      <v-toolbar-title> <h4>TICKET</h4></v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn icon slot="activator" @click="mostraChat= false">
          <v-icon color="text--secondary">close</v-icon>
        </v-btn>
    </v-toolbar>
    <vue-perfect-scrollbar class="chat-room--scrollbar grey lighten-5" :style="computeHeight">
      <v-card-text class="chat-room--list pa-3">
        <template v-for="(item, index) in chat.messages">
          <div :class="[index % 2 == 0 ? 'reverse' : '']" class="messaging-item layout row my-4" :key="index">
            <v-avatar class="indigo mx-1" size="40">
              <img :src="item.user.avatar" alt="" />
            </v-avatar>
            <div class="messaging--body layout column mx-2">
              <p :value="true" :class="[index % 2 == 0 ? 'primary white--text' : 'white']" class="pa-2">
                {{ item.text }}
              </p>
              <div class="caption px-2 text--secondary">
                {{ new Date(item.created_at).toLocaleString() }}
              </div>
            </div>
            <v-spacer></v-spacer>
          </div>
        </template>
      </v-card-text>
    </vue-perfect-scrollbar>
    <v-card-actions>
      <v-text-field full-width flat clearable solo append-icon="send" label="Type some message here">
        <v-icon slot="append-icon">send</v-icon>
        <v-icon slot="append-icon" class="mx-2">photo</v-icon>
        <v-icon slot="append-icon">face</v-icon>
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>
<script>
import { getChatById } from "@/api/chat"
import { getUserById } from "@/api/user"
import VuePerfectScrollbar from "vue-perfect-scrollbar"
export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    uuid: {
      type: String,
      default: ""
    },
    obj: {
      type: Object,
      default: null
    }
  },
  data: ()=> ({
    mostraChat: true
  }),
  created() {
      
            let chatOrigin = {
              title: "Chat",
              users: [],
              messages: []
            }
            let chat = getChatById(this.$route.params.uuid)
            console.log('chat => ', chat)
            
  },
  computed: {
    // chatTicket() {
    //   let InicioChat = {
    //     title: "TICKET",
        
    //   }
    // }

    chat() {
      let chatOrigin = {
 uuid:"a44f8ade-513c-46b5-bae4-0acf809860e6",
 title: "Novo Ticket",
 users: [
 "67BEDB42-CB48-4756-A4AB-A04C3827C42A",
 "96B38C1F-D67C-4BE7-9979-2EEAE9F424ED"
  ], 
  created_by:"a44f8ade-513c-46b5-bae4-0acf809860e6",
  created_at: "2019-12-17T12:57:00.458Z",
  messages: [
{ uuid: "96B38C1F-D67C-4BE7-9979-2EEAE9F424ED",
  chatId:"a44f8ade-513c-46b5-bae4-0acf809860e6",
  text : "Oi como posso ajudar você ? ",
  created_at:"2019-12-17T13:02:00.458Z",
  user:{
    uuid: "96B38C1F-D67C-4BE7-9979-2EEAE9F424ED",
    name: "ATENDENTE",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stayuber/128.jpg"
}
},
{ uuid: "67BEDB42-CB48-4756-A4AB-A04C3827C42A",
  chatId:"a44f8ade-513c-46b5-bae4-0acf809860e6",
  text : "estou com problemas na minha maquina ",
  created_at:"2019-12-17T13:02:00.458Z",
  user:{
    uuid: "67BEDB42-CB48-4756-A4AB-A04C3827C42A",
    name: "Cliente",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/nehfy/128.jpg"
}},
{ uuid: "96B38C1F-D67C-4BE7-9979-2EEAE9F424ED",
  chatId:"a44f8ade-513c-46b5-bae4-0acf809860e6",
  text : "E oque acontece nessa sua maquina ",
  created_at:"2019-12-17T13:02:00.458Z",
  user:{
    uuid: "96B38C1F-D67C-4BE7-9979-2EEAE9F424ED",
    name: "ATENDENTE",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stayuber/128.jpg"
}},
{ uuid: "67BEDB42-CB48-4756-A4AB-A04C3827C42A",
  chatId:"a44f8ade-513c-46b5-bae4-0acf809860e6",
  text : "ela ta desligando sozinha ... já tentei fazer varias coisas ",
  created_at:"2019-12-17T13:02:00.458Z",
  user:{
    uuid: "67BEDB42-CB48-4756-A4AB-A04C3827C42A",
    name: "cliente",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/nehfy/128.jpg"
}},
{ uuid: "96B38C1F-D67C-4BE7-9979-2EEAE9F424ED",
  chatId:"a44f8ade-513c-46b5-bae4-0acf809860e6",
  text : "então compra ou maquina ué !",
  created_at:"2019-12-17T13:02:00.458Z",
  user:{
    uuid: "96B38C1F-D67C-4BE7-9979-2EEAE9F424ED",
    name: "ATENDENTE",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stayuber/128.jpg"
}},
{ uuid: "67BEDB42-CB48-4756-A4AB-A04C3827C42A",
  chatId:"a44f8ade-513c-46b5-bae4-0acf809860e6",
  text : "Não é bem assim que funciona né ",
  created_at:"2019-12-17T13:02:00.458Z",
  user:{
    uuid: "67BEDB42-CB48-4756-A4AB-A04C3827C42A",
    name: "cliente",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/nehfy/128.jpg"
}},
{ uuid: "96B38C1F-D67C-4BE7-9979-2EEAE9F424ED",
  chatId:"a44f8ade-513c-46b5-bae4-0acf809860e6",
  text : "Nois testamos nossos produtos antes de sair da fabriaca e não é erro nosso",
  created_at:"2019-12-17T13:02:00.458Z",
  user:{
    uuid: "96B38C1F-D67C-4BE7-9979-2EEAE9F424ED",
    name: "ATENDENTE",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/stayuber/128.jpg"
}},
{ uuid: "67BEDB42-CB48-4756-A4AB-A04C3827C42A",
  chatId:"a44f8ade-513c-46b5-bae4-0acf809860e6",
  text : "Pode ter certeza que é sim, até pq não fiz nada ainda na maquina",
  created_at:"2019-12-17T13:02:00.458Z",
  user:{
    uuid: "67BEDB42-CB48-4756-A4AB-A04C3827C42A",
    name: "cliente",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/nehfy/128.jpg"
}}
]
}
      // let chat = getChatById(this.$route.params.uuid)
      // console.log('chat => ', chat)
      // return Object.assign(chatOrigin, chat)
      return chatOrigin
    },
    computeHeight() {
      return {
        height: this.height || ""
      }
    }
  },

  methods: {
    getAvatar(uid) {
      return getUserById(uid).avatar
    }
  }
}
</script>
