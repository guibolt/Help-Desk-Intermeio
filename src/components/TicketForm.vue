<template>
<v-dialog  max-width="600px" v-model="dialog">
 <template v-slot:activator="{ on }">
    <v-btn color="success"  v-on="on" > 
      <v-icon left >add</v-icon>
       CRIAT NOVO TICKET
    </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-col
          justify="center"
          align="center"
          >
          <h2 class="display-1   blue-grey lighten-5 green--text">Adicionar Novo Ticket</h2>
          </v-col>
        </v-card-title>
          <v-card-text>
            <v-form class="px-3" ref="form">
              <v-text-field label= "Titulo" color="blue-grey" v-model="ticket.titulo" prepend-icon="folder" :rules ="regrasTitulo"> </v-text-field>
              <v-text-field label= "Informações" color="blue-grey" v-model="ticket.informacao" prepend-icon="edit" :rules="regrasInfo"></v-text-field>

                <v-menu
                  max-width="290"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field label="Data de entrega" prepend-icon="date_range" v-on="on 
                    " :value= "formatteDate"
                    readonly
                    color="blue-grey"
                    :rules="regrasData"
                    >
                    </v-text-field>
                  </template>
                </v-menu>

              <v-btn
              @click="submit"
              text
              class="success mx-0 mt-3"
              :loading="carregando"
                            >
              Adicionar!
              </v-btn>
            </v-form>
          </v-card-text>
     </v-card>
</v-dialog>

</template>

<script>

export default {
data:()=>({
  ticket: {
    titulo:'',
    informacao: '',
    data: undefined,
    
  },
  regrasTitulo: [
    v =>  v && v.length >= 3 || 'Tamanho mínimo é 3'
  ],
  regrasInfo: [
    v =>  v && v.length >= 8 || 'Tamanho mínimo é 8'
  ],
  regrasData: [
    v =>  v && v.length >= 0 || 'É necessario escolher!'
  ],
  dialog: false,
  carregando: false
}),
methods: {
  async submit(){
        moment.locale('pt-br')
    if(this.$refs.form.validate()){
    this.carregando = true
     await db.collection('projects').add( {
        title: this.projeto.titulo,
        content: this.projeto.informacao,
        due: moment(this.projeto.data).format('LL'),
        status: 'fazendo',
        person: 'Guilherme'

      }).then(()=>{
        console.log('projeto adcionado')
        this.dialog = false
        this.carregando = false
        this.$emit('ticketAdicionado')
         this.$refs.form.reset()
        this.projeto = {}
      })
    }

    else
    console.log('wrong!')
  }
},
computed:{
  formatteDate(){
    moment.locale('pt-br')
    return this.projeto.data ? moment(this.projeto.data).format('LL') : ''
  }
}

}
</script>
