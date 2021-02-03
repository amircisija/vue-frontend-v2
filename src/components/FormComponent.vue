<template>
  <div class="form__wrapper">
    <div class="div-1">
      <FormulateForm v-model="values" :schema="schema" @submit="submitHandler">


      </FormulateForm>

    </div>
    <div class="div-2" v-if="schema">
<!--       <pre>{{ values.message.length }}</pre> -->
      <pre>{{ messageLength }}</pre>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        values: {},
        schema: [{
            "id": "firstname",
            "type": "text",
            "label": "First name",
            "name": "firstName",
            "validation": "required|max:30,length",
            "validation-name": "First name should be under 30 characters"
          },
          {
            "id": "lastname",
            "type": "text",
            "label": "Last name",
            "name": "lasttName",
            "validation": "required|max:30,length",
            "validation-name": "Last name should be under 30 characters"
          },
          {
            "id": "gender",
            "type": 'radio',
            "name": 'gender',
            "label": 'Sex',
            "options": [{
                "value": 'male',
                id: 'male',
                label: 'Male'
              },
              {
                "value": 'female',
                "id": 'female',
                "label": 'Female'
              }
            ],
            "value": 'gender',
            "validation-name": 'Please choose gender',
            validation: 'required'
          },
          {
            "id": "message",
            "type": "textarea",
            "label": "Message",
            "name": "message",
            "validation-name": "message",
            "validation": "required|max:10,length"
          },
          {
            "id": "confidential",
            "type": 'radio',
            "name": 'confidential',
            "label": 'Confidential',
            "options": [{
                "value": 'yes',
                "id": 'yes',
                "label": 'Yes'
              },
              {
                "value": 'no',
                "id": 'no',
                "label": 'No'
              }
            ],
            value: 'Confidential',
            'validation-name': 'Please choose gender',
            validation: 'required'
          },

          {
            "type": "submit",
            "label": "Order pizza"
          }

        ]
      }
    },
    methods: {
      submitHandler() {
        console.log(this.values)
      }
    },
    computed: {
      messageLength() {
        this.schema.filter(x => x.id == 'message')
        return x.message.length();
      },
      filter(){

        return this.schema.filter(({ name }) => name == 'message')
      }
    }
  }

</script>
<style lang="scss">
  .div-1,
  .div-2 {
    padding: 40px;
    width: 40%;
    display: inline-block;
  }
</style>
