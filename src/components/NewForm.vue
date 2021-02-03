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

  export default {
    data() {
      return {
        formGetRequest: [],
        isVisible: false,
        model: {
          message: '',
          terms: true
        },
        schema: {
          fields: [{
              type: 'input',
              inputType: 'text',
              label: 'First Name',
              model: 'firstname',
              placeholder: 'Your first name',
              required: true,
              validator: ['string']
            },
            {
              type: 'input',
              inputType: 'text',
              label: 'Last Name',
              model: 'lastname',
              placeholder: 'Your last name',
              required: true,
              validator: ['string']
            },
            {
              type: "radios",
              label: "Sex",
              model: "gender",
              values: [
                "Male",
                "Female"
              ],
              required: true
            },
            {
              type: "textArea",
              label: "Message",
              model: "message",
              name: "message",
              placeholder: "Your Message",
              rows: 4,
              required: true,
              validator: ['string']
            },
            {
              type: "select",
              selectOptions: {
                noneSelectedText: 'Please Choose'
              },
              label: "This message is confidential",
              model: "confidential",
              values: [
                "No",
                "Yes"
              ],
              default: "No",
              value: "No",
              required: true,
              validator: ['required'],
              visible: (model) => {
                if (model.message.length > 30) {
                  return true;
                }
                return false;
              }
            },
            {
              type: 'checkbox',
              label: 'I accept the TOS',
              model: 'terms',
              default: true,
              required: true,
              validator: ['required'],
              visible: (model) => {
                if (model.message.length > 30 && model.confidential) {
                  return true;
                }
                return false;
              }
            },
          ]
        },
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
