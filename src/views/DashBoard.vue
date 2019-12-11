<template>
 <v-container fluid>
  <h1 class=" display-2 white--text text-center">DashBoard</h1>
        <v-row
          align="center"
          justify="space-around"
          style="height: 300px;"
        >

      
  
    <v-card
    
    class="mx-auto"
    width="350"

    shaped
    v-for="card in cards"
     :key="card.title"
  >
    <v-card-text >
   
          <v-toolbar color="primary" dark>
         
            <v-toolbar-title class="font-weight-bold ">{{card.title}}</v-toolbar-title>
        
          </v-toolbar>
         
      
      <div class="mt-5 font-weight-bold" >
        Atualmente há 
        <v-avatar color="primary" class="white--text" size="20">
          {{card.quantity}}
        </v-avatar>
         {{card.title}}
      </div>
     <v-btn icon class="font-weight-bold" >
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

  </v-container>
</template>

<script>
export default {
data:()=>({
  cards:[
    {title: 'Tickets abertos', quantity: 5},
    {title: 'Tickets em andamento', quantity: 3},
    {title: 'Tickets fechados', quantity: 5},

  ]
})
}
</script>

<style>

</style>