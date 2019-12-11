<template>
 <v-container fluid>
  <h1 class=" display-2 white--text text-center mt-5">DashBoard</h1>
        <v-row
          align="center"
          justify="space-around"
          style="height: 300px;"
         
        >
    <v-card
    
    class="mx-auto mb-5"
    width="350"
    shaped
    v-for="card in cards"
     :key="card.title"
  >
    <v-card-text >
   
          <v-toolbar color="primary" dark>
            <v-col
            justify="center"
            align="center"
            >

            <v-toolbar-title class="font-weight-light text-uppercase  ">{{card.title}}</v-toolbar-title>
            </v-col>
        
          </v-toolbar>
         
      
      <div class="mt-5 font-weight-bold subheading"  >
        Atualmente há 
        <v-avatar color="primary" class="white--text" size="20">
          {{card.quantity}}
        </v-avatar>
         {{card.title}}
      </div>
    <v-btn icon class="font-weight-bold py-2" small >
   
       Visualizar
       <v-icon
       right
       >
       remove_red_eye
       </v-icon>
     </v-btn>
     
   
    </v-card-text>
  
  </v-card>
  
   </v-row>
  
    <v-row
     justify="center"
     align="center"
     class="mt-5"
     >
     

      <v-card flat v-for="ticket in ticketslst" :key="ticket.title" width="1500" class="mb-1" shaped>
       <v-layout row wrap class="pa-3 ticket">
          <v-flex xs12 md4>
            <div class="caption blue--text">Titulo do Ticket</div>
            <div>{{ ticket.titulo }}</div>
          </v-flex>
          <v-flex xs6 sm4 md4>
            <div class="caption blue--text">Descrição do Tciket</div>
            <div>{{ ticket.mensagem }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption blue--text">Criado em</div>
            <div>{{ ticket.dataCriacao }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
               <div class="caption blue--text">Número</div>
            <div class="right">
              <v-chip small 
              color="secondary">
             {{ ticket.numeroTicket }}</v-chip>
              <v-btn icon class="ml-5">
                Responder
              <v-icon right>
                message
              </v-icon>
           </v-btn>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
     </v-row>

  </v-container>
</template>

<script>
export default {
data:()=>({
  cards:[
    {title: 'TICKETS ABERTOS', quantity: 5},
    {title: 'Tickets em andamento', quantity: 3},
    {title: 'Tickets fechados', quantity: 5},

  ],
  ticketslst:[
        {
          titulo: "Meu Computador se encontra com  problemas.",
          mensagem: "Oi meu comprei meu computador recentemente e está com defeitos.",
          dataCriacao: '15 de Dezembro, 2019',
          numeroTicket: 201909000001
        },
        {
          titulo: "Meu boleto nao retorna .",
          mensagem: "Oi meu comprei meu computador recentemente e está com defeitos.",
          dataCriacao: '18 de Dezembro, 2019',
          numeroTicket: 201909000002
        },
        {
          titulo: "Meu Computador se encontra com  problemas.",
          mensagem: "Oi meu comprei meu computador recentemente e está com defeitos.",
          dataCriacao: '15 de Dezembro, 2019',
          numeroTicket: 201909000003
        },
  ]
})
}
</script>

<style>
.ticket{
  border-left: 4px solid #1E88E5;
  border-right: 4px solid #1E88E5;
}

</style>