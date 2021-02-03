<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12" style="margin-bottom: 60px;">
          <el-alert
            title="POST API SENT"
            type="success"
            v-if="isVisible">
          </el-alert>
          <div class="panel-body" >
            <form @submit.prevent="onSubmit">
              <vue-form-generator ref="vfg" :schema="schema" :model="model" :options="formOptions">
              </vue-form-generator>
              <input type="submit" value="Submit" class="el-button el-button--success" style="margin-top: 20px;"/>
            </form>
          </div>
        </el-col>

        <el-col :span="12" v-if="formGetRequest">

          <el-table :data="formGetRequest" style="width: 100%">
            <el-table-column prop="firstname" label="First Name">
            </el-table-column>
            <el-table-column prop="lastname" label="Last Name">
            </el-table-column>
            <el-table-column prop="gender" label="Gender">
            </el-table-column>
            <el-table-column prop="message" label="Message">
            </el-table-column>
            <el-table-column prop="confidential" label="Confidential">
            </el-table-column>
          </el-table>
          <el-button type="success" @click="getFormData()">Get Submitted Form Data from APi</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import Vue from 'vue'
  import VueFormGenerator from 'vue-form-generator'
  import 'vue-form-generator/dist/vfg.css'
  Vue.use(VueFormGenerator)
  import axios from "axios";

  import fields from './schema.js';

  export default {
    data() {
      return {
        formGetRequest: [],
        isVisible: false,
        model: {
          message: '',
          terms: true
        },
        schema: fields,
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true,
          validateAsync: true
        }
      }
    },

    methods: {
      onValidated(isValid, errors) {
        console.log("Validation result: ", isValid, ", Errors:", errors);
      },
      onSubmit() {
        this.$refs.vfg.validate().then((valid) => {
          if(valid) {
            this.isVisible = true;
            let dataSubmitted = this.model;
              axios.post('/api/data', {
                  firstname: dataSubmitted.firstname,
                  lastname: dataSubmitted.lastname,
                  message: dataSubmitted.message,
                  gender: dataSubmitted.gender,
                  confidential: dataSubmitted.confidential,
                })
                .then(function (response) {
                  console.log("Axios submit");
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
          }
          else { console.log("Error")}
        }).catch((err) => {
          console.log(err)
        });
      },
      getFormData() {
        axios.get('/api/data')
          .then(response => {
            this.formGetRequest = response.data
          })
          .catch(error => {
            console.log(error.response)
          })
      }
    },
       created() {
          this.getFormData();
          this.isVisible = false;

        }
  }

</script>
