<template>
   <v-app id="inspire" style="
background: linear-gradient(to right, #1488cc, #6dd5ed); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
                <h1 class= " display-1 text-center font-weight-light white--text mb-3">HELP DESK <strong>INTERMEIO</strong></h1>
            <v-card class="elevation-12">
            
          <v-toolbar color="primary" dark>
        

            <v-toolbar-title class="font-weight-bold ">{{ texts.toolbar }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-progress-circular
              v-show="isLoading"
              indeterminate
              color="white"
              width="5"
            ></v-progress-circular>
          </v-toolbar>
          <v-card-text>
            <v-form @keyup.native.enter="submit">
              <v-text-field
                v-if="!isLogin"
                prepend-icon="person"
                name="name"
                label="Nome"
                type="text"
                color="primary"
                :error-messages="nameErrors"
                :success="!$v.user.name.$invalid"
                v-model.trim="$v.user.name.$model"
              ></v-text-field>
              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email"
                type="email"
                color="primary"
                :error-messages="emailErrors"
                :success="!$v.user.email.$invalid"
                v-model.trim="$v.user.email.$model"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Senha"
                type="password"
                color="primary"
                :error-messages="passwordErrors"
                :success="!$v.user.password.$invalid"
                v-model.trim="$v.user.password.$model"
              ></v-text-field>
              <v-text-field
               v-if="!isLogin"
                prepend-icon="lock"
                name="password"
                label="Confirma Senha"
                type="password"
                color="primary"
                :error-messages="confirmPassword"
                :success="validaConfirmacao"
                 v-model.trim="$v.user.confirmPassword.$model"
              ></v-text-field>
            </v-form>
            <v-btn
              :disabled="$v.$invalid"
              color="primary"
              block
              outlined
              @click="submit"
              >{{ texts.toolbar }}</v-btn
            >
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
               outlined
              color="secondary"
              @click="isLogin = !isLogin"
            >
              {{ texts.button }}
            </v-btn>
          </v-card-actions>
        </v-card>
   </v-col>
    </v-row>
  </v-container>
    </v-content>
</v-app>
</template>

<script>
import { required, email, minLength,sameAs } from "vuelidate/lib/validators";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("login");
export default {
  name: "Login",
  data: () => ({
    isLogin: true, //isso que diferencia
    isLoading: false,
    user: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ''
    }
  }),
  validations() {
    const validations = {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8)
        }
      }
    };

    if (this.isLogin) {
      return validations;
    }

    return {
      user: {
        ...validations.user,
        name: {
          required,
          minLength: minLength(3)
        },
         confirmPassword: {
           sameAsPassword: sameAs('password')
       }
      }
    };
  },
  computed: {
    ...mapState([ "ACarregar", "ErrorLogin", "SucessoLogin","nome","email","ErroCadastro"]),
    texts() {
      return this.isLogin
        ? { toolbar: "Login", button: "Criar conta" }
        : { toolbar: "Criar conta", button: "Já tenho uma conta" };
    },
    nameErrors() {
      const errors = [];
      const name = this.$v.user.name;
      if (!name.$dirty) {
        return errors;
      }
      !name.required && errors.push("Nome é obrigatório!");
      !name.minLength &&
        errors.push(
          `Insira pelo menos ${name.$params.minLength.min} caracteres!`
        );
      return errors;
    },
    emailErrors() {
      const errors = [];
      const email = this.$v.user.email;
      if (!email.$dirty) {
        return errors;
      }
      !email.required && errors.push("Email é obrigatório!");
      !email.email && errors.push("Insira um email válido!");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      const password = this.$v.user.password;
      if (!password.$dirty) {
        return errors;
      }
      !password.required && errors.push("Senha é obrigatória!");
      !password.minLength &&
        errors.push(
          `Insira pelo menos ${password.$params.minLength.min} caracteres!`
        );
      return errors;
    },
    confirmPassword() {
      const errors = []
      
      const confirmPassword = this.$v.user.confirmPassword

       if (!confirmPassword.$dirty) { return errors }
      !confirmPassword.sameAsPassword && errors.push('Senha devem ser iguais!')

      return errors
    },
    validaConfirmacao(){
      return !this.$v.user.confirmPassword$invalid && this.$v.user.confirmPassword.$dirty
    }
  },
      created: function() {
      if(this.SucessoLogin) this.$router.push("/");
    },
  methods: {
    ...mapActions(["Logar","Cadastrar"]),
    async submit() {
      if(this.isLogin){
        this.isLoading = this.ACarregar;

          if(this.user.email === "" && this.user.senha === "")
            return this.$toast.warning("Preencha os campos", "Alerta", {
            position: "topRight",
            timeout: 9000
          });

          await this.Logar({
            email: this.user.email, 
            senha:  this.user.password
          })

          if(this.SucessoLogin === true) {
            this.$router.push("/");
          }
         else {
          const toast = this.$toast;
          if(this.ErrorLogin !== null ){
          this.ErrorLogin.forEach(function(item, indice, array) {
          toast.error(item, "Erro", {
            position: "topRight"
          });
          }
        );
        }else{
          console.log("Erro no Login.")
        }
      }
      }else{
        this.isLoading = this.ACarregar;
        await this.Cadastrar({
          nome: this.user.name,
          email: this.user.email,
          senha:  this.user.password,
          confirmaSenha: this.user.confirmPassword,
          tipo: "cliente"
        });

        if(this.ErroCadastro != null){
          const toast = this.$toast;
          this.ErroCadastro.forEach(function(item, indice, array) {
            toast.error(item, "Erro", {
              position:"topRight",
              timeout: 9000
            })
          })
        }else {
          this.$toast.success("Cadastro efetuado faça o login.", "Sucesso", {
          position: "topRight"
        });
          this.isLogin = true
        }
      }
    }
  }
};
</script>
